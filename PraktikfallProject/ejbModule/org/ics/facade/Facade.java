package org.ics.facade;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.ics.eao.*;
import org.ics.ejb.*;

/**
 * Session Bean implementation class Facade
 */
@Stateless
public class Facade implements FacadeLocal {

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
    
    public Project findProjectByProjectCode(String projectCode) {
    	return projectEAO.findProject(projectCode);
    }
    
    public Project updateProject(Project project) {
    	return projectEAO.updateProject(project);
    }
    
    public void deleteProject(String projectCode) {
    	projectEAO.deleteProject(projectCode);
    }
   
    public List<Project> findAllProjects() {
    	return projectEAO.findAllProjects();
    }
       
    public List<Project> findProjectByName(String name) {
    	return projectEAO.findProjectByName(name);
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    

    /*******ASSIGNMENT STUFF*******/
    public void addAssignment(Project project, Person person) {
    	projectEAO.addPerson(project, person);
    	personEAO.addProject(project, person);
    }
    
    public void removeAssignment(String projectCode, String ssn) {
    	Project project = this.findProjectByProjectCode(projectCode);
    	Person person = this.findPersonBySsn(ssn);
    	
    	Set<Person> persons = this.findPersonsByProject(project);
    	Set<Project> projects = this.findProjectsByPerson(person);
    	persons.remove(person);
    	projects.remove(project);
    	//below methods update the sets of projects and persons that the person and project have
    	projectEAO.removePerson(project, persons);
    	personEAO.removeProject(projects, person);
    }
   
    
    public Set<Project> findProjectsByPerson(Person person) {
    	return personEAO.getProjects(person);
    }
    public Set<Person> findPersonsByProject(Project project){
    	return projectEAO.getPersons(project);
    }
    public ArrayList<String[]> findAllAssignments(){
    	ArrayList<String[]> assignments = new ArrayList<String[]>();
    	for(Person person : personEAO.findAllPersons()) {
    		for(Project project : person.getProjects()) {
    			String[] assignment = {person.getSsn(), project.getProjectCode()};
    			assignments.add(assignment);
    		}
    	}
    	return assignments;
    }
}
