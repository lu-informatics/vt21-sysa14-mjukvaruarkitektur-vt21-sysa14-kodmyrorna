package org.ics.eao;

import org.ics.ejb.*;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

/**
 * Session Bean implementation class WorksAtEAOImpl
 */
@Stateless
public class WorksAtEAOImpl implements WorksAtEAOLocal {

	@PersistenceContext(unitName="LabEJBSql")
	private EntityManager em;
	
    public WorksAtEAOImpl() {}
    
    public WorksAt createWorksAt(WorksAt worksAt) {
    	em.persist(worksAt);
    	return worksAt;
    }
    
    public void removeWorksAt(WorksAt worksAt) {
    	em.remove(worksAt);
    }
    
    public List<WorksAt> findBySsn(String ssn){
    	TypedQuery<WorksAt> query = em.createNamedQuery("WorksAt.findBySsn", WorksAt.class);
    	query.setParameter("ssn", ssn);
    	List<WorksAt> results = query.getResultList();
    	return results;
    }

    public List<WorksAt> findByProjectCode(String projectCode){
    	TypedQuery<WorksAt> query = em.createNamedQuery("WorksAt.findByProjectCode", WorksAt.class);
    	query.setParameter("projectCode", projectCode);
    	List<WorksAt> results = query.getResultList();
    	return results;
    }
    public WorksAt findById(WorksAtId id) {
    	return em.find(WorksAt.class, id);
    }

}
