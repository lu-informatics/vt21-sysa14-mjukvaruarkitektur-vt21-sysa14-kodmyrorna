let assignmentArray = new Array(); 
let personArray = new Array();
let projectArray = new Array();
$(document).ready(function(){
	getWeather();
	loadAll();
	//TODO datepicker for ssn?
	toggleSelectVisibility("invisible");
	//filter search
	document.getElementById("searchPerson").addEventListener("keydown", function(e){
		$("#allPersons td").parent().remove(); //Clears table
		let search = "";
		if(e.keyCode === 8){ //If the user presses backspace
			search = $("#searchPerson").val().toUpperCase().substring(0, (search.length - 1));
		} else {
			search = $("#searchPerson").val().toUpperCase() + String.fromCharCode(e.which).toUpperCase();
		}
		for (let i = 0; i < personArray.length; i++){
			let containsSearch = false;
			for(let j = 0; j < personArray[i].length; j++){
				if(personArray[i][j].toUpperCase().includes(search)){
					containsSearch = true;
				}
			}
			if (containsSearch){
				addRow("allPersons", personArray[i][0], personArray[i][1]);
			}
		}
	})
	//Highlight rows in tables
	$(document).on("click", "#allPersons tr", function (){
		let selected = $(this).hasClass("highlight");
		$("#allPersons tr").removeClass("highlight");
		if (!selected) { //If I wanna highlight a row
			$(this).addClass("highlight");
			let ssn = $(this).find("td:eq(0)").text();
			$("#ssn").val(ssn);
			updateProjects(null, ssn, $(this).find("td:eq(1)").text());
		} else { //Un-highlighting a row
			updateProjects("clear");
			$("#ssn").val("");
		}
	})
	$(document).on("click", "#personProjects tr", function (){
		let selected = $(this).hasClass("highlight");
		$("#personProjects tr").removeClass("highlight");
		if (!selected)
			$(this).addClass("highlight");
	})
	$("#AddBtn").click(function(){
		//TODO multiple adds of same object should not be possible
		let ssnStr = $("#ssn").val();
		let nameStr = $("#name").val();
		let obj = {ssn: ssnStr, name: nameStr};
		let jsonString = JSON.stringify(obj);
		if (nameStr != null && ssnStr != null){
			//TODO check primary key validity?
			$.ajax({
				method: "POST",
				url: "http://localhost:8080/PraktikfallWebProject/Persons/",
				data: jsonString,
				dataType:'json',
				error: ajaxAddPersonError,
				success: ajaxAddPersonSuccess
			})
			function ajaxAddPersonSuccess(result, status, xhr){
				//TODO Ask Filiph: Empty fields at successful add or let entered values remain?
				$("#ssn").val("");
				$("#ssn").attr("placeholder", "Person added");
				$("#name").val("");
				updateTable("add", ssnStr, nameStr);
			}
			function ajaxAddPersonError(result, status, xhr){
				console.log("ajaxAddPersonError: " + status);
				$("#errorlabel").text("Error adding person");
			}
		}
	}) //AddBtn
	$("#DeleteBtn").click(function(){
		let ssnStr = $("#ssn").val();
		let obj = {ssn: ssnStr};
		let jsonString = JSON.stringify(obj);
		if (ssnStr != null){
			$.ajax({
				method: "DELETE",
				url: "http://localhost:8080/PraktikfallWebProject/Persons/",
				data: jsonString,
				error: ajaxDelPersonError,
				success: ajaxDelPersonSuccess
			})
			function ajaxDelPersonSuccess(result, status, xhr){
				$("#ssn").val("");
				$("#ssn").attr("placeholder", "Person deleted");
				updateTable("delete", ssnStr);
				updateProjects("clear");
			}
			function ajaxDelPersonError(result, status, xhr){
				console.log("ajaxDelPersonError: " + status);
				$("#errorlabel").text("Error deleting person");
			}
		}
	}) //DeleteBtn
	$("#UpdateBtn").click(function(){
		//TODO prevent changes to social security number - not possible, primary key!
		let ssnStr = $("#ssn").val();
		let nameStr = $("#name").val();
		let obj = {ssn: ssnStr, name: nameStr};
		let jsonString = JSON.stringify(obj);
		if (ssnStr != null && nameStr != null){
			$.ajax({
				method: "PUT",
				url: "http://localhost:8080/PraktikfallWebProject/Persons/",
				data: jsonString,
				dataType: "json",
				error: ajaxUpdatePersonError,
				success: ajaxUpdatePersonSuccess
			})
			function ajaxUpdatePersonSuccess(result, status, xhr){
				$("#name").val("");
				$("#ssn").val("");
				$("#ssn").attr("placeholder", "Person updated");
				updateTable("update", ssnStr, nameStr);
			}
			function ajaxUpdatePersonError(result, status, xhr){
				console.log("ajaxUpdatePersonError: " + status);
				$("#errorlabel").text("Error updating person");
			}
		}
	})//UpdateBtn
	$("#removeFromProject").click(function(){
		let ssn = $("#ssn").val();
		let code = $("#personProjects tr.highlight").find("td:eq(0)").text(); 
		let jsonString = JSON.stringify({persons_ssn: ssn, projects_projectCode: code});
		if (code != null && code != "Project code"){
			$.ajax({
				method: "DELETE",
				url: "http://localhost:8080/PraktikfallWebProject/Assignments/delete",
				data: jsonString,
				error: ajaxDeleteAssignmentError,
				success: ajaxDeleteAssignmentSuccess
			})
			function ajaxDeleteAssignmentError(result, status, xhr){
				//TODO give user error
				console.log("ajaxDeleteAssignmentError: " + xhr);
			}
			function ajaxDeleteAssignmentSuccess(result, status, xhr){
				let personName = $("#allPersons tr.highlight").find("td:eq(1)").text();
				let projectName = $("#personProjects tr.highlight").find("td:eq(1)").text();
				updateProjects("remove", ssn, personName, code, projectName);
			}
		}
	}) //remove from project
	$("#addNewProject").click(function(){
		toggleSelectVisibility("visible");
	}) //show add new project menu
	$("#addToProject").click(function(){
		let ssn = $("#ssn").val();
		let code = $("#selectNewProject").val();
		let jsonString = JSON.stringify({persons_ssn: ssn, projects_projectCode: code});
		if (code != null && ssn != null){
			$.ajax({
				method: "POST",
				url: "http://localhost:8080/PraktikfallWebProject/Assignments/post",
				data: jsonString,
				error: ajaxAddAssignmentError,
				success: ajaxAddAssignmentSuccess
			})
			function ajaxAddAssignmentError(result, status, xhr){
				//TODO give user error
				console.log("ajaxAddAssignmentError: " + xhr);
			}
			function ajaxAddAssignmentSuccess(result, status, xhr){
				let personName = $("#allPersons tr.highlight").find("td:eq(1)").text();
				updateProjects("add", ssn, personName, code);
			}
		}
	}) //addToProject button
})
function updateTable(operation, ssn, name){
	$("#allPersons td").parent().remove(); //Clears table
	let indexOfElement = null;
	switch(operation){
		case("delete"): //removes the row with the given ssn
			for(let i = 0; i < personArray.length; i++){
				if(personArray[i][0] === ssn){
					indexOfElement = i;
				}
			}
			personArray.splice(indexOfElement, 1);
			break;
		case("add"):
			personArray.push([ssn, name]);
			break;
		case("update"):
			for(let i = 0; i < personArray.length; i++){
				if(personArray[i][0] === ssn){
					indexOfElement = i;
				}
			}
			let newRow = [ssn, name];
			console.log(newRow);
			personArray.splice(indexOfElement, 1, newRow);
			break;
		default:
			break;
	}
	//Adds values back to table
	personArray.sort();
	for(let i = 0; i < personArray.length; i++){
		addRow("allPersons", personArray[i][0], personArray[i][1]);
	}
}
function updateProjects(operation, ssn, personName, code, projectName){
	/*FIRST UPDATE TABLE*/
	$("#personProjects td").parent().remove(); //Clears table
	$("#projectLegend").text("Projects " + personName + " is assigned to");
	let indexOfElement = null;
	switch(operation){
		case("remove"):
			for (let i = 0; i < assignmentArray.length; i++){
				if (assignmentArray[i][0] === ssn && assignmentArray[i][1] === code){
					console.log("index of element: " + i);
					indexOfElement = i;
				}
			}
			assignmentArray.splice(indexOfElement, 1);
			break;
		case("add"):
			assignmentArray.push([ssn, code]);
			break;
		case("clear"):
			$("#projectLegend").text("Projects chosen person is assigned to");
		default:
			break;
	}
	assignmentArray.sort();
	let assignmentsWithNames = matchAssignmentNames();
	let personProjects = new Array(); //this persons projects
	for (let i = 0; i < assignmentsWithNames.length; i++){
		if (assignmentsWithNames[i][0] === ssn){
			personProjects.push([assignmentsWithNames[i][2], assignmentsWithNames[i][3]]);
			addRow("personProjects", assignmentsWithNames[i][2], assignmentsWithNames[i][3]);
		}
	}
	/*THEN UPDATE SELECT*/
	toggleSelectVisibility("invisible"); //gonna be populated but invisible until "add new project" is pressed
	$('#selectNewProject').children().remove().end().append('<option>Select project</option>');
	for (let i = 0; i < projectArray.length; i++){
		if(!personProjects.includes(projectArray[i])){
			let projectText = projectArray[i][0] + ", " + projectArray[i][1];
			$('#selectNewProject').append($('<option>').val(projectArray[i][0]).text(projectText));
		}
	}
}
function toggleSelectVisibility(option){
	if(option === "invisible"){
		$(".newProjectMenu").hide("fast");
	} else if (option === "visible"){
		$(".newProjectMenu").show("fast");
	}
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
function addRow(element, val1, val2){
	$("#" + element + " tr:last").after("<tr><td>" + val1 + "</td><td>" + val2 + "</td></p></tr>");
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
		updateTable();
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