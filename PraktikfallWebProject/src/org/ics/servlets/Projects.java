package org.ics.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
		if (pathInfo == null || pathInfo.equals("/")) {
			BufferedReader reader = request.getReader(); //creates a reader for getting data from the request
			Project project = parseJsonProject(reader);
			facade.createProject(project);
			sendAsJson(response, project);
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if (pathInfo == null || pathInfo.equals("/")) {
			BufferedReader reader = request.getReader(); //creates a reader for getting data from the request
			Project project = parseJsonProject(reader);
			facade.updateProject(project);
			sendAsJson(response, project);
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if(pathInfo == null || pathInfo.equals("/")) {
			JsonReader jsonReader = Json.createReader(request.getReader()); //Create a reader for getting Json-formatted data
			JsonObject jsonRoot = jsonReader.readObject(); //Assume there is only one object sent to doDelete, not an array
			String projectCode = jsonRoot.getString("projectCode"); //Collect project code from the object
			facade.deleteProject(projectCode);
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
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
	
	/*************
	 * Function sendAsJson
	 * Parameters: 	HttpServletResponse
	 * 				Project
	 * Description: parses the project to a json object and uses the HttpServletResponse to send it back with the response
	 */
	public void sendAsJson(HttpServletResponse response, Project project) throws IOException{
		PrintWriter out = response.getWriter(); //Enables servlet to print outgoing data
		response.setContentType("application/json"); //Specifies data type to send back
		if (project != null) {
			out.print("[{\"projectCode\":\"" + project.getProjectCode() + "\","); //Creating a JSON object 'manually'
			out.print("\"name\":\"" + project.getName() + "\"}]");
		} else {
			out.print("[]"); //If the person is null, an empty array of objects is sent back instead
		}
		out.flush(); //clears the out feed to avoid errors
	}
	
	/*************
	 * Function parseJsonReader
	 * Parameter: BufferedReader
	 * Returns: Project
	 * Description: Parses a Json object to an instance of the Project entity bean
	 */
	private Project parseJsonProject(BufferedReader reader) {
		JsonReader jsonReader = Json.createReader(reader); //Create a reader for getting Json-formatted data
		JsonObject jsonRoot = jsonReader.readObject();  //Assume there is only one object, not an array
		Project project = new Project();
		project.setProjectCode(jsonRoot.getString("projectCode")); //Collect project data from the object
		project.setName(jsonRoot.getString("name"));
		return project;
	}

}