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

}
