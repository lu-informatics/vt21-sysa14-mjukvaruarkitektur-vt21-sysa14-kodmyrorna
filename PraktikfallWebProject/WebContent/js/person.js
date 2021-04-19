let personArray = new Array();
$(document).ready(function(){
	getWeather();
	loadPersons();
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
				addRow(personArray[i][0], personArray[i][1]);
			}
		}
	})
	//Highlight rows in table
	$(document).on("click", "#allPersons tr", function (){
		let selected = $(this).hasClass("highlight");
		$("#allPersons tr").removeClass("highlight");
		if (!selected)
			$(this).addClass("highlight");
		let ssn = $(this).find("td:eq(0)").text();
		$("#ssn").val(ssn);
	})
	$("#AddBtn").click(function(){
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
	})
})
function updateTable(operation, ssn, name){
	$("#allPersons td").parent().remove(); //Clears table
	switch(operation){
		case("delete"): //removes the row with the given ssn
			let indexOfElement = null;
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
			let newRow = [ssn, name];
			indexOfElement = null;
			for(let i = 0; i < personArray.length; i++){
				if(personArray[i][0] === ssn){
					indexOfElement = i;
				}
			}
			personArray.splice(indexOfElement, 1, newRow);
			break;
		default:
			break;
	}
	//Adds values back to table
	for(let i = 0; i < personArray.length; i++){
		addRow(personArray[i][0], personArray[i][1]);
	}
}
function addRow(ssn, name){
	$("#allPersons tr:last").after("<tr><td>" + ssn + "</td><td>" + name + "</td></p></tr>");
}
function loadPersons(){ //only called once at beginning inside $(document).ready()
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/PraktikfallWebProject/Persons/",
		error: ajaxGetAllPersonsError,
		success: ajaxGetAllPersonsSuccess
	})
	function ajaxGetAllPersonsError (result, status, xhr){
		console.log("Error retreiving all persons: " + status);
	}
	function ajaxGetAllPersonsSuccess(result, status, xhr){
		$.each(result, function(index, element){
			let person = [element.ssn, element.name];
			personArray.push(person);
			updateTable();
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