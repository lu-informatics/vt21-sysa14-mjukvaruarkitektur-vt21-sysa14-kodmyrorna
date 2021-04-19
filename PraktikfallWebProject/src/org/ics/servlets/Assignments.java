package org.ics.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

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

import org.ics.ejb.Person;
import org.ics.ejb.Project;
import org.ics.facade.FacadeLocal;

/**
 * Servlet implementation class Assignments
 */
@WebServlet("/Assignments/*")
public class Assignments extends HttpServlet {
	private static final long serialVersionUID = 1L;
      
	@EJB
	private FacadeLocal facade;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Assignments() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if (pathInfo.equals("/") || pathInfo == null) {
			sendAsJson(response, facade.findAllAssignments());
		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if(pathInfo == null || pathInfo.equals("/")) {
			BufferedReader reader = request.getReader();
			JsonObject jsonRoot = Json.createReader(reader).readObject();
			String[] assignment = {jsonRoot.getString("persons_ssn"), jsonRoot.getString("projects_projectCode")};
			Person person = facade.findPersonBySsn(assignment[0]);
			Project project = facade.findProjectByProjectCode(assignment[1]);
			if (person != null && project != null) {
				facade.addPersonProject(project, person);
				sendAsJson(response, assignment);
			} 
		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if(pathInfo == null || pathInfo.equals("/")) {
			BufferedReader reader = request.getReader();
			JsonObject jsonRoot = Json.createReader(reader).readObject();
			String[] assignment = {jsonRoot.getString("persons_ssn"), jsonRoot.getString("projects_projectCode")};
			Person person = facade.findPersonBySsn(assignment[0]);
			Project project = facade.findProjectByProjectCode(assignment[1]);
			if (person != null && project != null) {
				System.out.println("doDelete hearing request to delete " + person.getName() + " from " + project.getName());
				facade.removePersonProject(project, person);
			}
		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}
	public void sendAsJson(HttpServletResponse response, ArrayList<String[]> assignments) throws IOException{
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		if (assignments != null) {
			JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
		    for(String[] assignment : assignments) {
		    	JsonObjectBuilder o = Json.createObjectBuilder();
		    	o.add("persons_ssn", assignment[0]);
		    	o.add("projects_projectCode", assignment[1]);
		    	arrayBuilder.add(o);
		    }
		    JsonArray array = arrayBuilder.build();
		    out.print(array);
		} else {
			out.flush();
		}
	}
	public void sendAsJson(HttpServletResponse response, String[] assignment) throws IOException{
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		if (assignment != null) {
			out.print("[{\"persons_ssn\":\"" + assignment[0] + "\",");
			out.print("\"projects_projectCode\":\"" + assignment[1] + "\"}]");
		} else {
			out.print("[]");
		}
		out.flush();
	}
}
