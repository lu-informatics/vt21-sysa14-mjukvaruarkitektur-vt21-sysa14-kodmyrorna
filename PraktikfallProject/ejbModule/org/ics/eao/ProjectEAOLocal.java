package org.ics.eao;

import java.util.List;

import javax.ejb.Local;

import org.ics.ejb.Project;

@Local
public interface ProjectEAOLocal {
	public Project createProject(Project project);
	public Project findProject(String projectCode);
	public Project updateProject(Project project);
	public void deleteProject(String projectCode);
	public List<Project> findAllProjects();
	public List<Project> findProjectByName(String name);
}
