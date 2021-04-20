let assignmentArray = new Array(); 
let personArray = new Array();
let projectArray = new Array();
$(document).ready(function(){
	getWeather();
    loadAll();
	$(document).on("click", "#allAssignments thead tr", function (){
		let selected = $(this).hasClass("highlight");
		$("#allAssignments tr").removeClass("highlight");
		if (!selected)
			$(this).addClass("highlight");
	})
	//searchbar
	document.getElementById("searchAssignment").addEventListener("keydown", function(e){
		$("#allAssignments td").parent().remove(); //clears table
		let search = "";
		if(e.keyCode === 8){ //If the user presses backspace
			search = $("#searchAssignment").val().toUpperCase().substring(0, (search.length - 1));
		} else {
			search = $("#searchAssignment").val().toUpperCase() + String.fromCharCode(e.which).toUpperCase();
		}
		let assignmentsWithNames = matchAssignmentNames();
		for (let i = 0; i < assignmentsWithNames.length; i++){
			let containsSearch = false;
			for(let j = 0; j < assignmentsWithNames[i].length; j++){
				if(assignmentsWithNames[i][j].toUpperCase().includes(search)){
					containsSearch = true;
				}
			}
			if (containsSearch){
				addRow(assignmentsWithNames[i]);
			}
		}
	})
	$("#AddBtn").click(function(){
		//TODO multiple adds of same item should not be possible
		let ssn = $("#selectPerson").val();
		let code = $("#selectProject").val();
		if (ssn != "Select person" && code != "Select project"){
			let obj = {persons_ssn: ssn, projects_projectCode: code};
			let jsonString = JSON.stringify(obj);
			$.ajax({
				method: "POST",
				url: "http://localhost:8080/PraktikfallWebProject/Assignments/post",
				data: jsonString,
				dataType: "json",
				error: ajaxAddAssignmentError,
				success: ajaxAddAssignmentSuccess
			})
			function ajaxAddAssignmentSuccess(result, status, xhr){
				let assignmentsWithNames = matchAssignmentNames();
				let personName = ""; 
				let projectName = "";
				for (let i = 0; i < assignmentsWithNames; i++){
					if (result.persons_ssn === assignmentsWithNames[i][0]){
						personName = assignmentsWithNames[i][1];
					}
					if (result.projects_projectCode === assignmentsWithNames[i][2]){
						projectName = assignmentsWithNames[i][3];
					}
				}
				updateTable("add", ssn, code, personName, projectName);
			}
			function ajaxAddAssignmentError(result, status, xhr){
				console.log("ajaxAddAssignmentError xhr: " + xhr);
			}
		}
	})
	$("#DeleteBtn").click(function(){ //TODO DOESN'T DELETE OBJECT FROM DATABASE: NOT SURE WHERE PROBLEM IS
		//Check which table row is selected
		let selectedPerson = null;
		let selectedProject = null;
		$("#allAssignments tr").each(function(index, element){
			if($(this).hasClass("highlight")){
				selectedPerson = $(this).find("td:eq(0)").text();
				selectedProject = $(this).find("td:eq(2)").text();
			}
		})
		if (selectedPerson != null && selectedProject != null){
			let obj = {persons_ssn: selectedPerson, projects_projectCode: selectedProject};
			let jsonString = JSON.stringify(obj);
			$.ajax({
				method: "DELETE",
				url: "http://localhost:8080/PraktikfallWebProject/Assignments/delete",
				data: jsonString,
				error: ajaxDeleteAssignmentError,
				success: ajaxDeleteAssignmentSuccess
			})
			function ajaxDeleteAssignmentSuccess(result, status, xhr){
				updateTable("delete", selectedPerson, selectedProject);
				alert("success..?");
			}
			function ajaxDeleteAssignmentError(result, status, xhr){
				console.log("ajaxDeleteAssignmentError xhr: " + xhr);
			}
		} else {
			//TODO tell user to select a person and project from the table
		}
	})
})
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
function updateTable(operation, personSsn, projectCode, personName, projectName){
	$("#allAssignments td").parent().remove(); //Clears table
	switch(operation){
		case("add"):
			assignmentArray.push([personSsn, projectCode]);
			break;
		case("delete"):
			let indexOfElement = null;
			for (let i = 0; i < assignmentArray.length; i++){
				if (assignmentArray[i][0] === personSsn && assignmentArray[i][1] === projectCode){
					indexOfElement = i;
				}
			}
			assignmentArray.splice(indexOfElement, 1);
			break;
		default:
			break;
	}
	let assignmentsWithNames = matchAssignmentNames();
	assignmentsWithNames.sort();
	for (let i = 0; i < assignmentsWithNames.length; i++){
		addRow(assignmentsWithNames[i]);
	}
}
function fillSelects(){
	for (let i = 0; i < personArray.length; i++){
		let personText = personArray[i][0] + ", " + personArray[i][1];
		$('#selectPerson').append($('<option>').val(personArray[i][0]).text(personText));
	}
	for (let i = 0; i < projectArray.length; i++){
		let projectText = projectArray[i][0] + ", " + projectArray[i][1];
		$('#selectProject').append($('<option>').val(projectArray[i][0]).text(projectText))
	}
}
function addRow(row){
	$("#allAssignments tr:last").after("<tr><td>" + row[0] + "</td><td>" + row[1] + "</td><td>" + row[2] + "</td><td>" + row[3] + "</td></tr>"); 
}
async function loadAll() {
    await loadPersons();
    await loadProjects();
}
async function loadPersons(){
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/PraktikfallWebProject/Persons/",
		error: ajaxGetPersonsError,
		success: ajaxGetPersonsSuccess
	})
	function ajaxGetPersonsError(result, status, xhr){
		console.log("ajaxGetPersonsError xhr: " + xhr);
	}
	function ajaxGetPersonsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			personArray.push([element.ssn, element.name]);
		})
	}
}
async function loadProjects(){
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/PraktikfallWebProject/Projects/",
		error: ajaxGetProjectsError,
		success: ajaxGetProjectsSuccess
	})
	function ajaxGetProjectsError(result, status, xhr){
		console.log("ajaxGetProjectsError xhr: " + xhr);
		//TODO change all of these to xhr, better error message
	}
	function ajaxGetProjectsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			projectArray.push([element.projectCode, element.name]);
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
	function ajaxGetAssignmentsError(result, status, xhr){
		console.log("ajaxGetAssignmentsError xhr: " + xhr);
	}
	function ajaxGetAssignmentsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			assignmentArray.push([element.persons_ssn, element.projects_projectCode]);
		})
		updateTable();
		fillSelects();
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