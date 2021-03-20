package org.ics.ejb;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity
@NamedQueries({
	@NamedQuery(name="WorksAt.findBySsn", query = "SELECT w FROM WorksAt WHERE ssn LIKE :ssn"),
	@NamedQuery(name="WorksAt.findByProjectCode", query="SELECT w FROM WorksAt WHERE projectCode LIKE :projectCode")
})
public class WorksAt {
	private WorksAtId id;
	private Person person;
	private Project project;
	
	@EmbeddedId
	public WorksAtId getId() {
		return id;
	}
	public void setId(WorksAtId id) {
		this.id = id;
	}
	
	@ManyToOne
	@JoinColumn(name="ssn", referencedColumnName="ssn", nullable = false, insertable = false, updatable = false)
	public Person getPerson() {
		return person;
	}
	public void setPerson(Person person) {
		this.person = person;
	}
	
	@ManyToOne
	@JoinColumn(name="projectCode", referencedColumnName="projectCode", nullable = false, insertable = false, updatable = false)
	public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}
}
