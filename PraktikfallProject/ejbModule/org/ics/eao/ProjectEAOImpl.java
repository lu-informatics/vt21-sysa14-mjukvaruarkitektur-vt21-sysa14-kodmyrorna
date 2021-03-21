package org.ics.eao;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.ics.ejb.*;

import java.util.List;


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

public Project findProject(int projectCode) {
  Project project= em.find(Project.class, projectCode);
  return project;
}

public Project updateProject(Project project) {
  em.merge(project);
  return project;
}

public void deleteProject(int projectCode) {
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
    
}
