package org.ics.facade;

import java.util.List;

import javax.ejb.Local;

import org.ics.ejb.Person;
import org.ics.ejb.WorksAt;
import org.ics.ejb.WorksAtId;

@Local
public interface FacadeLocal {

	public Person createPerson(Person person);
	public void deletePerson(String ssn);
	public Person updatePerson(Person person);
	public List<Person> findAllPersons();
	public Person findPersonBySsn(String ssn);
	public List<Person> findPersonByName(String name);
	
	
	public WorksAt createWorksAt(WorksAt worksAt);
    public void deleteWorksAt(WorksAt worksAt);
    public List<WorksAt> findWorksAtBySsn(String ssn);
    public List<WorksAt> findWorksAtByProjectCode(String projectCode);
    public WorksAt findWorksAtById(WorksAtId id);
}
