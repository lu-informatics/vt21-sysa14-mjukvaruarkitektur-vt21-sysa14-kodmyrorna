$(document).ready(function(){
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
   });
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
   		$("#weather").text("Weather: "+result.weather[0].main);
   		$("#degree").text("Degrees: "+result.main.temp+" \u2103");
   	}//ajaxWeatherReturn_Success
   	function ajaxWeatherReturn_Error(result, status, xhr) {
   		alert("Error i OpenWeatherMap Ajax");
   	}
   	
   	$("#FindBtn").click( function() {
   		clearText();
   		var strSsn = $("#ssn").val();
   		let isNumber = /^\d+$/.test(strSsn);
   		if (strSsn != "" && isNumber) {
   			$.ajax({
   				method: "GET",
   				url: "http://localhost:8080/PraktikfallRestClient/RestServlet/"+strSsn,
   				error: ajaxFindReturnError,
   				success: ajaxFindReturnSuccess
   			})
   			function ajaxFindReturnSuccess(result, status, xhr) {
   				if(checkResult(result)){
   						clearFields();
   						$("#FeedbackPerson").text("Person doesnt exist" );
					} else {
						ParseJsonFilePerson(result);
					}
				}
   			function ajaxFindReturnError(result, status, xhr) {
   				alert("Error");
   				console.log("Ajax-find person: "+status);
   				}
   			}
   		if(strSsn.length < 10){
			$("#FeedbackPerson").text("Please enter a social security number with 10 digits in the format YYMMDDXXXX" );
		} else if (isEmpty) {
			$("#FeedbackPerson").text("Please enter a social security number.");
		} else if (!isNumber) {
			$("#FeedbackPerson").text("Please enter only digits into social security number.");
		}
   		})	
   		
   		$("#DeleteBtn").click( function() { 
   			clearText();
   			var strSsn = $("#ssn").val();
   			if (strSsn != "") {
   				$.ajax({
   					method: "DELETE",
   					url: "http://localhost:8080/PraktikfallRestClient/RestServlet/"+strSsn, 
   					error: ajaxDelReturnError, 
   					success: ajaxDelReturnSuccess
   				})
   				function ajaxDelReturnSuccess(result, status, xhr) {
   					if(result.length === 0){
   						$("#FeedbackPerson").text("Person doesnt exist");
   					} else {
   					clearFields();
   					$("#FeedbackPerson").text("Person deleted");
   					}
   				}
   				function ajaxDelReturnError(result, status, xhr) {
   					alert("Error");
   					console.log("Ajax-find person: "+status);
   				}
   			}
   			if(strSsn.length < 10){
   				$("#FeedbackPerson").text("Please enter a social security number with 10 digits in the format YYMMDDXXXX" );
   			} else if (isEmpty) {
   				$("#FeedbackPerson").text("Please enter a social security number.");
   			} else if (!isNumber) {
   				$("#FeedbackPerson").text("Please enter only digits into social security number.");
   			}
   		})
   		
   		$("#AddBtn").click( function() {
   			clearText();
   			var strSsn = $("#ssn").val();
   			var strName = $("#name").val();
   			let isEmpty = !strName.replace(/\s/g, '') || !strSsn.replace(/\s/g, '');
   			let isNumber = /^\d+$/.test(strSsn);
   			var obj = { ssn: strSsn, name: strName};
   			var jsonString = JSON.stringify(obj);
   			if (!isEmpty && isNumber && strSsn.length === 10) {
   				$.ajax({
   					method: "POST",
   					url: "http://localhost:8080/PraktikfallRestClient/RestServlet/",  
   					data: jsonString,
   					dataType:'json',
   					error: ajaxAddReturnError, 
   					success: ajaxAddReturnSuccess
   				})
   				function ajaxAddReturnSuccess(result, status, xhr) {
   						clearFields();
   						$("#FeedbackPerson").text("Person added" );
   					}
   				
   				function ajaxAddReturnError(result, status, xhr) {
   					alert("Error Add");
   					console.log("Ajax-find person: "+status);
   				}
   			}
   			if(strSsn.length < 10){
					$("#FeedbackPerson").text("Please enter a social security number with 10 digits in the format YYMMDDXXXX" );
				} else if (isEmpty) {
   				$("#FeedbackPerson").text("Please enter a name and a social security number.");
   			} else if (!isNumber) {
   				$("#FeedbackPerson").text("Please enter only digits into social security number.");
   			}
   		})
   		
   		$("#UpdateBtn").click( function() {
   			clearText();
   			var strSsn = $("#ssn").val();
   			var strName = $("#name").val();
   			let isEmpty = !strName.replace(/\s/g, '') || !strSsn.replace(/\s/g, '');
   			let isNumber = /^\d+$/.test(strSsn);
   			var obj = { ssn: strSsn, name: strName};
   			var jsonString = JSON.stringify(obj);
   			if (!isEmpty && isNumber && strSsn.length === 10) {
   				$.ajax({
   					method: "PUT",
   					url: "http://localhost:8080/PraktikfallRestClient/RestServlet/"+strSsn, 
   					data: jsonString,
   					dataType:'json',
   					error: ajaxUpdateReturnError, 
   					success: ajaxUpdateReturnSuccess
   				})
   				function ajaxUpdateReturnSuccess(result, status, xhr) {
   					clearFields();
						$("#FeedbackPerson").text("Person updated" );
					}
				
   				function ajaxUpdateReturnError(result, status, xhr) {
   					alert("Error Update");
   					console.log("Ajax-find person: "+status);
   				}
   			}
   			if(strSsn.length < 10){
				$("#FeedbackPerson").text("Please enter a social security number with 10 digits in the format YYMMDDXXXX" );
			} else if (isEmpty) {
				$("#FeedbackPerson").text("Please enter a name and a social security number.");
			} else if (!isNumber) {
				$("#FeedbackPerson").text("Please enter only digits into social security number.");
			}
   		})
   }
   function ParseJsonFilePerson(result) {
  		if(result.length != 0){
  			$("#ssn").val(result[0].ssn);
  	  		$("#name").val(result[0].name);
  		} else {
  			alert("No person found");
  		}
  	}
   
   function clearFields() {
	   $("#ssn").val("");
	   $("#name").val("");
	   }
   
   function clearText(){
	   $("#FeedbackPerson").text("");
   }
   
   function checkResult(result) {
	    return Object.keys(result).length === 0;
	}
 
   