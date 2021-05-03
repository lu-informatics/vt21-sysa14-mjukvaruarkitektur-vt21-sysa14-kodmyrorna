<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@page import = "org.ics.ejb.Person"%>
<%@page import = "org.ics.ejb.Project"%>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="ISO-8859-1">
	<link rel="stylesheet" type="text/css" href="../css/confirmation.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
	<script src="../js/weather.js"></script>
	<title>Confirmation</title>
</head>
<body>
	<div class="header">
		<h1>Confirmation</h1>
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
				<% Project project = (Project)request.getAttribute("project");
				Person person = (Person)request.getAttribute("person");
				String operation = (String)request.getAttribute("operation");
				String originJsp = (String)request.getAttribute("originJsp");
				if(operation.equals("add")){ %>
					<h4>Assignment added</h4>
					<p>Person <%=person.getName() %> is now assigned to project <%=project.getName() %></p>
				<%} else if (operation.equals("delete")){%>
					<h4>Assignment deleted</h4>
					<p>Person <%=person.getName() %> is no longer assigned to project <%=project.getName() %></p>
				<%} else { %>
					<h4>Unknown operation</h4>
				<%} 
				if(originJsp.equals("assignment")){%>
					<a href="../jsp/Assignment.jsp">Go Back</a>
				<%} else if(originJsp.equals("person")){%>
					<a href="../jsp/Person.jsp">Go Back</a>
				<%} else if(originJsp.equals("project")){%>
					<a href="../jsp/Project.jsp">Go Back</a>
				<%}%>
			</section>
		</section>
	</div>
	<footer>
		<p>&copy; Arbetsgrupp 7 2021</p>
	</footer>
	</body>
</html>