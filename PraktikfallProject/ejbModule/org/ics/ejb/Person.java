package org.ics.ejb;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
	@NamedQuery(name="Person.findByName", query = "SELECT p FROM Person p WHERE name LIKE :name")
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
		this.projects = new HashSet<Project>();
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
	
	@ManyToMany(fetch = FetchType.EAGER)
	public Set<Project> getProjects() {
		return projects;
	}
	public void setProjects(Set<Project> projects) {
		this.projects = projects;
	}
	
	public void addProject(Project project) {
		this.projects.add(project);
	}
	public void removeProject(Project project) {
		this.projects.remove(project);
	}
}
