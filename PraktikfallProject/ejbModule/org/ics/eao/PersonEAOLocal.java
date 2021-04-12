package org.ics.eao;

import java.util.List;
import java.util.Set;

import javax.ejb.Local;

import org.ics.ejb.Person;
import org.ics.ejb.Project;

@Local
public interface PersonEAOLocal {
	public Person createPerson(Person person);
	public Person findPerson(String ssn);
	public Person updatePerson(Person person);
	public void deletePerson(String ssn);
	public void addProject(Project project, Person person);
	public void removeProject(Project project, Person person);
	public List<Person> findAllPersons();
	public List<Person> findByName(String name);
	public Set<Project> getProjects(Person person);
}
