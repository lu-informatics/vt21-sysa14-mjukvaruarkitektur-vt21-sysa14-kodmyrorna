package org.ics.facade;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import javax.ejb.Local;

import org.ics.ejb.*;


@Local
public interface FacadeLocal {

	public Person createPerson(Person person);
	public Person updatePerson(Person person);
	public Person findPersonBySsn(String ssn);
	public void deletePerson(String ssn);
	public List<Person> findAllPersons();
	public List<Person> findPersonByName(String name);
	public Project createProject(Project project);
    public Project findProjectByProjectCode(String projectCode);
    public Project updateProject(Project project);
    public void deleteProject(String projectCode);
    public List<Project> findAllProjects();
    public List<Project> findProjectByName(String name);
    public void addAssignment(Project project, Person person);
    public void removeAssignment(Project project, Person person);
    public Set<Project> findProjectsByPerson(Person person);
    public Set<Person> findPersonsByProject(Project project);
    public ArrayList<String[]> findAllAssignments();
}