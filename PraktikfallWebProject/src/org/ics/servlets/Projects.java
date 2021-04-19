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
		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if (pathInfo == null || pathInfo.equals("/")) {
			BufferedReader reader = request.getReader();
			Project project = parseJsonProject(reader);
			facade.createProject(project);
			sendAsJson(response, project);
		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if (pathInfo == null || pathInfo.equals("/")) {
			BufferedReader reader = request.getReader();
			Project project = parseJsonProject(reader);
			facade.updateProject(project);
			sendAsJson(response, project);
		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if(pathInfo == null || pathInfo.equals("/")) {
			JsonReader jsonReader = Json.createReader(request.getReader());
			JsonObject jsonRoot = jsonReader.readObject();
			String projectCode = jsonRoot.getString("projectCode");
			facade.deleteProject(projectCode);
		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}
	
	public void sendAsJson(HttpServletResponse response, List<Project> projects) throws IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		if (projects != null) {
			JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
			for (Project p : projects) {
				JsonObjectBuilder o = Json.createObjectBuilder();
				o.add("projectCode", p.getProjectCode());
				o.add("name", p.getName());
				arrayBuilder.add(o);
			}
			JsonArray array = arrayBuilder.build();
			out.print(array);
		}
		else {
			out.print("[]");
		}
		out.flush();
	}
	
	public void sendAsJson(HttpServletResponse response, Project project) throws IOException{
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		if (project != null) {
			out.print("[{\"projectCode\":\"" + project.getProjectCode() + "\",");
			out.print("\"name\":\"" + project.getName() + "\"}]");
		} else {
			out.print("[]");
		}
		out.flush();
	}
	private Project parseJsonProject(BufferedReader reader) {
		JsonReader jsonReader = Json.createReader(reader);
		JsonObject jsonRoot = jsonReader.readObject();
		Project project = new Project();
		project.setProjectCode(jsonRoot.getString("projectCode"));
		project.setName(jsonRoot.getString("name"));
		return project;
	}

}