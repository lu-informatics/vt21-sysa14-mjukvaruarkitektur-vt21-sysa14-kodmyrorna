package org.ics.facade;

import java.util.List;

import javax.ejb.Local;

import org.ics.ejb.Person;
import org.ics.ejb.Project;

@Local
public interface FacadeLocal {

	public Person createPerson(Person person);
	public void deletePerson(String ssn);
	public Person updatePerson(Person person);
	public List<Person> findAllPersons();
	public Person findPerson(String ssn);
	
	// interface project facade
	public Project createProject(Project project);
    public Project findProject(String projectCode);
    public Project updateProject(Project project);
    public void deleteProject(String projectCode);
    public List<Project> findAllProjects();
    public List<Project> findProjectByName(String name);
}
