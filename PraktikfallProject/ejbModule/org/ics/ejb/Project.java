package org.ics.ejb;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.ManyToMany;



@Entity
@NamedQueries({
	@NamedQuery(name="Project.findAll", query = "SELECT p FROM Project p")
	})
// to do other query

public class Project implements Serializable{
	private String name;
	private int projectCode;
	private Set <Person> persons;
	
	public Project() {}
	public Project(String projectName, int projectCode){
		this.name = name;
		this.projectCode = projectCode;
	}
	
	@Id
	@Column(name= "projectCode")
		public String getSsn(){
		this.projectCode = projectCode; }
	
	@Column(name= "name")
	public String getProjectName(){
	this.name = name; }
	
	
	
	//
	@ManyToMany
	@JoinTable(name= "Person", joinColumns=JoinColumn(name="ssn", referencedColumnName="projectCode"), inverseJoinColumns=@JoinColumn(name="", referencedColumnName="id")
	public Set<Person> getPersons() {
		return persons;
	}
	
	public void setPersons(Set<Person> persons){
		this.persons = persons;
	}

}
