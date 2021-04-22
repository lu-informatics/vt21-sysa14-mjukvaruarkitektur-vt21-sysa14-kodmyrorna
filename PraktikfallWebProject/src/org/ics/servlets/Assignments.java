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
		String strContentType = request.getContentType(); //Check the datatype so reading the json data doesn't cause error if another client is sending requests to the servlets 
		if ((pathInfo == null || pathInfo.equals("/")) && strContentType.equals("application/json")) {
			BufferedReader reader = request.getReader(); //creates a reader for getting data from the request
			JsonObject jsonRoot = Json.createReader(reader).readObject(); //Reads object sent through request
			String[] assignment = {jsonRoot.getString("aSsn"), jsonRoot.getString("aProjectCode")}; //Creates a string array for the assignment which can be passed to the method senAsJson()
			Person person = facade.findPersonBySsn(assignment[0]);
			Project project = facade.findProjectByProjectCode(assignment[1]); //Finds the correct person and project object to pass to the facade method addAssignment()
			if (person != null && project != null) { //If the person and project were found in the database
				facade.addAssignment(project, person);
				sendAsJson(response, assignment);
			} 
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		String strContentType = request.getContentType(); //Check the datatype so reading the json data doesn't cause error if another client is sending requests to the servlets 
		if ((pathInfo == null || pathInfo.equals("/")) && strContentType.equals("application/json")) {
			BufferedReader reader = request.getReader(); //creates a reader for getting data from the request
			JsonArray jsonArray = Json.createReader(reader).readArray(); //Reads the data from the request as an array of assignments as json objects
			for (int i = 0; i < jsonArray.size(); i++) { //Iterates through the array and deletes each assignment from the database
				JsonObject assignment = jsonArray.getJsonObject(i); 
				Person person = facade.findPersonBySsn(assignment.getString("aSsn")); //Finds the correct person and proejct to pass to the facade method removeAssignment()
				Project project = facade.findProjectByProjectCode(assignment.getString("aProjectCode"));
				if (person != null && project != null) { //If the person and project were found in the database
					facade.removeAssignment(project, person);
				}
			}
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
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
