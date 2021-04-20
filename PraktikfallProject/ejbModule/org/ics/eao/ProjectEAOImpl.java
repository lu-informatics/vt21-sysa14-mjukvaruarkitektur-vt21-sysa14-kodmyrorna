package org.ics.eao;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.ics.ejb.*;

/**
 * Session Bean implementation class ProjectEAOImpl
 */
@Stateless
public class ProjectEAOImpl implements ProjectEAOLocal {

	@PersistenceContext(unitName="LabEJBSql")
	private EntityManager em;
	
    /**
     * Default constructor. 
     */
    public ProjectEAOImpl() {
        // TODO Auto-generated constructor stub
    }

	public Project createProject(Project project) {
		em.persist(project);
		return project;
	}
	
	public Project findProject(String projectCode) {
		Project project= em.find(Project.class, projectCode);
		return project;
	}
	
	public Project updateProject(Project project) {
		em.merge(project);
		return project;
	}
	
	public void deleteProject(String projectCode) {
		Project project = this.findProject(projectCode);
		if(project != null){
			Set<Person> persons = project.getPersons();
			for (Person person : persons) {
				person.removeProject(project);
			}
			em.remove(project); 
		}
	}

	public void addPerson(Project project, Person person) {
		project.addPerson(person);
		em.merge(project);
	}
	public void removePerson(Project project, Person person) {
		System.out.println("ProjectEAO.removePerson() " + person.getName());
		project.removePerson(person);
		em.merge(project);
	}
	
	public List<Project> findAllProjects(){
    	TypedQuery<Project> query = em.createNamedQuery("Project.findAll", Project.class);
    	List<Project> results = query.getResultList();
    	return results;
    } 
	 
	 public List<Project> findProjectByName(String name){
		 TypedQuery<Project> query = em.createNamedQuery("Project.findByName", Project.class);
		 query.setParameter("name", name);
		 List<Project> results = query.getResultList();
		 return results;
	 }
	 
	 public Set<Person> getPersons(Project project){
		 return project.getPersons();
	 }
	 
}
