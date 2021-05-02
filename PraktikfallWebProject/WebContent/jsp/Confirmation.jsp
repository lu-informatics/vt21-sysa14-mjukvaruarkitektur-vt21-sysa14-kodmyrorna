<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@page import = "org.ics.ejb.Person"%>
<%@page import = "org.ics.ejb.Project"%>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="ISO-8859-1">
	<link rel="stylesheet" type="text/css" href="css/personconfirmation.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
	<script src="js/weather.js"></script>
	<title>Confirmation</title>
</head>
<body>
	<div class="header">
		<h1>Confirmation</h1>
	</div>
	<div class ="wrapper">
		<div class="sidebar">
			<h2><img src="images/logo.png"></h2>
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
			<section id="content">
				<% String object = (String)request.getAttribute("object");
				if (object.equals("person")){
					Person person = (Person)request.getAttribute("person"); 
					String operation = (String)request.getAttribute("operation");
					if (operation.equals("add")){%>
						<h4>Person added</h4><br><br>
						<% out.println("<p>Social security number: " + person.getSsn() + "</p>Name: " + person.getName() + "</p><br>"); 
					} else if (operation.equals("update")){ %>
						<h4>Person updated</h4>
						<% out.println("<p>Social security number: " + person.getSsn() + "</p>Name: " + person.getName() + "</p><br>"); 
					} else if (operation.equals("delete")){ %>
						<h4>Person removed</h4>
					<%} else { %>
						<h4>Unknown operation</h4>
					<%} %>
					<br><br><a href="jsp/Person.jsp">Go Back</a>
				<%} else if (object.equals("project")){
					Project project =(Project)request.getAttribute("project");
					String operation = (String)request.getAttribute("operation");
					if (operation.equals("add")){%>
						<h4>Project added</h4><br><br>
						<% out.println("<p>Project code: " + project.getProjectCode() + "</p>Name: " + project.getName() + "</p><br>");
					} else if (operation.equals("update")){%>
						<h4>Project updated</h4>
						<% out.println("<p>Project code: " + project.getProjectCode() + "</p>Name: " + project.getName() + "</p><br>");
					} else if (operation.equals("delete")){%>
						<h4>Project removed</h4>
					<% } else { %>
						<h4>Unknown operation</h4>
					<%} %>
					<br><br><a href="jsp/Project.jsp">Go Back</a>
				<%} else if (object.equals("assignment")){
					Project project = (Project)request.getAttribute("project");
					Person person = (Person)request.getAttribute("person");
					String operation = (String)request.getAttribute("operation");
					if(operation.equals("add")){ %>
						<h4>Assignment added</h4><br><br>
						<% out.println("<p>Person " + person.getName() + " is now assigned to project " + project.getName() + "</p><br>");
					} else if (operation.equals("delete")){%>
						<h4>Assignment deleted</h4><br><br>
						<% out.println("<p>Person " + person.getName() + " is no longer assigned to project " + project.getName() + "</p><br>");
					} else { %>
						<h4>Unknown operation</h4>
					<% } %>
					<br><br><a href="jsp/Assignment.jsp">Go Back</a>
				<%} else {%>
					<h4>Unknown object</h4>
				<%} %>
			</section>
		</section>
	</div>
	<footer>
		<p>&copy; Arbetsgrupp 7 2021</p>
	</footer>
	</body>
</html>
			