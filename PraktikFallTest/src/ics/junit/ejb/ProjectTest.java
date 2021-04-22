package ics.junit.ejb;

import javax.naming.Context;

import javax.naming.InitialContext;

import org.ics.ejb.Project;

import junit.framework.TestCase;

public class ProjectTest extends TestCase {
	
	Project project;

	public ProjectTest(String name) {
		super(name);
	}

	protected void setUp() throws Exception {
		super.setUp();
		Context context = new InitialContext();
		project = (Project)context.lookup("java:app/PraktikfallProject/Project!org.ics.ejb.Project");
	}
	
	public void testPersonMethods() throws Exception {
		project.setName("EJB");
		project.setProjectCode("1001");
		assertEquals(project.getName(), "EJB");
		assertEquals(project.getProjectCode(), "1001");
	}

	protected void tearDown() throws Exception {
		super.tearDown();
		project = null;
	}
}