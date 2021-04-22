package ics.junit.ejb;

import javax.naming.Context;

import javax.naming.InitialContext;

import org.ics.ejb.Person;
 
import junit.framework.TestCase;

public class PersonTest extends TestCase {
	
	PersonTest person;

	public PersonTest(String name) {
		super(name);
	}

	protected void setUp() throws Exception {
		super.setUp();
		Context context = new InitialContext();
		person =(PersonTest)context.lookup("java:app/PraktikfallProject/Project!org.ics.ejb.Project\"");
	}

	protected void tearDown() throws Exception {
		super.tearDown();
		person = null;
	}

}
