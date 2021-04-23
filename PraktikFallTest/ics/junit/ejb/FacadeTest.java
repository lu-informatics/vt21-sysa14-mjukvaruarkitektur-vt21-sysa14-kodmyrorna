package ics.junit.ejb;

import javax.naming.Context;
import javax.naming.InitialContext;
import org.ics.ejb.Person;
import org.ics.ejb.Project;
import org.ics.facade.facadeLocal;


import junit.framework.TestCase;

public class FacadeTest extends TestCase {
	
	FacadeLocal facade;

	public FacadeTest(String name) {
		super(name);
	}

	protected void setUp() throws Exception {
		super.setUp();
		Context context = new InitialContext();
		facade=(FacadeLocal)context.lookup("java:app/PraktikfallProject/Facade!org.ics.facade.FacadeLocal");
	}

	protected void tearDown() throws Exception {
		super.tearDown();
		facade=null;
	}
	
	public void testFacadeMethodProject() throws Exception {
		
		}
	
	public void testFacadeMethodPerson() throws Exception {
		
		}

}