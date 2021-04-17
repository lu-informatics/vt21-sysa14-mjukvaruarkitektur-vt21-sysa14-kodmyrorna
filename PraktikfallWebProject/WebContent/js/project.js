var projectArray = new Array();
$(document).ready(function(){
	getWeather();
	populateTable();
	//filter search
	document.getElementById("searchProject").addEventListener("keydown", function(e){
		clearTable();
		var search = "";
		if(e.keyCode === 8){ //If the user presses backspace
			search = $("#searchProject").val().toUpperCase().substring(0, (search.length - 1));
		} else {
			search = $("#searchProject").val().toUpperCase() + String.fromCharCode(e.which).toUpperCase();
		}
		for (var i = 0; i < projectArray.length; i++){
			var containsSearch = false;
			for(var j = 0; j < projectArray[i].length; j++){
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
		var selected = $(this).hasClass("highlight");
		$("#allProjects tr").removeClass("highlight");
		if (!selected)
			$(this).addClass("highlight");
		var projectCode = $(this).find("td:eq(0)").text();
		$("#projectCode").val(projectCode);
	})
})

function populateTable(){
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
		projectArray = new Array();
		$.each(result, function(index, element){
			var row = new Array(element.projectCode, element.name);
			addRow(element.projectCode, element.name);
			projectArray.push(row);
		})
	}
}
function autoComplete(){
}
function addRow(projectCode, name){
	$("#allProjects tr:last").after("<tr><td>" + projectCode + "</td><td>" + name + "</td></p></tr>");
}
function clearTable(){
	$("#allProjects td").parent().remove();
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
		var lat = result.latitude;
		var long = result.longitude;
		var city = result.city;
		var ipNbr = result.ip;
		$("#city").text(city);
		$("#ipNbr").text(ipNbr);
		$.ajax({
			method: "GET",
			url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric"+ "&APPID=f632f8955e8a686bc42802e882ecad84",
			error: ajaxWeatherReturn_Error,
			success: ajaxWeatherReturn_Success
		})
		function ajaxWeatherReturn_Success(result, status, xhr) {
			var sunrise = result.sys.sunrise;
			var sunset = result.sys.sunset;
			var sunriseDate = new Date(sunrise*1000);
			var timeStrSunrise = sunriseDate.toLocaleTimeString();
			var sunsetDate = new Date(sunset*1000);
			var timeStrSunset = sunsetDate.toLocaleTimeString();
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