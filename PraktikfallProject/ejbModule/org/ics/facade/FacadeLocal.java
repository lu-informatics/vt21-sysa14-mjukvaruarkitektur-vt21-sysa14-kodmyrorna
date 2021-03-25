package org.ics.facade;

import java.util.List;

import javax.ejb.Local;

import org.ics.ejb.Person;

import org.ics.ejb.WorksAt;
import org.ics.ejb.WorksAtId;

import org.ics.ejb.Project;


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
	public WorksAt createWorksAt(WorksAt worksAt);
	public void deleteWorksAt(WorksAtId id);
    public List<WorksAt> findWorksAtBySsn(String ssn);
    public List<WorksAt> findWorksAtByProjectCode(String projectCode);
    public WorksAt findWorksAtById(WorksAtId id);


}
