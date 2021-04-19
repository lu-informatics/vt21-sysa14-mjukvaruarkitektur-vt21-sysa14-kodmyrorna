$(document).ready(function(){
	$("#TestBtn").click(function(){
		let selectedPerson = "0303030000";
		let selectedProject = "SYST6";
		let obj = {persons_ssn: selectedPerson, projects_projectCode: selectedProject};
		let jsonString = JSON.stringify(obj);
		$.ajax({
			method: "DELETE",
			url: "http://localhost:8080/PraktikfallWebProject/Assignments/",
			data: jsonString,
			error: ajaxDeleteAssignmentError,
			success: ajaxDeleteAssignmentSuccess
		})
		function ajaxDeleteAssignmentSuccess(result, status, xhr){
			console.log("did delete");
		}
		function ajaxDeleteAssignmentError(result, status, xhr){
			console.log("no delete");
		}
	})
})