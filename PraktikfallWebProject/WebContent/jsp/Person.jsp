<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="ISO-8859-1">
		<link rel="stylesheet" type="text/css" href="../css/home.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script src="../js/person.js"></script>
		<title>Praktikfall  Person</title>
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
							<li class="innerActive"><a>Person</a></li>
							<li><a href="Project.jsp">Project</a></li>
							<li><a href="Assignment.jsp">Assignment</a></li>
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
						<fieldset id="PersonalFS" class="box">
							<legend>Person</legend>
							Social Security Number:<br>
							<input type="text" name="ssn" id="ssn" value=""><br>
							Name:<br>
							<input type="text" name="name" id="name" value=""><br><br>
							<input type="button" name="submitBtn" value="Add" id="AddBtn">
							<input type="button" name="submitBtn" value="Update" id="UpdateBtn">
							<p id="errorlabel">Error displays here</p>
						</fieldset>
					</form>
					<div id="box">
						<img src="../images/search.png" alt="search icon" width="15" height="15">
						<input type="text" name="searchPerson" id="searchPerson" value=""><br><br>
						<table id="allPersons" border="1">
							<thead>
								<tr>
									<th>Social Security Number</th>
									<th>Name</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table><br>
						<input type="button" name="submitBtn" value="Delete" id="DeleteBtn">
					</div>
				</section>
			</section>
		</section>
		<footer>
		<p>&copy; Arbetsgrupp 7 2021</p>
		</footer>
	</body>
</html>
