/*GLOBAL VARIABLES*/
//Used to store assignments, persons, and projects so that GET method of ajax only needs to be called once
let assignmentArray = new Array(); 
let personArray = new Array();
let projectArray = new Array();

/*DOCUMENT READY*/
$(document).ready(function(){
    loadAll();
    
    //Highlight rows in table when clicked
	$(document).on("click", "#allAssignments tr:not(thead tr)", function (){ 
		clearFeedback();
		let selected = $(this).hasClass("highlight"); //evaluates to true if the class is already highlighted
		if (!selected){
			$(this).addClass("highlight");	//If the class is not already highlighed, it becomes highlighted
			//TODO new functionality will only work for selecting one assignment at a time when deleting. Fix that.
			let ssn = $(this).find("td:eq(0)").text();
			let code = $(this).find("td:eq(2)").text();
			$("#selectedPerson").val(ssn);
			$("#selectedProject").val(code);
		} else { 
			$(this).removeClass("highlight"); //else, the highlight is removed.
		}
	})
	
	//searchbar function
	document.getElementById("searchAssignment").addEventListener("keydown", function(e){ //When key is pressed in input field searchAssignment
		clearFeedback();
		$("#allAssignments td").parent().remove(); //clears table
		let search = "";
		//keydown is triggered before the input field registers the new character, so the most recent character has to be added to the current value in the field, 
		//or if the backspace is pressed, the last character has to be removed.
		if(e.keyCode === 8){ //If the user presses backspace
			search = $("#searchAssignment").val().toUpperCase().substring(0, (search.length - 1)); //last character removed
		} else {
			search = $("#searchAssignment").val().toUpperCase() + String.fromCharCode(e.which).toUpperCase(); //adds pressed character to string already in input field
		}
		let assignmentsWithNames = matchAssignmentNames(); //array containing both primary keys of the person and project as well as their names
		for (let i = 0; i < assignmentsWithNames.length; i++){ //iterates through each assignment
			let containsSearch = false;	//changed to true if search value is matched
			for(let j = 0; j < assignmentsWithNames[i].length; j++){ //iterates through each field of assignment
				if(assignmentsWithNames[i][j].toUpperCase().includes(search)){ //if the search value is included in the field string
					containsSearch = true;
				}
			}
			if (containsSearch){ //if any of the fields match the search value, that assignment row is added back to the table
				addRow(assignmentsWithNames[i]); 
			}
		}
	})
	
})

/*FUNCTIONS*/

function validateAssignmentOp(){
	//TODO write this
}
/************
 * Function 	clearFeedback
 * Description	Clears the user feedback messages in all parts of the page
 ************/
function clearFeedback(){
	$("#addFeedback").text("");
	$("#deleteFeedback").text("");
}

/************
 * Function 	getSelectedAssignments
 * Returns		array
 * Description	Since the user can select multiple rows of assignments for deletion, this function gets all assignments 
 * 				selected. It is called inside the delete button eventlistener.
 ************/
function getSelectedAssignments(){
	let selectedAssignments = new Array();
	$("#allAssignments tr").each(function(index, element){ //Iterates through all the rows of the assignment table
		if($(this).hasClass("highlight")){	//If a row is highlighted
			let ssn = $(this).find("td:eq(0)").text();	
			let code = $(this).find("td:eq(2)").text();
			selectedAssignments.push([ssn, code]);	//add it to the selectedAssignments array
		}
	});
	return selectedAssignments;
}

/************
 * Function 	updateTable
 * Parameters	string	operation
 * 				string	personSsn
 * 				string 	projectCode
 * 				array	assignmentsToRemove
 * Description	Updates the table of assignments and manipulates the global assignment array depending on the operation performed
 ************/
function updateTable(operation, personSsn, projectCode, assignmentsToRemove){
	$("#allAssignments td").parent().remove(); //Clears table
	switch(operation){
		case("add"): //Add new assignment
			assignmentArray.push([personSsn, projectCode]);
			break;
		case("delete"): //Delete any number of assignments from the assignmentsToRemove array
			for (let i = 0; i < assignmentsToRemove.length; i++){ //Iterates through assignmentsToRemove
				for (let j = 0; j < assignmentArray.length; j++){	//Iterates through assignments
					//Below if statement evaluates to true if the assignment in the assignment array matches one of the assignments to remove
					if (assignmentArray[j][0] === assignmentsToRemove[i][0] && assignmentArray[j][1] === assignmentsToRemove[i][1]){
						assignmentArray.splice(j, 1);	//Removes 1 element at index j
					}
				}
			}
			break;
		default:	//If the table is just gonna be updated with whatever values are in the global assignments array
			break;
	}
	let assignmentsWithNames = matchAssignmentNames(); //array containing both primary keys of the person and project as well as their names
	assignmentsWithNames.sort(); //sorts assignments
	for (let i = 0; i < assignmentsWithNames.length; i++){ 
		addRow(assignmentsWithNames[i]); //Adds all the assignments of the global assignments array to the table
	}
}

/************
 * Function 	fillSelects
 * Description	Fills both the select elements with values from the global person and project array
 ************/
function fillSelects(){
	for (let i = 0; i < personArray.length; i++){ //Iterates through global person array
		let personText = personArray[i][0] + ", " + personArray[i][1]; //Text to be displayed in the select box
		$('#selectPerson').append($('<option>').val(personArray[i][0]).text(personText)); //appends the select box
	}
	for (let i = 0; i < projectArray.length; i++){ //Iterates through global project array
		let projectText = projectArray[i][0] + ", " + projectArray[i][1]; //Text to be displayed in the select box
		$('#selectProject').append($('<option>').val(projectArray[i][0]).text(projectText)) //appends the select box
	}
}

/************
 * Function 	addRow
 * Parameters	array	row
 * Description	Adds an array with four elements to the assignments table
 ************/
function addRow(row){
	$("#allAssignments tbody").append("<tr><td>" + row[0] + "</td><td>" + row[1] + "</td><td>" + row[2] + "</td><td>" + row[3] + "</td></tr>"); 
}

/************
 * Function 	checkAssignmentExists
 * Parameters	string ssn
 * 				string code
 * Returns		boolean	exists
 * Description	Checks if the global assignments array contains a specific assignment between a person and a project, and returns true 
 * 				if its already an element of the assignments array and false if it isn't
 ************/
function checkAssignmentExists(ssn, code){
	let exists = false;
	for (let i = 0; i < assignmentArray.length; i++){
		if (assignmentArray[i][0] === ssn && assignmentArray[i][1] === code){
			exists = true;
		}
	}
	return exists;
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
		console.log("ajaxGetPersonsError xhr: " + xhr);
		alert("Error retreiving data from database. Try again later or contact IT if the problem persists.");
	}
	function ajaxGetPersonsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			personArray.push([element.ssn, element.name]); //stores the loaded data in the global person array
		})
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
		console.log("ajaxGetProjectsError xhr: " + xhr);
		alert("Error retreiving data from database. Try again later or contact IT if the problem persists.");
	}
	function ajaxGetProjectsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			projectArray.push([element.projectCode, element.name]); //stores the loaded data in the global project array
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
		console.log("ajaxGetAssignmentsError xhr: " + xhr);
		alert("Error retreiving data from database. Try again later or contact IT if the problem persists.");
	}
	function ajaxGetAssignmentsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			assignmentArray.push([element.aSsn, element.aProjectCode]); //stores the loaded data in the global assignment array
		})
		updateTable(); //Updates the assignment table
		fillSelects(); //Updates the select boxes
	}
}