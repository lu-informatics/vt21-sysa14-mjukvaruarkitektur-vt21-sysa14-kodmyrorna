package org.ics.servlets;

import java.util.List;
import java.io.IOException;
import java.io.PrintWriter;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
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
		if (pathInfo == null || pathInfo.equals("")) {
			List<Person> persons = facade.findAllPersons();
			sendAsJson(response, persons);
			return;
		}
		String[] splitPath = pathInfo.split("/");
		if (splitPath.length != 2) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		//TODO Don't want to send ssn over url - check solutions to this (like using doPost or doPut instead)
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
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
		// TODO Auto-generated method stub
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
}
