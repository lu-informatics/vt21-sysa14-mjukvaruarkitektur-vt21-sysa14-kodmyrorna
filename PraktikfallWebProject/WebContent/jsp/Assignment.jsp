<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="ISO-8859-1">
		<link rel="stylesheet" type="text/css" href="../css/assignment.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script src="../js/assignment.js"></script>
		<title>Praktikfall  Assignment</title>
	</head>
	<body>
		<body>
		<header>
			<p>Praktikfall</p>
		</header>
		<section id="row">
			<nav>
				<ul>
					<li class="active"><a href="../html/Home.html">Home</a>
						<ul class="innerlist">
							<li><a href="Person.jsp">Person</a></li>
							<li><a href="Project.jsp">Project</a></li>
							<li class="innerActive"><a>Assignment</a></li>
						</ul>
					</li>
					<li><a href="../html/About.html">About</a></li>
					<li><a>Test</a></li>
				</ul>
			</nav>
			<aside>
				<table id="asideTable">
					<tr>
						<th><span id="city"></span></th>
						<th><span></span></th>
						<th><span></span></th>
						<th><span id="ipNbr"></span></th>
					</tr>
					<tr>
						<td><span id="degree"></span></td>
						<td><span id="weather"></span></td>
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
			<section id="main">
				<section id="content">
					<form>
						<div id="box">
							<fieldset id="personalFS">
								<legend>Assignment</legend>
								Person<br>
								<select id="selectPerson">
									<option>Select person</option>
								</select><br>
								Project<br>
								<select id="selectProject">
									<option>Select project</option>
								</select><br>
								<input type="button" name="submitBtn" value="Add" id="AddBtn">
								<br><p id="feedbackLabel">Feedback displays here</p>
							</fieldset>
						</div>
						<div id="box">
							<img src="../images/search.png" alt="search icon" width="15" height="15">
							<input type="text" name="searchAssignment" id="searchAssignment" value=""><br><br>
							<table id="allAssignments" border="1">
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
							<input type="button" name="submitBtn" value="Delete" id="DeleteBtn">
						</div>
					</form>
				</section>
			</section>
		</section>
		<footer>
			<p>&copy; Arbetsgrupp 7 2021</p>
		</footer>
	</body>
</html>
