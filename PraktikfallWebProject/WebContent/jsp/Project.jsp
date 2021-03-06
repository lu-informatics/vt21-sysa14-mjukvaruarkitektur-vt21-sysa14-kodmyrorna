<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="ISO-8859-1">
		<link rel="stylesheet" type="text/css" href="../css/project.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
		<script src="../js/weather.js"></script>
		<script src="../js/project.js"></script>
		<title>Project</title>
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
		<h1>Project</h1>
		<p><span>Add or remove projects</span></p>
	</header>
				<section id="content">
					<div class="box">
						<form action="/PraktikfallWebProject/Projects" method="POST" onsubmit="return validateProjectOp();">
							<fieldset class="PersonalFS">
								<legend>Project</legend>
								Project Code:<br>
								<input type="text" name="projectCode" id="projectCode" value="" maxlength="10">
								<input type="button" name="X" id="X" value="&#10006"><br>
								<input type="hidden" name="hiddenProjectCode" id="hiddenProjectCode" value="">
								Name:<br>
								<input type="text" name="name" id="name" value="" maxlength="25"><br><br>
								<input type="submit" name="submitBtn" value="Add" id="AddBtn" onclick="submitButton='add'">
								<input type="submit" name="submitBtn" value="Update" id="UpdateBtn" onclick="submitButton='update'">
								<p id="fieldsetFeedback"></p>
							</fieldset>
							<input type="text" name="searchProject" id="searchProject" value="" placeholder="Search...">
							<div class="tabell">
								<table id="allProjects" border="1">
									<thead class="fixed">
										<tr>
											<th>Project Code</th>
											<th>Name</th>
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
								<legend id="personLegend">Choose project to see their assigned persons</legend>
								<div class="tabell">
									<table id="projectPersons">
										<thead class="fixed">
											<tr>
												<th>Social security number</th>
												<th>Name</th>
											</tr>
										</thead>
										<tbody></tbody>
									</table>
								</div>
								<br><input type="submit" name="submitBtn" id="removePerson" value="Remove Person" onclick="submitButton='removePerson'"><br>
								<br><input type="button" name="addNewPerson" id="addNewPerson" value="Add new person..."><br>
								<p id="newPersonFeedback"></p>
								<div id="newPersonMenu" class="newPersonMenu">
									<fieldset id="newProjectFS" class="newPersonMenu">
										<span id=label>Choose person to add to project</span>
										<br><select name="selectNewPerson" id="selectNewPerson" class="newPersonMenu">
											<option disabled selected>Select person</option>
										</select><br>
										<input type="submit" name="submitBtn" id="addPerson" value="Add Person" class="newPersonMenu" onclick="submitButton='addPerson'"><br>
									</fieldset>
								</div>
							</fieldset>
							<input type="hidden" name="selectedPerson" id="selectedPerson" value="">
							<input type="hidden" name="selectedProject" id="selectedProject" value="">
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
