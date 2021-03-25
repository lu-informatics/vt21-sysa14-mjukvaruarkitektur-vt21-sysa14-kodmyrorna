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
	@EJB 
	private ProjectEAOLocal projectEAO;
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
    
    public Person findPersonBySsn(String ssn) {
    	return personEAO.findPerson(ssn);
    }
    
    public List<Person> findPersonByName(String name) {
    	return personEAO.findByName(name);
    }
    
    /*******PROJECT STUFF*******/
    
    public Project createProject(Project project) {
    	return projectEAO.createProject(project);
    }
    
    public Project findProject(String projectCode) {
    	return projectEAO.findProject(projectCode);
    }
    
    public Project updateProject(Project project) {
    	return projectEAO.updateProject(project);
    }
    
    public void deleteProject(String projectCode) {
    	personEAO.deletePerson(projectCode);
    }
   
    public List<Project> findAllProjects() {
    	return projectEAO.findAllProjects();
    }
       
    public List<Project> findProjectByName(String name) {
    	return projectEAO.findProjectByName(name);
    }
    
    
    /*******WORKSAT STUFF*******/
    public WorksAt createWorksAt(WorksAt worksAt) {
    	return worksAtEAO.createWorksAt(worksAt);
    }    
    public void deleteWorksAt(WorksAt worksAt) {
    	worksAtEAO.removeWorksAt(worksAt);
    }
    public List<WorksAt> findWorksAtBySsn(String ssn){
    	return worksAtEAO.findBySsn(ssn);
    }
    public List<WorksAt> findWorksAtByProjectCode(String projectCode){
    	return worksAtEAO.findByProjectCode(projectCode);
    }
    public WorksAt findWorksAtById(WorksAtId id) {
    	return worksAtEAO.findById(id);
    }
}
