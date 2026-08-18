import { useEffect, useState } from "react";
import { getProjects, getProjectDevelopers } from "../services/api";

function ProjectMatching() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setProjects(data);
    }

    loadProjects();
  }, []);

  async function handleProjectChange(event) {
    const projectId = event.target.value;

    setSelectedProject(projectId);
    setDevelopers([]);

    if (!projectId) {
      return;
    }

    try {
      setLoading(true);

      const data = await getProjectDevelopers(projectId);

      setDevelopers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="project-matching">
      <h2>Developer Matching</h2>

      <select
        value={selectedProject}
        onChange={handleProjectChange}
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      {loading && <p>Loading developers...</p>}

      {developers.map((developer) => (
        <div key={developer.developerId}>
          <h3>{developer.developer}</h3>

          <p>
            Matching Skills: {developer.matchingSkills}
          </p>

          <p>
            Skills: {developer.skills.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProjectMatching;