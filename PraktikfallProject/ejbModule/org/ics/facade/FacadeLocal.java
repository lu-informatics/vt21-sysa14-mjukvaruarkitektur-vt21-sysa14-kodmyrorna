package org.ics.facade;

import java.util.List;

import javax.ejb.Local;

import org.ics.ejb.Person;

@Local
public interface FacadeLocal {

	public Person createPerson(Person person);
	public void deletePerson(String ssn);
	public Person updatePerson(Person person);
	public List<Person> findAllPersons();
	public Person findPerson(String ssn);
}
