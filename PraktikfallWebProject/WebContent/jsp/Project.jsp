<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="ISO-8859-1">
		<link rel="stylesheet" type="text/css" href="../css/home.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script src="../js/project.js"></script>
		<title>Praktikfall  Project</title>
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
							<li class="innerActive"><a>Project</a></li>
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
			<section id="main">´
				<section id="content">
					<form>
						<fieldset id="PersonalFS" class="box">
							<legend>Project</legend>
							Project Code:<br>
							<input type="text" name="projectCode" id="projectCode" value=""><br>
							Name:<br>
							<input type="text" name="name" id="name" value=""><br><br>
							<input type="button" name="submitBtn" value="Add" id="AddBtn">
							<input type="button" name="submitBtn" value="Update" id="UpdateBtn">
						</fieldset>
					</form>
					<div id="box">
						<img src="../images/search.png" alt="search icon" width="15" height="15">
						<input type="text" name="searchProject" id="searchProject" value=""><br><br>
						<table id="allProjects" border="1">
							<thead>
								<tr>
									<th>Project Code</th>
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
