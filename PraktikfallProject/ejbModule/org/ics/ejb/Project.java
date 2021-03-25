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
	@NamedQuery(name="Project.findAll", query = "SELECT p FROM Project p"),
	@NamedQuery(name="Project.findByName", query = "SELECT p FROM Project WHERE name LIKE :name")
	
	})


public class Project implements Serializable{
	private String name;
	private String projectCode;
	private Set <Person> persons;
	
	public Project() {}
	public Project(String name, String projectCode){
		this.name = name;
		this.projectCode = projectCode;
	}
	
	@Id
	@Column(name= "projectCode")
		public String getProjectCode(){
		return projectCode; 
	}
	
	@Column(name= "name")
		public String getProjectName(){
		return name; 
	}
	
	//
	@ManyToMany(mappedBy="persons")
	public Set<Person> getPersons() {
		return persons;
	}
	
	public void setPersons(Set<Person> persons){
		this.persons = persons;
	}

}
