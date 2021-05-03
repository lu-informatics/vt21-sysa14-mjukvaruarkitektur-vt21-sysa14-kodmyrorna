/*GLOBAL VARIABLES*/
//Used to store assignments, persons, and projects so that GET method of ajax only needs to be called once
let projectArray = new Array();
let personArray = new Array();
let assignmentArray = new Array();
let submitButton = "";

/*DOCUMENT READY*/
$(document).ready(function(){
	loadAll(); 
	toggleSelectVisibility("invisible");
	$("#selectedPerson").val("");
	$("#selectedProject").val("");
	//filter search
	document.getElementById("searchProject").addEventListener("keydown", function(e){
		clearFeedback();
		$("#allProjects td").parent().remove(); //clears table
		let search = "";
		//keydown is triggered before the input field registers the new character, so the most recent character has to be added to the current value in the field, 
		//or if the backspace is pressed, the last character has to be removed.
		if(e.keyCode === 8){ //If the user presses backspace
			search = $("#searchProject").val().toUpperCase().substring(0, (search.length - 1)); //removes the last character from the search value
		} else {
			search = $("#searchProject").val().toUpperCase() + String.fromCharCode(e.which).toUpperCase(); 
		}
		for (let i = 0; i < projectArray.length; i++){ //Iterates through the outer project array (which contains inner arrays representing individual projects)
			let containsSearch = false;
			for(let j = 0; j < projectArray[i].length; j++){//Iterates through the two fields of the inner array
				if(projectArray[i][j].toUpperCase().includes(search)){ //checks if the current search value, regardless of casing, matches the string of the current field
					containsSearch = true;
				}
			}
			if (containsSearch){ //if either of the fields of the inner array representing the project contained the search value, that row is added to the table
				addRow("allProjects", projectArray[i][0], projectArray[i][1]);
			}
		}
	})
	
	//Highlight rows in project table
	$(document).on("click", "#allProjects tr:not(thead tr)", function (){
		clearFeedback();
		let selected = $(this).hasClass("highlight"); //boolean, evaluates to true if the clicked row is already highlighted
		$("#allProjects tr").removeClass("highlight"); //removes all highlights for entire table
		if (!selected) { //If the clicked row is not already highlighted
			$(this).addClass("highlight");
			let code = $(this).find("td:eq(0)").text();
			let name = $(this).find("td:eq(1)").text();
			$("#projectCode").val(code);  //change the value of the project code text field to the clicked row
			$("#name").val(name);
			$("#hiddenProjectCode").val(code); //TODO also explain this
			toggleDisabled("disable");
			updatePersons(code, name); //displays the persons assigned to this project
			$("#selectedProject").val(code); //TODO explain this
		} else { //If the clicked row is already highlighted, it will not be highlighted any longer
			updatePersons("clear"); //clears the side table displaying the persons assigned to a project
			$("#projectCode").val(""); //clears the project code text field
			toggleDisabled("activate");
			$("#selectedProject").val("");
			$("#name").val("");
		}
	})
	//Highlight rows in person table
	$(document).on("click", "#projectPersons tr:not(thead tr)", function (){
		clearFeedback();
		let selected = $(this).hasClass("highlight"); //boolean, evaluates to true if the clicked row is already highlighted
		$("#projectPersons tr").removeClass("highlight"); //removes all highlights for entire table
		if (!selected) {//If the clicked row is not already highlighted-
			$(this).addClass("highlight"); //-it is now highlighted
			let ssn = $(this).find("td:eq(0)").text()
			$("#selectedPerson").val(ssn); //TODO explain this
		} else {
			$("#selectedPerson").val("");
		}
	})

	//This button pretty much just toggles the visibility of the elements used to assign new persons to a project
	$("#addNewPerson").click(function(){ 
		clearFeedback();
		if ($(".newPersonMenu").is(":hidden"))
			toggleSelectVisibility("visible");
		else 
			toggleSelectVisibility("invisible");

		$("#newPersonFeedback").text("");
	}) 
	$("#X").click(function(){
		toggleDisabled("activate");
		$("#allProjects tr.highlight").removeClass("highlight"); 
		$("#projectCode").val("");
		$("#name").val("");
		$("#selectedProject").val("");
	})
})

/*FUNCTIONS*/
function toggleDisabled(operation){
	switch(operation){
		case("disable"):
			$("#projectCode").attr('disabled', 'disabled'); //TODO explain this
			$("#AddBtn").attr('disabled', 'disabled');
			$("#X").css("display", "inline");
			break;
		case("activate"):
			$("#projectCode").removeAttr('disabled'); //TODO FKG EXPLAIN
			$("#hiddenProjectCode").val(""); //TODO explain
			$("#AddBtn").removeAttr('disabled');
			$("#X").css("display", "none");
			updatePersons("clear");
			break;
	}
}

function validateProjectOp(){
	let projectCodeStr = $("#projectCode").val();
	let nameStr = $("#name").val();
	let nameIsEmpty = !nameStr.replace(/\s/g, ''); //Evaluates to true if the name consists of nothing or just spaces.
	let projectCodeIsEmpty = !projectCodeStr.replace(/\s/g, ''); //Evaluates to true if the project code consists of nothing or just spaces.
	if (submitButton !== 'delete' && nameIsEmpty){
		$("#fieldsetFeedback").text("Please enter a project name.");
		return false;
	} else if (submitButton !== 'delete' && projectCodeIsEmpty){
		$("#fieldsetFeedback").text("Please enter a project code.");
		return false;
	}  else if (submitButton !== 'add' && !getProjectCodeArray().includes(projectCodeStr)){
		$("#fieldsetFeedback").text("This project code is not registered.");
		return false;
	} else if (submitButton === 'add' && getProjectCodeArray().includes(projectCodeStr)){
		$("#fieldsetFeedback").text("This project code is already registered.");
		return false;
	}
	return true;
}

function validateAssignmentOp(){
	let code = $("#selectedProject").val();
	let ssn = "";
	if(submitButton === 'removePerson'){
		ssn = $("#selectedPerson").val();
	} else if(submitButton==='addPerson'){
		ssn = $("#selectNewPerson option:selected").val();
	}
	
	if(code === "")
		$("#newPersonFeedback").text("Please select a project.");
	else if (ssn === "" || ssn === "Select person")
		$("#newPersonFeedback").text("Please select a person.");
	
	return !(code === "" || ssn === "" || ssn === "Select person");
}

/************
 * Function 	clearFeedback
 * Description	Clears the user feedback messages in all parts of the page
 ************/
function clearFeedback(){
	$("#fieldsetFeedback").text("");
	$("#deleteFeedback").text("");
	$("#newPersonFeedback").text("");
}

/************
 * Function 	toggleSelectVisibility
 * Parameter	string	option
 * Description	Toggles visibility of the part of the new person menu allowing user to add a new person to a project
 ************/
function toggleSelectVisibility(option){
	if(option === "invisible"){
		$(".newPersonMenu").hide("fast");
	} else if (option === "visible"){
		$(".newPersonMenu").show("fast");
	}
}

/************
 * Function 	updateTable
 * Description	Updates the table of projects
 ************/
function updateTable(){
	$("#allProjects td").parent().remove(); //Clears table
	for(let i = 0; i < projectArray.length; i++){ //populates the project table
		addRow("allProjects", projectArray[i][0], projectArray[i][1]);
	}
}

/************
 * Function 	updatePersons
 * Parameters	string code
 * 				string name
 * Description	Updates the table of persons belonging to a specific project and manipulates the global person or assignment array depending on the operation performed
 * 				Also updates the select element which contains persons that can be assigned to the project
 ************/
function updatePersons(code, name){
	$("#projectPersons td").parent().remove(); //Clears table
	if (code === "clear")
		$("#personLegend").text("Choose project to see their assigned persons");
	else
		$("#personLegend").text("Persons assigned to " + name); //updates table legend
	
	let assignmentsWithNames = matchAssignmentNames(); //gets new array with both primary keys for person and project as well as their names
	let projectPersons = new Array(); //this project's persons
	for (let i = 0; i < assignmentsWithNames.length; i++){
		if (assignmentsWithNames[i][2] === code){ //the third element of the inner array with assignments is the project code
			projectPersons.push(assignmentsWithNames[i][0]); //Stores all this projects persons to filter out of the select in the add menu
			addRow("projectPersons", assignmentsWithNames[i][0], assignmentsWithNames[i][1]); //Adds this project's persons to the person table
		}
	}
	/*THEN UPDATE SELECT*/
	toggleSelectVisibility("invisible"); //gonna be populated but invisible until "add new person" is pressed
	$('#selectNewPerson').children().remove().end().append('<option disabled selected>Select person</option>'); //clears the select element
	let numPersonsToAssign = 0; //Number of persons that can be assigned to this project
	for (let i = 0; i < personArray.length; i++){
		if(!projectPersons.includes(personArray[i][0])){ //evaluates to true if  the person is not already assigned to the project
			numPersonsToAssign++;
			let personText = personArray[i][0] + ", " + personArray[i][1];//text to be displayed in the select element
			$('#selectNewPerson').append($('<option>').val(personArray[i][0]).text(personText)); //Adds the person to the select element
		}
	}
	if(numPersonsToAssign === 0){ //If all possible persons are already assigned to this project
		$('#selectNewPerson').children().remove().end().append('<option>All persons already assigned</option>'); //Changes text in select element
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
 * Function 	getProjectCodeArray
 * Returns 		array
 * Description	Returns an array containing just the project codes of the project data collected at load
 ************/
function getProjectCodeArray(){
	let projectCodeArray = new Array();
	for (let i = 0; i < projectArray.length; i++){
		projectCodeArray.push(projectArray[i][0]);
	}
	return projectCodeArray;
}

/************
 * Function 	loadAll
 * Description	async function which loads the database data. Called at document ready
 ************/
async function loadAll() {
    await loadProjects();
    await loadPersons();
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
		console.log("ajaxGetProjectsError xhr: " + xhr);
		alert("Error retreiving data from database. Try again later or contact IT if the problem persists.");
	}
	function ajaxGetProjectsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			projectArray.push([element.projectCode, element.name]); //stores the projects in the global project array
		})
		updateTable(); //updates the project table
	}
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
		console.log("ajaxGetPersonsError xhr: " + xhr);
		alert("Error retreiving data from database. Try again later or contact IT if the problem persists.");
	}
	function ajaxGetPersonsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			personArray.push([element.ssn, element.name]); //stores the loaded data in the global person array
		})
		loadAssignments();  //forces assignments to be loaded once persons have been loaded
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
		console.log("ajaxGetAssignmentsError xhr: " + xhr);
		alert("Error retreiving data from database. Try again later or contact IT if the problem persists.");
	}
	function ajaxGetAssignmentsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			assignmentArray.push([element.aSsn, element.aProjectCode]); //stores the assignments in the global assignment array
		})
	}
}