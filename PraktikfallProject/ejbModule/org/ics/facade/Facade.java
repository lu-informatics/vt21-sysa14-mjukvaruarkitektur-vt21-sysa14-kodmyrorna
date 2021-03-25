package org.ics.facade;


import java.util.List;

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
	@EJB
	private PersonEAOLocal personEAO;
    /**
     * Default constructor. 
     */
    public Facade() {
        // TODO Auto-generated constructor stub
    }
    
    /*******PERSON STUFF*******/
    public Person createPerson(Person person) {
    	return personEAO.createPerson(person);
    }
    
    public void deletePerson(String ssn) {
    	personEAO.deletePerson(ssn);
    }
    
    public Person updatePerson(Person person) {
    	return personEAO.updatePerson(person);
    }
    
    public List<Person> findAllPersons() {
    	return personEAO.findAllPersons();
    }
    
    public Person findPerson(String ssn) {
    	return personEAO.findPerson(ssn);
    }
    
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
