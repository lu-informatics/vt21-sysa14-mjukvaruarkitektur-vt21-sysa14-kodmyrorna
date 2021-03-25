package org.ics.ejb;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity
@NamedQueries({
	@NamedQuery(name="WorksAt.findBySsn", query = "SELECT w FROM WorksAt w WHERE waSsn LIKE :ssn"),
	@NamedQuery(name="WorksAt.findByProjectCode", query="SELECT w FROM WorksAt w WHERE waProjectCode LIKE :projectCode")
})
public class WorksAt {
	private WorksAtId id;
	private Person person;
	private Project project;
	
	public WorksAt() {}
	public WorksAt(Person person, Project project) {
		id = new WorksAtId(person.getSsn(), project.getProjectCode());
		this.person = person;
		this.project = project;
	}
	
	@EmbeddedId
	public WorksAtId getId() {
		return id;
	}
	public void setId(WorksAtId id) {
		this.id = id;
	}
	
	@ManyToOne
	@JoinColumn(name="waSsn", referencedColumnName="ssn", nullable = false, insertable = false, updatable = false)
	public Person getPerson() {
		return person;
	}
	public void setPerson(Person person) {
		this.person = person;
	}
	
	@ManyToOne
	@JoinColumn(name="waProjectCode", referencedColumnName="projectCode", nullable = false, insertable = false, updatable = false)
	public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}

}
