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
        // TODO Auto-generated constructor stub
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
			Person person = parseJsonPerson(reader);
			facade.createPerson(person);
			sendAsJson(response, person);
		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if (pathInfo == null || pathInfo.equals("/")) {
			BufferedReader reader = request.getReader();
			Person person = parseJsonPerson(reader);
			facade.updatePerson(person);
			sendAsJson(response, person);
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
			String ssn = jsonRoot.getString("ssn");
			facade.deletePerson(ssn);
		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}
	
	public void sendAsJson(HttpServletResponse response, List<Person> persons) throws IOException{
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		if (persons != null) {
			JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
			for (Person p : persons) {
				JsonObjectBuilder o = Json.createObjectBuilder();
				o.add("ssn", p.getSsn());
				o.add("name", p.getName());
				arrayBuilder.add(o);
			}
			JsonArray array = arrayBuilder.build();
			out.print(array);
		} else {
			out.print("[]");
		}
		out.flush();
	}
	public void sendAsJson(HttpServletResponse response, Person person) throws IOException{
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		if (person != null) {
			out.print("[{\"ssn\":\"" + person.getSsn() + "\",");
			out.print("\"name\":\"" + person.getName() + "\"}]");
		} else {
			out.print("[]");
		}
		out.flush();
	}
	private Person parseJsonPerson(BufferedReader reader) {
		JsonReader jsonReader = Json.createReader(reader);
		JsonObject jsonRoot = jsonReader.readObject();
		Person person = new Person();
		person.setSsn(jsonRoot.getString("ssn"));
		person.setName(jsonRoot.getString("name"));
		return person;
	}
}
