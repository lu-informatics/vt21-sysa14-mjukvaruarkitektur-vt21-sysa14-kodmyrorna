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

	protected void tearDown() throws Exception {
		super.tearDown();
		project = null;
	}

}
