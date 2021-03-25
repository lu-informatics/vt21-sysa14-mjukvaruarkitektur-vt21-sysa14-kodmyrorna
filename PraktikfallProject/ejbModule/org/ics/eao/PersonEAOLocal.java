package org.ics.eao;

import java.util.List;

import javax.ejb.Local;

import org.ics.ejb.Person;

@Local
public interface PersonEAOLocal {
	public Person createPerson(Person person);
	public Person findPerson(String ssn);
	public Person updatePerson(Person person);
	public void deletePerson(String ssn);
	public List<Person> findAllPersons();
	public List<Person> findByName(String name);
}
