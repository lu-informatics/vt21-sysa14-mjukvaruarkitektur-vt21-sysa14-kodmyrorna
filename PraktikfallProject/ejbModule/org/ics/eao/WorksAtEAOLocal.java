package org.ics.eao;

import java.util.List;

import javax.ejb.Local;

import org.ics.ejb.WorksAt;
import org.ics.ejb.WorksAtId;

@Local
public interface WorksAtEAOLocal {
	public WorksAt createWorksAt(WorksAt worksAt);
	public void removeWorksAt(WorksAtId id);
	public List<WorksAt> findBySsn(String ssn);
	public List<WorksAt> findByProjectCode(String projectCode);
	public WorksAt findById(WorksAtId id);
}
