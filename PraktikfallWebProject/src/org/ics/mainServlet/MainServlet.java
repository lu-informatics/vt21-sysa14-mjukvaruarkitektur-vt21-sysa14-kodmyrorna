package org.ics.mainServlet;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.ics.facade.FacadeLocal;
import org.ics.ejb.*;

/**
 * Servlet implementation class MainServlet
 */
@WebServlet("/MainServlet/*")
public class MainServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MainServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		if(pathInfo.equals("person")) {
			handlePersonRequest(request, response);
		} else if (pathInfo.equals("project")) {
			handleProjectRequest(request, response);
		} else if (pathInfo.equals("assignment")) {
			handleAssignmentRequest(request, response);
		} else { //If user has input an ending to the path, which isn't supported
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
		RequestDispatcher dispatcher = request.getRequestDispatcher("jsp/Confirmation.jsp");
		dispatcher.forward(request, response);
	}
	
	private void handlePersonRequest(HttpServletRequest request, HttpServletResponse response, String api) {
		RequestDispatcher dispatcher = request.getRequestDispatcher("/Persons");
		if(api.equals("post")) {
			String operation = request.getParameter("submitBtn");
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
		} else {
			//get
		}
	}
	private void handleProjectRequest(HttpServletRequest request, HttpServletResponse response) {
		
	}
	private void handleAssignmentRequest(HttpServletRequest request, HttpServletResponse response) {
}
