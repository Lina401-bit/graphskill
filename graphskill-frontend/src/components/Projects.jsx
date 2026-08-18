import { useEffect, useState } from "react";
import { getProjects, getProjectDetails } from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProjects();
  }, []);

  async function handleProjectClick(projectId) {
    try {
      const data = await getProjectDetails(projectId);
      setSelectedProject(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="projects-section">
      <h2>Projects</h2>

      <div className="project-list">
        {projects.map((project) => (
          <div
            className="project-card"
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
          >
            <h3>{project.name}</h3>
            <p>ID: {project.id}</p>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="project-details">
          <h2>{selectedProject.name}</h2>

          <h3>Required Skills</h3>

          <p>
            {selectedProject.requiredSkills.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

export default Projects;