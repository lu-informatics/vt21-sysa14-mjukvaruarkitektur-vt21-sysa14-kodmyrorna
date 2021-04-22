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
		if (pathInfo == null || pathInfo.equals("/")) {
			BufferedReader reader = request.getReader(); //creates a reader for getting data from the request
			Person person = parseJsonPerson(reader);
			facade.createPerson(person);
			sendAsJson(response, person);
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if (pathInfo == null || pathInfo.equals("/")) {
			BufferedReader reader = request.getReader(); //creates a reader for getting data from the request
			Person person = parseJsonPerson(reader);
			facade.updatePerson(person);
			sendAsJson(response, person);
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
			String ssn = jsonRoot.getString("ssn"); //Collect social security number from the object
			facade.deletePerson(ssn);
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
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
	
	/*************
	 * Function sendAsJson
	 * Parameters: 	HttpServletResponse
	 * 				Person
	 * Description: parses the person to a json object and uses the HttpServletResponse to send it back with the response
	 */
	public void sendAsJson(HttpServletResponse response, Person person) throws IOException{
		PrintWriter out = response.getWriter(); //Enables servlet to print outgoing data
		response.setContentType("application/json"); //Specifies data type to send back
		if (person != null) {
			out.print("[{\"ssn\":\"" + person.getSsn() + "\","); //Creating a JSON object 'manually'
			out.print("\"name\":\"" + person.getName() + "\"}]");
		} else {
			out.print("[]"); //If the person is null, an empty array of objects is sent back instead
		}
		out.flush(); //clears the out feed to avoid errors
	}
	
	/*************
	 * Function parseJsonReader
	 * Parameter: BufferedReader
	 * Returns: Person
	 * Description: Parses a Json object to an instance of the Person entity bean
	 */
	private Person parseJsonPerson(BufferedReader reader) {
		JsonReader jsonReader = Json.createReader(reader); //Create a reader for getting Json-formatted data
		JsonObject jsonRoot = jsonReader.readObject();  //Assume there is only one object, not an array
		Person person = new Person();
		person.setSsn(jsonRoot.getString("ssn")); //Collect person data from the object
		person.setName(jsonRoot.getString("name"));
		return person;
	}
}
