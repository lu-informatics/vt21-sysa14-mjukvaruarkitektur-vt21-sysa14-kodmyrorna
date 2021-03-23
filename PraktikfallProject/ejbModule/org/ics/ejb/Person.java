package org.ics.ejb;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@NamedQueries({
	@NamedQuery(name="Person.findAll", query = "SELECT p FROM Person p"),
	@NamedQuery(name="Person.findBySsn", query = "SELECT p FROM Person p WHERE ssn LIKE :ssn")
})
@Table(name="Person")
public class Person implements Serializable{
	private String name;
	private String ssn;
	private Set<Project> projects;
	
	public Person() {}
	public Person(String ssn, String name) {
		this.ssn = ssn;
		this.name = name;
	}

	@Id
	@Column(name="ssn")
	public String getSsn() {
		return ssn;
	}
	public void setSsn(String ssn) {
		this.ssn = ssn;
	}
	
	@Column(name = "name")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@ManyToMany
	@JoinTable(name="WorksAt", joinColumns=@JoinColumn(name="ssn", referencedColumnName="ssn"),inverseJoinColumns=@JoinColumn(name="projectCode", referencedColumnName="projectCode"))
	public Set<Project> getProjects() {
		return projects;
	}
	public void setProjects(Set<Project> projects) {
		this.projects = projects;
	}
}
