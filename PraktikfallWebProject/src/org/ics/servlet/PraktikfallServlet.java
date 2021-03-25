package org.ics.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.ics.ejb.Person;
import org.ics.ejb.Project;
import org.ics.ejb.WorksAt;
import org.ics.facade.FacadeLocal;

/**
 * Servlet implementation class PraktikfallServlet
 */
@WebServlet("/PraktikfallServlet")
public class PraktikfallServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@EJB
	private FacadeLocal facade;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PraktikfallServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		PrintWriter out = response.getWriter();
		out.println("<!DOCTYPE html><html><head>");
		out.println("<title>Group 7</title>");
		out.println("<meta charset =\"ISO-8859-1\">");
		out.println("</head></body>");
		
		
		/****Create, update, delete Person****/
		out.println("<h1>Person</h1>");
		out.println("<h3>Creating Persons...</h3>");
		Person p = new Person("0101010000", "Yoda");
		facade.createPerson(p);
		out.println("<p>Successfully created " + facade.findPersonBySsn("0101010000").getName() +"</p>");
		
		Person p1 = new Person("0202020000", "Kebab");
		facade.createPerson(p1);
		out.println("<p>Successfully created " + facade.findPersonBySsn("0202020000").getName() +"</p>");
		
		Person p2 = new Person("0303030000", "Magnus");
		facade.createPerson(p2);
		out.println("<p>Successfully created " + facade.findPersonBySsn("0303030000").getName() +"</p>");
		
		out.println("<h3>Deleting yoda...</h3>");	
		facade.deletePerson("0101010000");
		
		out.println("<h3>Changing name of Person Magnus to Mr.Magnus</h3>");
		p2 = new Person("0303030000", "Mr.Magnus");
		facade.updatePerson(p2);
		out.println("<p>Successfully changed name from Magnus to " + facade.findPersonBySsn("0303030000").getName() +"</p><br><br>");
		
		/****Create, update, delete Project****/
		out.println("<h1>Project</h1>");
		out.println("<h3>Creating Projects...</h3>");
		Project pr = new Project("8008135", "Mature content");
		//facade.createProject(pr);
		out.println("<p>Successfully created " + "</p>");
		
		Project pr1 = new Project("ABC123", "Kindergarten");
		//facade.createProject(pr1);
		out.println("<p>Successfully created " + "</p>");
		
		Project pr2 = new Project("SYST6", "Examensarbete");
		//facade.createProject(pr2);
		out.println("<p>Successfully created " + "</p>");
		
		out.println("<h3>Deleting Mature content...</h3>");	
		//facade.deleteProject("8008135");
		
		out.println("<h3>Changing name of Project ABC123 to First grade stuff</h3>");
		pr1 = new Project("ABC123", "First grade stuff");
		//facade.updateProject(pr1);
		out.println("<p>Successfully changed name from Kindergarten to " + "</p><br><br>");
		
		/****Create and delete WorksAt****/
		out.println("<h1>WorksAt</h1>");
		out.println("<h3>Creating WorksAts...</h3>");
		WorksAt wa1 = new WorksAt(p1, pr1);
		WorksAt wa2 = new WorksAt(p1, pr2);
		WorksAt wa3 = new WorksAt(p2, pr1);
		
		/****Creating some instances****/
		
		/****READ****/
		
		
		out.println("</body></html>");
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
