package org.ics.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.List;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.ics.ejb.Person;
import org.ics.ejb.Project;
import org.ics.facade.FacadeLocal;

/**
 * Servlet implementation class Projects
 */
@WebServlet("/Projects/*")
public class Projects extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	@EJB
	private FacadeLocal facade;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Projects() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if (pathInfo == null || pathInfo.equals("/")) {
			List<Project> projects = facade.findAllProjects();
			sendAsJson(response, projects);
			return;
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		String operation = request.getParameter("submitBtn");
		request.setAttribute("object", "project");
		if ((pathInfo == null || pathInfo.equals("/"))) {
			if (operation.equals("Add")) {
				String code = (String)request.getParameter("projectCode");
				String name = (String)request.getParameter("name");
				if(code != null && name != null) {
					Project project = new Project(code, name);
					facade.createProject(project);
					request.setAttribute("project", project);
					request.setAttribute("operation", "add");
				}
				else {
					//failed?
				}
			}
			else if (operation.equals("Update")) {
				String code = (String)request.getParameter("projectCode");
				String name = (String)request.getParameter("name");
				if (code != null && name != null) {
					Project project = new Project(code, name);
					if(facade.findProjectByProjectCode(code) != null) {
						facade.updateProject(project);
						request.setAttribute("project", project);
						request.setAttribute("operation", "update");
					}
				}
			} else if (operation.equals("Delete")) {
				String code = (String)request.getParameter("projectCode");
				if (facade.findProjectByProjectCode(code) != null) {
					facade.deleteProject(code);
					request.setAttribute("operation", "delete");
				}
			}
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/jsp/Confirmation.jsp");
		dispatcher.forward(request, response);
	}
	
	/*************
	 * Function sendAsJson
	 * Parameters: 	HttpServletResponse
	 * 				List<Project>
	 * Description: parses a list of Projects to an array of json objects and uses the HttpServletResponse to send the array back with the response
	 */
	public void sendAsJson(HttpServletResponse response, List<Project> projects) throws IOException {
		PrintWriter out = response.getWriter(); //Enables servlet to print outgoing data
		response.setContentType("application/json"); //Specifies data type to send back
		if (projects != null) {
			JsonArrayBuilder arrayBuilder = Json.createArrayBuilder(); //Need to build an array of objects to send back with the response
			for (Project p : projects) {
				JsonObjectBuilder o = Json.createObjectBuilder(); //A simple way to create new JSON Objects
				o.add("projectCode", p.getProjectCode());
				o.add("name", p.getName());
				arrayBuilder.add(o);
			}
			JsonArray array = arrayBuilder.build();
			out.print(array); //Send the array back with the response!
		}
		else { //If the list of persons is empty, an empty array is sent back with the response
			out.print("[]");
		}
		out.flush(); //clears the out feed to avoid errors
	}
}