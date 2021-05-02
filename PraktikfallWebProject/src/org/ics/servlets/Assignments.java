package org.ics.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.servlet.AsyncContext;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.ics.ejb.*;
import org.ics.facade.*;

/**
 * Servlet implementation class Assignments
 */
@WebServlet(urlPatterns= {"/Assignments/*"}, asyncSupported=true)
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
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		request.setAttribute("object", "assignment");
		System.out.println("doPost assignment"); //TODO remove this
		if ((pathInfo == null || pathInfo.equals("/"))) {
			String operation = request.getParameter("submitBtn");
			if (operation.equals("Add")) {
				System.out.println("operation is add"); //TODO remove this
				String ssn = (String)request.getParameter("selectedPerson");
				Person person = facade.findPersonBySsn(ssn);
				String code = (String)request.getParameter("selectedProject");
				Project project = facade.findProjectByProjectCode(code);
				if(person != null && project != null) {
					System.out.println(person.getName() + " add to  " + project.getName());
					facade.addAssignment(project, person);
					request.setAttribute("project", project);
					request.setAttribute("person", person);
					request.setAttribute("operation", "add");
				}
				else {
					//failed?
				}
			} else if (operation.equals("Delete")) {
				System.out.println("operation is delete"); //TODO remove this
				String ssn = (String)request.getParameter("selectedPerson");
				Person person = facade.findPersonBySsn(ssn);
				String code = (String)request.getParameter("selectedProject");
				Project project = facade.findProjectByProjectCode(code);
				if(person != null && project != null) {
					System.out.println(person.getName() + " remove from " + project.getName());
					facade.removeAssignment(project, person);
					request.setAttribute("project", project);
					request.setAttribute("person", person);
					request.setAttribute("operation", "delete");
				}
			}
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
		RequestDispatcher dispatcher = request.getRequestDispatcher("jsp/Confirmation.jsp");
		dispatcher.forward(request, response);
	}

	
	/*************
	 * Function sendAsJson
	 * Parameters: 	HttpServletResponse
	 * 				ArrayList<String>
	 * Description: parses an arraylist of arrays of strings representing assignments to an array of json objects and uses the HttpServletResponse to send 
	 * 				the array back with the response
	 */
	public void sendAsJson(HttpServletResponse response, ArrayList<String[]> assignments) throws IOException{
		PrintWriter out = response.getWriter(); //Enables servlet to print outgoing data
		response.setContentType("application/json"); //Specifies data type to send back
		if (assignments != null) {
			JsonArrayBuilder arrayBuilder = Json.createArrayBuilder(); //Need to build an array of json objects to send back with the response
		    for(String[] assignment : assignments) {
		    	JsonObjectBuilder o = Json.createObjectBuilder(); //A simple way to create new JSON Objects
		    	o.add("aSsn", assignment[0]);
		    	o.add("aProjectCode", assignment[1]);
		    	arrayBuilder.add(o);
		    }
		    JsonArray array = arrayBuilder.build();
		    out.print(array); //Send the array back with the response!
		} else {
			out.print("[]"); //If the list of persons is empty, an empty array is sent back with the response
		}
		out.flush(); //clears the out feed to avoid errors
	}
	
	/*************
	 * Function sendAsJson
	 * Parameters: 	HttpServletResponse
	 * 				String[]
	 * Description: parses the string array representing an assignment to a json object and uses the HttpServletResponse to send it back with the response
	 */
	public void sendAsJson(HttpServletResponse response, String[] assignment) throws IOException{
		PrintWriter out = response.getWriter(); //Enables servlet to print outgoing data
		response.setContentType("application/json"); //Specifies data type to send back
		if (assignment != null) {
			out.print("[{\"aSsn\":\"" + assignment[0] + "\","); //Creating a JSON object 'manually'
			out.print("\"aProjectCode\":\"" + assignment[1] + "\"}]");
		} else {
			out.print("[]"); //If the assignment is null, an empty array of objects is sent back instead
		}
		out.flush(); //clears the out feed to avoid errors
	}
}
