let projectArray = new Array();
let personArray = new Array();
let assignmentArray = new Array();
$(document).ready(function(){
	getWeather();
	loadAll(); 
	toggleSelectVisibility("invisible");
	//filter search
	document.getElementById("searchProject").addEventListener("keydown", function(e){
		clearFeedback();
		$("#allProjects td").parent().remove(); //clears table
		let search = "";
		if(e.keyCode === 8){ //If the user presses backspace
			search = $("#searchProject").val().toUpperCase().substring(0, (search.length - 1));
		} else {
			search = $("#searchProject").val().toUpperCase() + String.fromCharCode(e.which).toUpperCase();
		}
		for (let i = 0; i < projectArray.length; i++){
			let containsSearch = false;
			for(let j = 0; j < projectArray[i].length; j++){
				if(projectArray[i][j].toUpperCase().includes(search)){
					containsSearch = true;
				}
			}
			if (containsSearch){
				addRow("allProjects", projectArray[i][0], projectArray[i][1]);
			}
		}
	})
	//Highlight rows in tables
	$(document).on("click", "#allProjects tr:not(thead tr)", function (){
		clearFeedback();
		let selected = $(this).hasClass("highlight");
		$("#allProjects tr").removeClass("highlight");
		if (!selected) { //If I wanna highlight a row
			$(this).addClass("highlight");
			let code = $(this).find("td:eq(0)").text();
			$("#projectCode").val(code);
			updatePersons(null, code, $(this).find("td:eq(1)").text());
		} else { //Un-highlighting a row
			updatePersons("clear");
			$("#projectCode").val("");
		}
	})
	$(document).on("click", "#projectPersons tr:not(thead tr)", function (){
		clearFeedback();
		let selected = $(this).hasClass("highlight");
		$("#projectPersons tr").removeClass("highlight");
		if (!selected)
			$(this).addClass("highlight");
	})
	$("#AddBtn").click(function(){ 
		clearFeedback();
		let projectCodeStr = $("#projectCode").val();
		let nameStr = $("#name").val();
		let isEmpty = !nameStr.replace(/\s/g, '') || !projectCodeStr.replace(/\s/g, ''); //Evaluates to true if the project code or name consist of nothing or just spaces.
		let projectCodeArray = getProjectCodeArray();
		if (!isEmpty && (!projectCodeArray.includes(projectCodeStr)) && projectCodeStr.length <= 10 && nameStr.length <= 20){
			let obj = {projectCode: projectCodeStr, name: nameStr};
			let jsonString = JSON.stringify(obj);
			$.ajax({
				method: "POST",
				url: "http://localhost:8080/PraktikfallWebProject/Projects/",
				data: jsonString,
				dataType:'json',
				error: ajaxAddProjectError,
				success: ajaxAddProjectSuccess
			})
			function ajaxAddProjectSuccess(result, status, xhr){
				$("#projectCode").val("");
				$("#name").val("");
				updateTable("add", projectCodeStr, nameStr);
			}
			function ajaxAddProjectError(result, status, xhr){ 
				console.log("ajaxAddProjectError xhr: " + xhr);
				$("#fieldsetFeedback").text("Error adding project");
			}
		} else if (projectCodeArray.includes(projectCodeStr)){ 
			$("#fieldsetFeedback").text("There already exists a project with this project code.");
		} else if (isEmpty){
			$("#fieldsetFeedback").text("Please enter a project code and name.");
		} else if (projectCodeStr.length > 10){
			$("#fieldsetFeedback").text("Project code can be a maximum of 10 characters.");
		} else if (nameStr.length > 20) {
			$("#fieldsetFeedback").text("Name can be a maximum of 20 characters.");
		}
	}) //AddBtn
	$("#DeleteBtn").click(function(){
		clearFeedback();
		let projectCodeStr = $("#allProjects tr.highlight").find("td:eq(0)").text(); 
		let projectCodeArray = getProjectCodeArray();
		if (projectCodeArray.includes(projectCodeStr)){
			let obj = {projectCode: projectCodeStr};
			let jsonString = JSON.stringify(obj);
			$.ajax({
				method: "DELETE",
				url: "http://localhost:8080/PraktikfallWebProject/Projects/",
				data: jsonString,
				error: ajaxDelProjectError,
				success: ajaxDelProjectSuccess
			})
			function ajaxDelProjectSuccess(result, status, xhr){
				$("#projectCode").val("");
				updateTable("delete", projectCodeStr);
				updatePersons("clear");
			}
			function ajaxDelProjectError(result, status, xhr){ 
				console.log("ajaxDelProjectError xhr: " + xhr);
				$("#deleteFeedback").text("Error deleting project");
			}
		} else if (!projectCodeArray.includes(projectCodeStr)){
			$("#deleteFeedback").text("Please select a project from the list.");
		}
	}) //DeleteBtn
	$("#UpdateBtn").click(function(){
		clearFeedback();
		let projectCodeStr = $("#projectCode").val();
		let nameStr = $("#name").val();
		let isEmpty = !nameStr.replace(/\s/g, '');
		let projectCodeArray = getProjectCodeArray();
		if (!isEmpty && projectCodeArray.includes(projectCodeStr) && nameStr.length <= 20){
			let obj = {projectCode: projectCodeStr, name: nameStr};
			let jsonString = JSON.stringify(obj);
			$.ajax({
				method: "PUT",
				url: "http://localhost:8080/PraktikfallWebProject/Projects/",
				data: jsonString,
				dataType: "json",
				error: ajaxUpdateProjectError,
				success: ajaxUpdateProjectSuccess
			})
			function ajaxUpdateProjectSuccess(result, status, xhr){
				$("#name").val("");
				$("#projectCode").val("");
				updateTable("update", projectCodeStr, nameStr);
			}
			function ajaxUpdateProjectError(result, status, xhr){ 
				console.log("ajaxUpdateProjectError xhr: " + xhr);
				$("#fieldsetFeedback").text("Error updating project");
			}
		} else if (!projectCodeArray.includes(projectCodeStr)){ 
			$("#fieldsetFeedback").text("Please select a project to update. The project code cannot be changed.");
		} else if (isEmpty){
			$("#fieldsetFeedback").text("Please enter a name.");
		} else if (nameStr.length > 20){
			$("#fieldsetFeedback").text("Name can be a maximum of 20 characters");
		}
	}) //UpdateBtn
	$("#removePerson").click(function(){ 
		clearFeedback();
		let code = $("#projectCode").val();
		let ssn = $("#projectPersons tr.highlight").find("td:eq(0)").text(); 
		let jsonString = JSON.stringify({aSsn: ssn, aProjectCode: code});
		if (code != "" && ssn != "Social security number" && ssn != ""){
			$.ajax({
				method: "DELETE",
				url: "http://localhost:8080/PraktikfallWebProject/Assignments/delete",
				data: jsonString,
				error: ajaxDeleteAssignmentError,
				success: ajaxDeleteAssignmentSuccess
			})
			function ajaxDeleteAssignmentError(result, status, xhr){
				$("#newPersonFeedback").text("Error assigning person to project.");
				console.log("ajaxDeleteAssignmentError xhr: " + xhr);
			}
			function ajaxDeleteAssignmentSuccess(result, status, xhr){ 
				let projectName = $("#allProjects tr.highlight").find("td:eq(1)").text();
				let personName = $("#projectPersons tr.highlight").find("td:eq(1)").text();
				updatePersons("remove", code, projectName, ssn, personName);
			}
		} else {
			$("#newPersonFeedback").text("Please select a person to remove from this project.");
		}
	})
	$("#addNewPerson").click(function(){ 
		clearFeedback();
		if ($(".newPersonMenu").is(":hidden")){
			toggleSelectVisibility("visible");
		} else {
			toggleSelectVisibility("invisible");
		}
		$("#newPersonFeedback").text("");
	}) //addNewPerson toggles visibility of add new person menu
	$("#addPerson").click(function(){ 
		clearFeedback();
		let code = $("#projectCode").val();
		let ssn = $("#selectNewPerson").val();
		let jsonString = JSON.stringify({aSsn: ssn, aProjectCode: code});
		if (code != "" && code != null && ssn != null && ssn != "Select person"){
			$.ajax({
				method: "POST",
				url: "http://localhost:8080/PraktikfallWebProject/Assignments/post",
				data: jsonString,
				error: ajaxAddAssignmentError,
				success: ajaxAddAssignmentSuccess
			})
			function ajaxAddAssignmentError(result, status, xhr){ 
				$("#newPersonFeedback").text("Error assigning person to project");
				console.log("ajaxAddAssignmentError xhr: " + xhr);
			}
			function ajaxAddAssignmentSuccess(result, status, xhr){
				let projectName = $("#allProjects tr.highlight").find("td:eq(1)").text();
				updatePersons("add", code, projectName, ssn);
			}
		} else if (ssn === "Select person"){
			$("#newPersonFeedback").text("Please select a person to remove from this project.");
		}
	}) //addPerson
})
function clearFeedback(){
	$("#fieldsetFeedback").text("");
	$("#deleteFeedback").text("");
	$("#newPersonFeedback").text("");
}
function getProjectCodeArray(){
	let projectCodeArray = new Array();
	for (let i = 0; i < projectArray.length; i++){
		projectCodeArray.push(projectArray[i][0]);
	}
	return projectCodeArray;
}
function addRow(element, val1, val2){
	$("#" + element + " tbody").append("<tr><td>" + val1 + "</td><td>" + val2 + "</td></p></tr>");
}
function matchAssignmentNames(){
	let result = new Array();
	for (let i = 0; i < assignmentArray.length; i++){
		let personName = "";
		let projectName = "";
		for(let j = 0; j < personArray.length; j++){
			if(personArray[j][0] === assignmentArray[i][0]){
				personName = personArray[j][1];
			}
		}
		for(let j = 0; j < projectArray.length; j++){
			if(projectArray[j][0] === assignmentArray[i][1]){
				projectName = projectArray[j][1];
			}
		}
		let assignment = [assignmentArray[i][0], personName, assignmentArray[i][1], projectName];
		result.push(assignment);
	}
	return result;
}
function updateTable(operation, code, name){
	$("#allProjects td").parent().remove(); //Clears table
	switch(operation){
		case("delete"): //removes the row with the given ssn
			for(let i = 0; i < projectArray.length; i++){
				if(projectArray[i][0] === code){
					projectArray.splice(i, 1);
				}
			}
			break;
		case("add"):
			projectArray.push([code, name]);
			break;
		case("update"):
			let newRow = [code, name];
			for(let i = 0; i < projectArray.length; i++){
				if(projectArray[i][0] === code){
					projectArray.splice(i, 1, newRow);
				}
			}
			break;
		default:
			break;
	}
	//Adds values back to table
	projectArray.sort();
	for(let i = 0; i < projectArray.length; i++){
		addRow("allProjects", projectArray[i][0], projectArray[i][1]);
	}
}
function updatePersons(operation, code, projectName, ssn, personName){
	/*FIRST UPDATE TABLE*/
	$("#projectPersons td").parent().remove(); //Clears table
	$("#personLegend").text("Persons assigned to " + projectName);
	switch(operation){
		case("remove"):
			for (let i = 0; i < assignmentArray.length; i++){
				if (assignmentArray[i][0] === ssn && assignmentArray[i][1] === code){
					assignmentArray.splice(i, 1);
				}
			}
			break;
		case("add"):
			assignmentArray.push([ssn, code]);
			break;
		case("clear"):
			$("#personLegend").text("Persons assigned to chosen project");
		default:
			break;
	}
	assignmentArray.sort();
	let assignmentsWithNames = matchAssignmentNames();
	let projectPersons = new Array(); //this project's persons
	for (let i = 0; i < assignmentsWithNames.length; i++){
		if (assignmentsWithNames[i][2] === code){
			projectPersons.push(assignmentsWithNames[i][0]);
			addRow("projectPersons", assignmentsWithNames[i][0], assignmentsWithNames[i][1]);
		}
	}
	/*THEN UPDATE SELECT*/
	toggleSelectVisibility("invisible"); //gonna be populated but invisible until "add new project" is pressed
	$('#selectNewPerson').children().remove().end().append('<option>Select person</option>');
	for (let i = 0; i < personArray.length; i++){
		if(!projectPersons.includes(personArray[i][0])){
			let personText = personArray[i][0] + ", " + personArray[i][1];
			$('#selectNewPerson').append($('<option>').val(personArray[i][0]).text(personText));
		}
	}
}
function toggleSelectVisibility(option){
	if(option === "invisible"){
		$(".newPersonMenu").hide("fast");
	} else if (option === "visible"){
		$(".newPersonMenu").show("fast");
	}
}
async function loadAll() {
    await loadProjects();
    await loadPersons();
}
async function loadProjects(){
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/PraktikfallWebProject/Projects/",
		error: ajaxGetProjectsError,
		success: ajaxGetProjectsSuccess
	})
	function ajaxGetProjectsError(result, status, xhr){ //TODO give user error
		console.log("ajaxGetProjectsError xhr: " + xhr);
	}
	function ajaxGetProjectsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			projectArray.push([element.projectCode, element.name]);
		})
		updateTable();
	}
}
async function loadPersons(){
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/PraktikfallWebProject/Persons/",
		error: ajaxGetPersonsError,
		success: ajaxGetPersonsSuccess
	})
	function ajaxGetPersonsError(result, status, xhr){//TODO give user error
		console.log("ajaxGetPersonsError xhr: " + xhr);
	}
	function ajaxGetPersonsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			personArray.push([element.ssn, element.name]);
		})
		loadAssignments();
	}
}
async function loadAssignments(){
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/PraktikfallWebProject/Assignments/get",
		error: ajaxGetAssignmentsError,
		success: ajaxGetAssignmentsSuccess
	})
	function ajaxGetAssignmentsError(result, status, xhr){ //TODO give user error
		console.log("ajaxGetAssignmentsError xhr: " + xhr);
	}
	function ajaxGetAssignmentsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			assignmentArray.push([element.aSsn, element.aProjectCode]);
		})
	}
}
function getWeather(){
	$.ajax({
		method: "GET",
		url: "http://api.ipstack.com/check?access_key=c79834c89a7000a01355d5bfb1a1e504",
		error: ajaxReturn_Error,
		success: ajaxReturn_Success
	})
	function ajaxReturn_Success(result, status, xhr) {
		ParseJsonFile(result);
	}
	function ajaxReturn_Error(result, status, xhr) {
		console.log("Ajax-api-stack: "+status);
	}
	function ParseJsonFile(result) {
		let lat = result.latitude;
		let long = result.longitude;
		let city = result.city;
		let ipNbr = result.ip;
		$("#city").text(city);
		$("#ipNbr").text(ipNbr);
		$.ajax({
			method: "GET",
			url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric"+ "&APPID=f632f8955e8a686bc42802e882ecad84",
			error: ajaxWeatherReturn_Error,
			success: ajaxWeatherReturn_Success
		})
		function ajaxWeatherReturn_Success(result, status, xhr) {
			let sunrise = result.sys.sunrise;
			let sunset = result.sys.sunset;
			let sunriseDate = new Date(sunrise*1000);
			let timeStrSunrise = sunriseDate.toLocaleTimeString();
			let sunsetDate = new Date(sunset*1000);
			let timeStrSunset = sunsetDate.toLocaleTimeString();
			$("#sunrise").text("Sunrise: "+timeStrSunrise);
			$("#sunset").text("Sunset: "+timeStrSunset);
			$("#weather").text(result.weather[0].main);
			$("#degree").text(result.main.temp+" \u2103");
		}//ajaxWeatherReturn_Success
		function ajaxWeatherReturn_Error(result, status, xhr) {
			alert("Error i OpenWeatherMap Ajax");
		}
	}
}