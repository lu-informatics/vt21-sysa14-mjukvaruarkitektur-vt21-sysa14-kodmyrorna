package org.ics.servlets;

import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

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
import org.ics.ejb.*;
import org.ics.facade.FacadeLocal;

/**
 * Servlet implementation class Persons
 */
@WebServlet("/Persons/*")
public class Persons extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	@EJB
	private FacadeLocal facade;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Persons() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if (pathInfo == null || pathInfo.equals("/")) {
			List<Person> persons = facade.findAllPersons();
			sendAsJson(response, persons);
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
		if ((pathInfo == null || pathInfo.equals("/"))) {
			if (operation.equals("Add")) {
				String ssn = (String)request.getParameter("ssn");
				String name = (String)request.getParameter("name");
				if(ssn != null && name != null) {
					Person person = new Person(ssn, name);
					facade.createPerson(person);
					request.setAttribute("person", person);
					request.setAttribute("operation", "add");
				}
				else {
					//failed?
				}
			}
			else if (operation.equals("Update")) {
				String ssn = (String)request.getParameter("ssn");
				String name = (String)request.getParameter("name");
				if (ssn != null && name != null) {
					Person person = new Person(ssn, name);
					if(facade.findPersonBySsn(ssn) != null) {
						facade.updatePerson(person);
						request.setAttribute("person", person);
						request.setAttribute("operation", "update");
					}
				}
			} else if (operation.equals("Delete")) {
				String ssn = (String)request.getParameter("ssn");
				if (facade.findPersonBySsn(ssn) != null) {
					facade.deletePerson(ssn);
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
	 * 				List<Person>
	 * Description: parses a list of Persons to an array of json objects and uses the HttpServletResponse to send the array back with the response
	 */
	public void sendAsJson(HttpServletResponse response, List<Person> persons) throws IOException{
		PrintWriter out = response.getWriter(); //Enables servlet to print outgoing data
		response.setContentType("application/json"); //Specifies data type to send back
		if (persons != null) {
			JsonArrayBuilder arrayBuilder = Json.createArrayBuilder(); //Need to build an array of json objects to send back with the response
			for (Person p : persons) {
				JsonObjectBuilder o = Json.createObjectBuilder(); //A simple way to create new JSON Objects
				o.add("ssn", p.getSsn());
				o.add("name", p.getName());
				arrayBuilder.add(o); 
			}
			JsonArray array = arrayBuilder.build();
			out.print(array); //Send the array back with the response!
		} else { //If the list of persons is empty, an empty array is sent back with the response
			out.print("[]");
		}
		out.flush(); //clears the out feed to avoid errors
	}
}