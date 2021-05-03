<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="ISO-8859-1">
	<link rel="stylesheet" type="text/css" href="../css/person.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
	<script src="../js/weather.js"></script>
	<script src="../js/person.js"></script>
	<title>Person</title>
</head>
<body>
	
	<div class ="wrapper">
		<div class="sidebar">
			<h2><img src="../images/logo.png"></h2>
			<ul>
				<li><a href="../html/Home.html"><i class="fas fa-home"></i>Home</a></li>
				<li><a href="../jsp/Person.jsp"><i class="fas fa-user-friends"></i>Person</a></li>
				<li><a href="../jsp/Project.jsp"><i class="fas fa-project-diagram"></i>Project</a></li>
				<li><a href="../jsp/Assignment.jsp"><i class="fas fa-network-wired"></i>Assignment</a></li>
				<li><a href="../html/About.html"><i class="fas fa-address-card"></i>About</a></li>
				<li><a href="../index.html"><i class="fas fa-file-alt"></i>Test</a></li>
			</ul>
			<aside class="weather_container">
				<table class="weather">
					<tr>
						<th><span id="city"></span></th>
						<th><span></span></th>
						<th><span></span></th>
						<th><span id="ipNbr"></span></th>
					</tr>
					<tr>
						<td colspan="4"><span id="degree"></span></td>
					</tr>
					<tr>
						<td colspan="4"><span id="weather"></span></td>
						<td><span></span></td>
						<td><span></span></td>
					</tr>
					<tr>
						<td colspan="4"><span id="sunrise"></span></td>
					</tr>
					<tr>
						<td colspan="4"><span id="sunset"></span></td>
					</tr>
				</table>
			</aside>
		</div>
		<section id="main">
		<header>
		<h1>Person</h1>
		<p><span>Add or remove people</span></p>
	</header>
			<section id="content">
				<div class="box">
					<form action="/PraktikfallWebProject/Persons" method="POST" onsubmit="return validatePersonOp();">
						<fieldset class="PersonalFS">
							<legend>Person</legend>
							Social Security Number:<br>
							<input type="text" name="ssn" id="ssn" value="" placeholder="YYMMDDXXXX" maxlength="10"> <br>
							Name:<br>
							<input type="text" name="name" id="name" value="" maxlength="25"><br><br>
							
							<input type="submit" name="submitBtn" value="Add" id="addBtn" onclick="submitButton='add'">
							<input type="submit" name="submitBtn" value="Update" id="updateBtn" onclick="submitButton='update'">
							
							<br><p id="fieldsetFeedback"></p>
						</fieldset>
						<input type="text" name="searchPerson" id="searchPerson" value="" placeholder="Search...">
						<div class="tabell">
							<table id="allPersons">
							<thead class="fixed">
								<tr>
									<th colspan="1">Social Security Number</th>
									<th colspan="1">Name</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						</div>
						<p id="deleteFeedback"></p>
						<input type="submit" name="submitBtn" value="Delete" id="DeleteBtn" onclick="submitButton='delete'">
					</form>
				</div>
				<div class="box">
					<form action="/PraktikfallWebProject/Assignments/" method="POST" onsubmit="return validateAssignmentOp();">
						<fieldset class="PersonalFS">
							<legend id="projectLegend">Projects chosen person is assigned to</legend>
							<div class="tabell">
								<table id="personProjects">
									<thead class="fixed">
										<tr>
											<th>Project Code</th>
											<th>Project name</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
							<br><input type="submit" name="submitBtn" id="removeFromProject" value="Remove from project" onclick="submitButton='removeFromProject'"><br>
							<br><input type="button" name="addNewProject" id="addNewProject" value="Add new project..."><br>
							<br><p id="newProjectFeedback"></p>
							<hr>
							<div id="newProjectMenu" class="newProjectMenu">
								<div id="newProjectFS" class="newProjectMenu">
									<span id=label>Choose project to add to person</span>
									<br><select name="selectNewProject" id="selectNewProject" class="newProjectMenu">
										<option disabled selected>Select project</option>
									</select><br>
									<input type="submit" name="submitBtn" id="addProject" value="Add Project" class="newProjectMenu" onclick="submitButton='addProject'"><br>
							</div>
							<p id="newProjectFeedback"></p>
						</div>
					</fieldset>
					<input id="selectedPerson" name="selectedPerson" type="hidden" value="">
					<input id="selectedProject" name="selectedProject" type="hidden" value="">
				</form>
			</div>
		</section>
	</section>
</div>
<footer>
	<p>&copy; Arbetsgrupp 7 2021</p>
</footer>
</body>
</html>
