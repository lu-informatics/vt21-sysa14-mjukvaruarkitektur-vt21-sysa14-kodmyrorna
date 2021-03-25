package org.ics.eao;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.ics.ejb.Person;
import org.ics.ejb.Project;


/**
 * Session Bean implementation class ProjectEAOImpl
 */
@Stateless
@LocalBean
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
    em.remove(project);
  }
}

 public List<Project> findAllProjects(){
    	TypedQuery<Project> query = em.createNamedQuery("Project.findAll", Project.class);
    	List<Project> results = query.getResultList();
    	return results;
    } 
 public List<Project> findByName(String name){
	 TypedQuery<Project> query = em.createNamedQuery("Project.findByName", Project.class);
	 query.setParameter("name", name);
	 List<Project> results = query.getResultList();
	 return results;
 }
}
