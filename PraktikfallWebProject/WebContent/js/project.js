let projectArray = new Array();
$(document).ready(function(){
	getWeather();
	loadProjects();
	//filter search
	document.getElementById("searchProject").addEventListener("keydown", function(e){
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
				addRow(projectArray[i][0], projectArray[i][1]);
			}
		}
	})
	//Highlight rows in table
	$(document).on("click", "#allProjects tr", function (){
		let selected = $(this).hasClass("highlight");
		$("#allProjects tr").removeClass("highlight");
		if (!selected)
			$(this).addClass("highlight");
		let projectCode = $(this).find("td:eq(0)").text();
		$("#projectCode").val(projectCode);
	})
	$("#AddBtn").click(function(){
		//TODO multiple adds of same object should not be possible
		let projectCodeStr = $("#projectCode").val();
		let nameStr = $("#name").val();
		let obj = {projectCode: projectCodeStr, name: nameStr};
		let jsonString = JSON.stringify(obj);
		if (nameStr != null && projectCodeStr != null){
			//TODO check primary key validity?
			$.ajax({
				method: "POST",
				url: "http://localhost:8080/PraktikfallWebProject/Projects/",
				data: jsonString,
				dataType:'json',
				error: ajaxAddProjectError,
				success: ajaxAddProjectSuccess
			})
			function ajaxAddProjectSuccess(result, status, xhr){
				//TODO Ask Filiph: Empty fields at successful add or let entered values remain?
				$("#projectCode").val("");
				$("#projectCode").attr("placeholder", "Project added");
				$("#name").val("");
				updateTable("add", projectCodeStr, nameStr);
			}
			function ajaxAddProjectError(result, status, xhr){
				console.log("ajaxAddProjectError: " + status);
				$("#errorlabel").text("Error adding project");
			}
		}
	}) //AddBtn
	$("#DeleteBtn").click(function(){
		let projectCodeStr = $("#projectCode").val();
		let obj = {projectCode: projectCodeStr};
		let jsonString = JSON.stringify(obj);
		if (projectCodeStr != null){
			$.ajax({
				method: "DELETE",
				url: "http://localhost:8080/PraktikfallWebProject/Projects/",
				data: jsonString,
				error: ajaxDelProjectError,
				success: ajaxDelProjectSuccess
			})
			function ajaxDelProjectSuccess(result, status, xhr){
				$("#projectCode").val("");
				$("#projectCode").attr("placeholder", "project deleted");
				updateTable("delete", projectCodeStr);
			}
			function ajaxDelProjectError(result, status, xhr){
				console.log("ajaxDelProjectError: " + status);
				$("#errorlabel").text("Error deleting project");
			}
		}
	}) //DeleteBtn
	$("#UpdateBtn").click(function(){
		//TODO prevent changes to project code - not possible, primary key!
		let projectCodeStr = $("#projectCode").val();
		let nameStr = $("#name").val();
		let obj = {projectCode: projectCodeStr, name: nameStr};
		let jsonString = JSON.stringify(obj);
		if (projectCodeStr != null && nameStr != null){
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
				$("#projectCode").attr("placeholder", "Project updated");
				updateTable("update", projectCodeStr, nameStr);
			}
			function ajaxUpdateProjectError(result, status, xhr){
				console.log("ajaxUpdateProjectError: " + status);
				$("#errorlabel").text("Error updating project");
			}
		}
	})
})

function addRow(projectCode, name){
	$("#allProjects tr:last").after("<tr><td>" + projectCode + "</td><td>" + name + "</td></p></tr>");
}
function updateTable(operation, code, name){
	$("#allProjects td").parent().remove(); //Clears table
	let indexOfElement = null;
	switch(operation){
		case("delete"): //removes the row with the given ssn
			for(let i = 0; i < projectArray.length; i++){
				if(projectArray[i][0] === code){
					indexOfElement = i;
				}
			}
			projectArray.splice(indexOfElement, 1);
			break;
		case("add"):
			projectArray.push([code, name]);
			break;
		case("update"):
			for(let i = 0; i < projectArray.length; i++){
				if(projectArray[i][0] === code){
					indexOfElement = i;
				}
			}
			let newRow = [code, name];
			projectArray.splice(indexOfElement, 1, newRow);
			break;
		default:
			break;
	}
	//Adds values back to table
	projectArray.sort();
	for(let i = 0; i < projectArray.length; i++){
		addRow(projectArray[i][0], projectArray[i][1]);
	}
}
function loadProjects(){ //only called once at beginning inside $(document).ready()
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/PraktikfallWebProject/Projects/",
		error: ajaxGetAllProjectsError,
		success: ajaxGetAllProjectsSuccess
	})
	function ajaxGetAllProjectsError (result, status, xhr){
		console.log("Error retreiving all projects: " + status);
	}
	function ajaxGetAllProjectsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			let project = [element.projectCode, element.name];
			projectArray.push(project);
		})
		updateTable();
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