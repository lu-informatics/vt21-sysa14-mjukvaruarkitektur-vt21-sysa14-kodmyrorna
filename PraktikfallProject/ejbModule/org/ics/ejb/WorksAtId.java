package org.ics.ejb;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

@Embeddable
public class WorksAtId implements Serializable {
	private String ssn; 
	private String projectCode; 
	
	public WorksAtId() {}
	public WorksAtId(String ssn, String projectCode) {
		this.ssn = ssn;
		this.projectCode = projectCode;
	}
	
	@Column(name="ssn", nullable = false)
	@NotNull
	public String getSsn() {
		return ssn;
	}
	public void setSsn(String ssn) {
		this.ssn = ssn;
	}
	
	@Column(name="projectCode", nullable = false)
	@NotNull
	public String getProjectCode() {
		return projectCode;
	}
	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}
	

	public boolean equals(Object other) {
		if ((this == other))return true;
		
		if ((other == null)) return false;
		
		if (!(other instanceof WorksAtId))return false;
		
		WorksAtId castOther = (WorksAtId) other;
		
		return ((this.getSsn() == castOther.getSsn()) ||
			(!this.getSsn().equals("") &&
			!castOther.getSsn().equals("") &&
			this.getSsn() == castOther.getSsn()))
				&&
			((this.getProjectCode() == castOther.getProjectCode()) ||
				
			(this.getProjectCode() != null && castOther.getProjectCode() != null &&
			this.getProjectCode().equals(castOther.getProjectCode())));
	}
	
	public int hashCode() { 
		return super.hashCode(); 
	}
	
	
}
