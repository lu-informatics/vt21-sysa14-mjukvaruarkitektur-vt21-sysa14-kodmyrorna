package org.ics.eao;

import java.util.List;
import java.util.Set;

import javax.ejb.Local;

import org.ics.ejb.Person;
import org.ics.ejb.Project;

@Local
public interface ProjectEAOLocal {
	public Project createProject(Project project);
	public Project findProject(String projectCode);
	public Project updateProject(Project project);
	public void deleteProject(String projectCode);
	public void addPerson(Project project, Person person);
	public void removePerson(Project project, Person person);
	public List<Project> findAllProjects();
	public List<Project> findProjectByName(String name);
	public Set<Person> getPersons(Project project);
}
