package org.ics.eao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.ics.ejb.Person;

/**
 * Session Bean implementation class PersonEAOImpl
 */
@Stateless
public class PersonEAOImpl implements PersonEAOLocal {

	@PersistenceContext(unitName="LabEJBSql")
	private EntityManager em;
	
    /**
     * Default constructor. 
     */
    public PersonEAOImpl() {
        // TODO Auto-generated constructor stub
    }

public Person createPerson(Person person) {
  em.persist(person);
  return person;
}

public Person findPerson(String ssn) {
	Person person= em.find(Person.class, ssn);
  return person;
}

public Person updatePerson(Person person) {
  em.merge(person);
  return person;
}

public void deletePerson(String ssn) {
	Person person = this.findPerson(ssn);
  if(person != null){
    em.remove(person);
  }
}

 public List<Person> findAllPersons(){
    	TypedQuery<Person> query = em.createNamedQuery("Project.findAll", Person.class);
    	List<Person> results = query.getResultList();
    	return results;
    } 

}
