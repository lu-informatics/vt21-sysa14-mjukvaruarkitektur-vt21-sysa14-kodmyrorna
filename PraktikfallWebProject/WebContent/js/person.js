/*GLOBAL VARIABLES*/
//Used to store assignments, persons, and projects so that GET method of ajax only needs to be called once
let assignmentArray = new Array(); 
let personArray = new Array();
let projectArray = new Array();

/*DOCUMENT READY*/
$(document).ready(function(){
	loadAll();
	toggleSelectVisibility("invisible");
	//filter search
	document.getElementById("searchPerson").addEventListener("keydown", function(e){
		clearFeedback();
		$("#allPersons td").parent().remove(); //Clears table
		let search = ""; 
		//keydown is triggered before the input field registers the new character, so the most recent character has to be added to the current value in the field, 
		//or if the backspace is pressed, the last character has to be removed.
		if(e.keyCode === 8){ //If the user presses backspace
			search = $("#searchPerson").val().toUpperCase().substring(0, (search.length - 1)); //removes the last character from the search value
		} else {
			search = $("#searchPerson").val().toUpperCase() + String.fromCharCode(e.which).toUpperCase();
		}
		for (let i = 0; i < personArray.length; i++){ //Iterates through the outer person array (which contains inner arrays representing individual persons)
			let containsSearch = false;
			for(let j = 0; j < personArray[i].length; j++){ //Iterates through the two fields of the inner array
				if(personArray[i][j].toUpperCase().includes(search)){ //checks if the current search value, regardless of casing, matches the string of the current field
					containsSearch = true;
				}
			}
			if (containsSearch){ //if either of the fields of the inner array representing the person contained the search value, that row is added to the table
				addRow("allPersons", personArray[i][0], personArray[i][1]);
			}
		}
	})
	
	//Highlight rows in person table
	$(document).on("click", "#allPersons tr:not(thead tr)", function (){
		clearFeedback();
		$("#name").val(""); //clear name input field when new person is selected
		let selected = $(this).hasClass("highlight");
		$("#allPersons tr").removeClass("highlight"); //removes all highlights for entire table
		if (!selected) { //If the clicked row is not already highlighted
			$(this).addClass("highlight");
			let ssn = $(this).find("td:eq(0)").text(); 
			let name = $(this).find("td:eq(1)").text();
			$("#ssn").val(ssn); 
			$("#name").val(name); //change the value of the ssn and name text field to the clicked row
			$("#selectedPerson").val(ssn); //TODO explain this
			updateProjects(null, ssn, $(this).find("td:eq(1)").text()); //displays the projects this person is assigned to
		} else { //If the clicked row is already highlighted, it will not be highlighted any longer
			updateProjects("clear"); //clears the side table displaying the projects a person is assigned to
			$("#ssn").val(""); //changes the value of the ssn text field to nothing
		}
	})
	//Highlight rows in project table
	$(document).on("click", "#personProjects tr:not(thead tr)", function (){
		clearFeedback();
		let selected = $(this).hasClass("highlight"); //boolean, evaluates to true if the clicked row is already highlighted
		$("#personProjects tr").removeClass("highlight"); //removes all highlights for entire table
		if (!selected) {//If the clicked row is not already highlighted-
			$(this).addClass("highlight"); //-it is now highlighted
			let code = $(this).find("td:eq(0)").text()
			$("#selectedProject").val(code); //TODO explain this
		}
	})
	
	//Click Remove from project Button
	$("#removeFromProject").click(function(){ 
		clearFeedback();
		let ssn = $("#ssn").val();
		let code = $("#personProjects tr.highlight").find("td:eq(0)").text(); //Gets the chosen project from the first column of the highlighted row in the project table
		if (code != "" && code != "Project code" && ssn != ""){ //checks that the user has selected a valid project
			let jsonString = JSON.stringify([{aSsn: ssn, aProjectCode: code}]); //Creates json object to send to servlet
			$.ajax({
				method: "DELETE",
				contentType: "application/json",
				url: "http://localhost:8080/PraktikfallWebProject/Assignments/",
				data: jsonString,
				error: ajaxDeleteAssignmentError,
				success: ajaxDeleteAssignmentSuccess
			})
			function ajaxDeleteAssignmentError(result, status, xhr){
				$("#newProjectFeedback").text("Error removing project assignment from person"); //gives user generic(:C) error
				console.log("ajaxDeleteAssignmentError xhr: " + xhr); //logs error to console for debugging
			}
			function ajaxDeleteAssignmentSuccess(result, status, xhr){
				let personName = $("#allPersons tr.highlight").find("td:eq(1)").text(); //Gets the person name from the person table
				let projectName = $("#personProjects tr.highlight").find("td:eq(1)").text(); //Gets the project name from the project table
				updateProjects("remove", ssn, personName, code, projectName); //sends new information on assignment to update project table
			}
		} else {
			$("#newProjectFeedback").text("Please select a project assignment to remove.");
		}
	}) //END Click Remove from project Button
	
	//Click add new project Button
	//This button pretty much just toggles the visibility of the elements used to assign new projects to a person
	$("#addNewProject").click(function(){
		if($(".newProjectMenu").is(":hidden")){
			toggleSelectVisibility("visible");
		} else {
			toggleSelectVisibility("invisible");
		}
		clearFeedback();
	}) //END Click add new project Button
	
	//Click add to project Button
	$("#addToProject").click(function(){ 
		clearFeedback();
		let ssn = $("#ssn").val();
		let code = $("#selectNewProject").val();
		if (code != "" && ssn != "" && code != "Select project"){ //Checks that user selected a valid project
			let jsonString = JSON.stringify({aSsn: ssn, aProjectCode: code}); //Creates a json object to send to servlet
			$.ajax({
				method: "POST",
				contentType: "application/json",
				url: "http://localhost:8080/PraktikfallWebProject/Assignments/",
				data: jsonString,
				error: ajaxAddAssignmentError,
				success: ajaxAddAssignmentSuccess
			})
			function ajaxAddAssignmentError(result, status, xhr){
				$("#newProjectFeedback").text("Error assigning person to project."); //gives user generic (:C) error message
				console.log("ajaxAddAssignmentError xhr: " + xhr); //logs error to console for debugging
			}
			function ajaxAddAssignmentSuccess(result, status, xhr){
				let personName = $("#allPersons tr.highlight").find("td:eq(1)").text(); //gets the name of the person which the project is added to
				updateProjects("add", ssn, personName, code); //updates the project table
			}
		} else if (code === "Select project"){ //the user didn't make a selection
			$("#newProjectFeedback").text("Please select a project to assign this person to.");
		}
	}) //END Click add to project Button
})

/*FUNCTIONS*/

function validatePersonOp(){
	let ssn = $("#ssn").val();
	let name = $("#name").val();
	let isEmpty = !name.replace(/\s/g, ''); //boolean which evaluates to true if the name string is empty or only contains blanks
	let onlyNumbersInSsn = /^\d+$/.test(ssn); //boolean which evalutes to true if the entered SSN contains only numbers (business rule)
	if (ssn.length != 10 || !onlyNumbersInSsn){ 
		$("#fieldsetFeedback").text("Please enter a social security number with 10 digits in the format YYMMDDXXXX");
		return false;
	} else if (isEmpty){
		$("#fieldsetFeedback").text("Please enter a name.");
		return false;
	} else if (name.length > 20){
		$("#fieldsetFeedback").text("Name can be a maximum of 20 characters.");
		return false;
	} else {
		return true;
	}
}

function validateAssignmentOp(){
	//TODO write this
}

/************
 * Function 	clearFeedback
 * Description	Clears the user feedback messages in all parts of the page
 ************/
function clearFeedback(){
	$("#fieldsetFeedback").text("");
	$("#deleteFeedback").text("");
	$("#newProjectFeedback").text("");
}


/************
 * Function 	toggleSelectVisibility
 * Parameter	string	option
 * Description	Toggles visibility of the part of the new project menu allowing user to add a new project to a person
 ************/
function toggleSelectVisibility(option){
	if(option === "invisible"){
		$(".newProjectMenu").hide("fast");
	} else if (option === "visible"){
		$(".newProjectMenu").show("fast");
	}
}

/************
 * Function 	updateTable
 * Parameters	string	operation
 * 				string	ssn
 * 				string 	name
 * Description	Updates the table of persons and manipulates the global person array depending on the operation performed
 ************/
function updateTable(operation, ssn, name){
	$("#allPersons td").parent().remove(); //Clears table
	switch(operation){ //operation decides how to manipulate the global person array
		case("delete"): //removes the person with the ssn paramater from the person array
			for(let i = 0; i < personArray.length; i++){
				if(personArray[i][0] === ssn){ //the first element of the inner array of the person array is always the ssn
					personArray.splice(i, 1); //removes 1 element at index i
				}
			}
			break;
		case("add"): //adds the person with the ssn paramater to the person array
			personArray.push([ssn, name]);
			break;
		case("update"): //updates the person with the ssn paramater in the person array
			let newRow = [ssn, name]; //udpated row
			for(let i = 0; i < personArray.length; i++){
				if(personArray[i][0] === ssn){ //the first element of the inner array of the person array is always the ssn
					personArray.splice(i, 1, newRow); //removes 1 element at index i and replaces it with the updated row
				}
			}
			break;
		default: //no changes to person array if no operation is specified.
			break;
	}
	personArray.sort(); //sorts the global person array
	for(let i = 0; i < personArray.length; i++){ //populates the person table
		addRow("allPersons", personArray[i][0], personArray[i][1]);
	}
}

/************
 * Function 	updateProjects
 * Parameters	string	operation
 * 				string	ssn
 * 				string 	name
 * 				string 	code
 * 				string 	projectName
 * Description	Updates the table of projects belonging to a specific person and manipulates the global project or assignment array depending on the operation performed
 * 				Also updates the select element which contains projects the person can be assigned to
 ************/
function updateProjects(operation, ssn, personName, code, projectName){
	/*FIRST UPDATE TABLE*/
	$("#personProjects td").parent().remove(); //Clears table
	$("#projectLegend").text("Projects " + personName + " is assigned to"); //updates table legend
	switch(operation){ //operation decides how to manipulate the global project or assignment array
		case("remove"): //removes the assigned project from the person
			for (let i = 0; i < assignmentArray.length; i++){
				if (assignmentArray[i][0] === ssn && assignmentArray[i][1] === code){ //finds the assignment to remove
					assignmentArray.splice(i, 1); //removes 1 element at index i
				}
			}
			break;
		case("add"): //adds new project assignment to person
			assignmentArray.push([ssn, code]);
			break;
		case("clear"): //empties the project table
			$("#projectLegend").text("Projects chosen person is assigned to");
		default:
			break;
	}
	assignmentArray.sort(); //sorts the assignments
	let assignmentsWithNames = matchAssignmentNames(); //gets new array with both primary keys for person and project as well as their names
	let personProjects = new Array(); //this persons projects
	for (let i = 0; i < assignmentsWithNames.length; i++){
		if (assignmentsWithNames[i][0] === ssn){ //the first element of the inner array with assignments is the ssn
			personProjects.push(assignmentsWithNames[i][2]); //Stores all this persons projects to filter out of the select in the add menu
			addRow("personProjects", assignmentsWithNames[i][2], assignmentsWithNames[i][3]); //Adds this persons projects to the project table
		}
	}
	/*THEN UPDATE SELECT*/
	toggleSelectVisibility("invisible"); //gonna be populated but invisible until "add new project" is pressed
	$('#selectNewProject').children().remove().end().append('<option disabled selected>Select project</option>'); //clears the select element
	let numProjectsToAssign = 0; //Number of projects the person can be assigned to
	for (let i = 0; i < projectArray.length; i++){ 
		if(!personProjects.includes(projectArray[i][0])){ //evaluates to true if the person is not already assigned to the project
			numProjectsToAssign++; 
			let projectText = projectArray[i][0] + ", " + projectArray[i][1]; //text to be displayed in the select element
			$('#selectNewProject').append($('<option>').val(projectArray[i][0]).text(projectText)); //Adds the project to the select element
		}
	}
	if(numProjectsToAssign == 0){ //If the person is already assigned to all possible projects
		$('#selectNewProject').children().remove().end().append('<option>Already assigned to all projects</option>'); //Changes text in select element
	}
}

/************
 * Function 	addRow
 * Parameters	string	element
 * 				string 	val1
 * 				string	val2
 * Description	Adds a new row with val1 and val2 to the specified table
 ************/
function addRow(element, val1, val2){
	$("#" + element + " tbody").append("<tr><td>" + val1 + "</td><td>" + val2 + "</td></p></tr>");
}

/************
 * Function 	matchAssignmentNames
 * Returns		array
 * Description	returns an array of assignments where each inner array, representing one assignment, also contains the names of the person and project
 ************/
function matchAssignmentNames(){
	let result = new Array();
	for (let i = 0; i < assignmentArray.length; i++){ //Iterates through the global assignment array which contains only social security number and project code
		let personName = "";
		let projectName = "";
		for(let j = 0; j < personArray.length; j++){ //Iterates through the global person array
			if(personArray[j][0] === assignmentArray[i][0]){ //if the ssn matches the ssn in the global assignment array
				personName = personArray[j][1]; //stores the name of the person in the local personName variable
			}
		}
		for(let j = 0; j < projectArray.length; j++){ //Iterates through the global project array
			if(projectArray[j][0] === assignmentArray[i][1]){ //if the project code matches the code in the global assignment array
				projectName = projectArray[j][1];	//stores the name of the project in the local projectName variable
			}
		}
		let assignment = [assignmentArray[i][0], personName, assignmentArray[i][1], projectName]; //creates an inner array with the primary keys and names
		result.push(assignment); //pushes the newly created inner array element to the array which will be returned
	}
	return result;
}

/************
 * Function 	getSsnArray
 * Returns 		array
 * Description	Returns an array containing just the social security numbers of the person data collected at load
 ************/
function getSsnArray(){ 
	let ssnArray = new Array();
	for(let i = 0; i < personArray.length; i++){
		ssnArray.push(personArray[i][0]);
	}
	return ssnArray;
}

/************
 * Function 	loadAll
 * Description	async function which loads the database data in the right order
 ************/
async function loadAll() {
    await loadPersons();
    await loadProjects();
}

/************
 * Function 	loadPersons
 * Description	async function which loads the persons in the database and stores them in the global person array
 ************/
async function loadPersons(){
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/PraktikfallWebProject/Persons/",
		error: ajaxGetPersonsError,
		success: ajaxGetPersonsSuccess
	})
	function ajaxGetPersonsError(result, status, xhr){
		alert("Error retreiving data from database. Try again later or contact IT if the problem persists.");
		console.log("ajaxGetPersonsError xhr: " + xhr);
	}
	function ajaxGetPersonsSuccess(result, status, xhr){
		$.each(result, function(index, element){ //stores the loaded data in the global person array
			personArray.push([element.ssn, element.name]);
		})
		updateTable(); //updates the persons table
	}
}

/************
 * Function 	loadProjects
 * Description	async function which loads the projects in the database and stores them in the global project array
 ************/
async function loadProjects(){
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/PraktikfallWebProject/Projects/",
		error: ajaxGetProjectsError,
		success: ajaxGetProjectsSuccess
	})
	function ajaxGetProjectsError(result, status, xhr){
		alert("Error retreiving data from database. Try again later or contact IT if the problem persists.");
		console.log("ajaxGetProjectsError xhr: " + xhr);
	}
	function ajaxGetProjectsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			projectArray.push([element.projectCode, element.name]); //stores the projects in the global project array
		})
		loadAssignments(); //forces assignments to be loaded once projects have been loaded
	}
}

/************
 * Function 	loadAssignments
 * Description	async function which loads the assignments in the database and stores them in the global assignment array
 ************/
async function loadAssignments(){
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/PraktikfallWebProject/Assignments/",
		error: ajaxGetAssignmentsError,
		success: ajaxGetAssignmentsSuccess
	})
	function ajaxGetAssignmentsError(result, status, xhr){
		alert("Error retreiving data from database. Try again later or contact IT if the problem persists.");
		console.log("ajaxGetAssignmentsError xhr: " + xhr);
	}
	function ajaxGetAssignmentsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			assignmentArray.push([element.aSsn, element.aProjectCode]); //stores the assignments in the global assignment array
		})
	}
}
