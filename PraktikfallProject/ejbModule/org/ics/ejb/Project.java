package org.ics.ejb;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
	@NamedQuery(name="Project.findByName", query = "SELECT p FROM Project p WHERE name LIKE :name")
})


public class Project implements Serializable{
	private String projectCode;
	private String name;
	private Set <Person> persons;
	
	public Project() {}
	public Project(String projectCode, String name){
		this.projectCode = projectCode;
		this.name = name;
		this.persons = new HashSet<Person>();
	}
	
	@Id
	@Column(name= "projectCode")
	public String getProjectCode(){
		return projectCode; 
	}
	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}
	
	@Column(name= "name")
	public String getName(){
		return name; 
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@ManyToMany(mappedBy="projects", fetch = FetchType.EAGER)
	public Set<Person> getPersons() {
		return persons;
	}
	public void setPersons(Set<Person> persons){
		this.persons = persons;
	}
	
	public void addPerson(Person person) {
		this.persons.add(person);
	}
	public void removePerson(Person person) {
		this.persons.remove(person);
	}
}
