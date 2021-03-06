<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="ISO-8859-1">
	<link rel="stylesheet" type="text/css" href="../css/assignment.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
	<script src="../js/weather.js"></script>
	<script src="../js/assignment.js"></script>
	<title>Assignment</title>
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
		<h1>Configure assignments</h1>
		<p><span>Add or remove people from different projects</span></p>
	</header>
			<section id="content">
				<form action="/PraktikfallWebProject/Assignments/" method="POST" onsubmit="return validateAssignmentOp();">
					<div id="box">
						<fieldset class="personalFS">
							<legend>Assign</legend>
							Person<br>
							<select id="selectedPerson" name="selectedPerson">
								<option value="selectPerson" disabled selected>Select person</option>
							</select><br>
							Project<br>
							<select id="selectedProject" name="selectedProject">
								<option value="selectProject" disabled selected>Select project</option>
							</select><br>
							<input type="submit" name="submitBtn" value="Add" id="AddBtn" onclick="submitButton = 'add'">
						</fieldset>
						<br><p id="addFeedback"></p>
					</div>
					<div id="WorksAt">
						<input type="text" name="searchAssignment" id="searchAssignment" value="" placeholder="Search..."><br>
						<div class="tabell">
							<table id="allAssignments">
								<thead>
									<tr>
										<th colspan="2">Person</th>
										<th colspan="2">Project</th>
									</tr>
									<tr>
										<th>Social Security Number</th>
										<th>Name</th>
										<th>Code</th>
										<th>Name</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table><br>
						</div>
						<input type="submit" class="btn" name="submitBtn" value="Delete" id="DeleteBtn" onclick="submitButton = 'delete'">
						<br><p id="deleteFeedback"></p>
					</div>
				</form>
			</section>
		</section>
	</div>
	<footer>
		<p>&copy; Arbetsgrupp 7 2021</p>
	</footer>
</body>
</html>
