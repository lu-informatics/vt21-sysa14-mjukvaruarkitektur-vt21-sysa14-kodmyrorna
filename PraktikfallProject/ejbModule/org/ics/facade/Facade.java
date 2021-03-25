package org.ics.facade;


import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.ics.eao.*;
import org.ics.exceptions.*;
import org.ics.ejb.*;

/**
 * Session Bean implementation class Facade
 */
@Stateless
public class Facade implements FacadeLocal {
	@EJB
	private WorksAtEAOLocal worksAtEAO;
    /**
     * Default constructor. 
     */
    public Facade() {
        // TODO Auto-generated constructor stub
    }
    
    /*******PERSON STUFF*******/
    
    
    /*******PROJECT STUFF*******/
    
    
    /*******WORKSAT STUFF*******/
    //Will be able to do this stuff once the Project and Person classes have basic setters and getters.
    //create
    public WorksAt createWorksAt(String ssn, String projectCode) throws MyCustomException{
    	WorksAt newWorksAt = null;
    	
    	return newWorksAt;
    }
    //remove
    //findbyssn
    //findbyprojectcode
    //findbyid
}
