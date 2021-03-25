package org.ics.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

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
		out.println("<h3>Creating some people...</h3>");
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
		out.println("<h3>Creating some projects...</h3>");
		Project pr = new Project("8008135", "Mature content");
		facade.createProject(pr);
		out.println("<p>Successfully created " + facade.findProjectByProjectCode("8008135").getName() + "</p>");
		
		Project pr1 = new Project("ABC123", "Kindergarten");
		facade.createProject(pr1);
		out.println("<p>Successfully created " + facade.findProjectByProjectCode("ABC123").getName() + "</p>");
		
		Project pr2 = new Project("SYST6", "Examensarbete");
		facade.createProject(pr2);
		out.println("<p>Successfully created " + facade.findProjectByProjectCode("SYST6").getName() + "</p>");
		
		out.println("<h3>Deleting Mature content...</h3>");	
		facade.deleteProject("8008135");
		
		out.println("<h3>Changing name of Project ABC123 to First grade stuff</h3>");
		pr1 = new Project("ABC123", "First grade stuff");
		facade.updateProject(pr1);
		out.println("<p>Successfully changed name from Kindergarten to " + facade.findProjectByProjectCode("ABC123").getName() + "</p><br><br>");
		
		/****Create and delete WorksAt****/
		out.println("<h1>WorksAt</h1>");
		out.println("<h3>Creating WorksAts...</h3>");
		WorksAt wa1 = new WorksAt(p1, pr1);
		facade.createWorksAt(wa1);
		WorksAt wa2 = new WorksAt(p1, pr2);
		facade.createWorksAt(wa2);
		WorksAt wa3 = new WorksAt(p2, pr1);
		facade.createWorksAt(wa3);
		
		out.println("<h3>Deleting worksat for Kebab and Kindergarten...</h3><br><br>");
		facade.deleteWorksAt(wa1.getId());
		
		/*****Filling the database with some random shit*****/
		out.println("<h3>Creating more stuff...</h3>");
		Person p3 = new Person("9701010000", "97:a");
		facade.createPerson(p3);
		Person p4 = new Person("0001010000", "P12:a");
		facade.createPerson(p4);
		Person p5 = new Person("2103251305", "Mr.Magnus");
		facade.createPerson(p5);
		Project pr3 = new Project("MCKLMR", "Thrift shop");
		facade.createProject(pr3);
		Project pr4 = new Project("RNDM12", "Examensarbete");
		facade.createProject(pr4);
		WorksAt wa4 = new WorksAt(p1, pr3);
		facade.createWorksAt(wa4);
		WorksAt wa5 = new WorksAt(p1, pr4);
		facade.createWorksAt(wa5);
		WorksAt wa6 = new WorksAt(p3, pr1);
		facade.createWorksAt(wa6);
		
		/*****Queries:*****/
		out.println("<h1>Queries</h1>");
		
		//ALL PEOPLE
		out.println("<h3>All people</h3>");
		out.println("<table border=\"1\">");
		out.println("<tr><th>ssn</th><th>name</th></tr>");
		List<Person> people = facade.findAllPersons();
		for(Person person : people) {
			out.println("<tr><td>" + person.getSsn() + "</td><td>" + person.getName() + "</td></tr>");
		}
		out.println("</table><br>");
		
		//PEOPLE NAMED MR.MAGNUS
		out.println("<h3>All people named Mr.Magnus</h3>");
		out.println("<table border=\"1\">");
		out.println("<tr><th>ssn</th><th>name</th></tr>");
		List<Person> mrmagnus = facade.findPersonByName("Mr.Magnus");
		for(Person person : mrmagnus) {
			out.println("<tr><td>" + person.getSsn() + "</td><td>" + person.getName() + "</td></tr>");
		}
		out.println("</table><br>");
		
		//ALL PROJECTS
		out.println("<h3>All Projects</h3>");
		out.println("<table border=\"1\">");
		out.println("<tr><th>projectCode</th><th>name</th></tr>");
		List<Project> projects = facade.findAllProjects();
		for(Project project : projects) {
			out.println("<tr><td>" + project.getProjectCode() + "</td><td>" + project.getName() + "</td></tr>");
		}
		out.println("</table><br>");
		
		//ALL PROJECTS NAMED EXAMENSARBETE
		out.println("<h3>All Projects named Examensarbete</h3>");
		out.println("<table border=\"1\">");
		out.println("<tr><th>projectCode</th><th>name</th></tr>");
		List<Project> examensarbete = facade.findProjectByName("Examensarbete");
		for(Project project : examensarbete) {
			out.println("<tr><td>" + project.getProjectCode() + "</td><td>" + project.getName() + "</td></tr>");
		}
		out.println("</table><br>");
		
		//ALL PROJECTS FOR KEBAB
		out.println("<h3>All Projects for Kebab</h3>");
		out.println("<table border=\"1\">");
		out.println("<tr><th>projectCode</th><th>projectName</th></tr>");
		List<WorksAt> kebab = facade.findWorksAtBySsn("0202020000");
		for (WorksAt wa : kebab) {
			out.println("<tr><td>" + wa.getProject().getProjectCode() + "</td><td>" + wa.getProject().getName() + "</td></tr>");
		}
		out.println("</table><br>");
		
		//ALL PEOPLE FOR FIRST GRADE STUFF
		out.println("<h3>All people working on First grade stuff</h3>");
		out.println("<table border=\"1\">");
		out.println("<tr><th>ssn</th><th>personName</th></tr>");
		List<WorksAt> firstGradeStuff = facade.findWorksAtByProjectCode("ABC123");
		for(WorksAt wa : firstGradeStuff) {
			out.println("<tr><td>" + wa.getPerson().getSsn() + "</td><td>" + wa.getPerson().getName() + "</td></tr>");
		}
		out.println("</table>");
		
		
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
