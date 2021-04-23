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
	<script src="../js/person.js"></script>
	<title>Person</title>
</head>
<body>
	<div class="header">
		<h1>Person</h1>
		<p><span>Add or remove people</span></p>
	</div>
	<div class ="wrapper">
		<div class="sidebar">
			<h2><img src="../images/logo.png"></h2>
			<ul>
				<li><a href="../html/Home.html"><i class="fas fa-home"></i>Home</a></li>
				<li><a href="../jsp/Person.jsp"><i class="fas fa-user-friends"></i>Person</a></li>
				<li><a href="../jsp/Project.jsp"><i class="fas fa-project-diagram"></i>Project</a></li>
				<li><a href="../jsp/Assignment.jsp"><i class="fas fa-network-wired"></i>Assignment</a></li>
				<li><a href="../html/About.html"><i class="fas fa-address-card"></i>About</a></li>
				<li><a href="../html/Test.html"><i class="fas fa-file-alt"></i>Test</a></li>
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
			<section id="content">
				<div class="box">
					<form>
						<fieldset class="PersonalFS">
							<legend>Person</legend>
							Social Security Number:<br>
							<input type="text" name="ssn" id="ssn" value="" placeholder="YYMMDDXXXX" maxlength="10"> <br>
							Name:<br>
							<input type="text" name="name" id="name" value="" maxlength="25"><br><br>
							<input type="button" name="submitBtn" value="Add" id="AddBtn">
							<input type="button" name="submitBtn" value="Update" id="UpdateBtn">
							<br><p id="fieldsetFeedback"></p>
						</fieldset>
					</form>
					<br><img src="../images/search.png" alt="search icon" width="25" height="25" id="searchImage">
					<input type="text" name="searchPerson" id="searchPerson" value=""><br>
					<table id="allPersons">
						<thead>
							<tr>
								<th colspan="1">Social Security Number</th>
								<th colspan="1">Name</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
					<p id="deleteFeedback"></p>
					<input type="button" name="submitBtn" value="Delete" id="DeleteBtn">
				</div>
				<div class="box">
					<fieldset class="PersonalFS">
						<legend id="projectLegend">Projects chosen person is assigned to</legend>
						<table id="personProjects">
							<thead>
								<tr>
									<th>Project Code</th>
									<th>Project name</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
						<br><input type="button" name="removeFromProject" id="removeFromProject" value="Remove from project"><br>
						<br><input type="button" name="addNewProject" id="addNewProject" value="Add new project..."><br>
						<br><p id="newProjectFeedback"></p>
						<hr>
						<div id="newProjectMenu" class="newProjectMenu">
							<div id="newProjectFS" class="newProjectMenu">
								<span id=label>Choose project to add to person</span>
								<br><select id="selectNewProject" class="newProjectMenu">
									<option>Select project</option>
								</select><br>
								<input type="button" name="addToProject" id="addToProject" value="Add" class="newProjectMenu"><br>
						</div>
						<p id="newProjectFeedback"></p>
					</div>
				</fieldset>
			</div>
		</section>
	</section>
</div>
<footer>
	<p>&copy; Arbetsgrupp 7 2021</p>
</footer>
</body>
</html>
