import { useEffect, useState } from "react";
import {
  getDevelopers,
  getProjects,
  getSkills,
  getRecommendations,
  getProjectDevelopers
} from "../services/api";

function Dashboard() {
  const [developers, setDevelopers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const [recommendations, setRecommendations] = useState([]);
  const [projectDevelopers, setProjectDevelopers] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [developerData, projectData, skillData] =
          await Promise.all([
            getDevelopers(),
            getProjects(),
            getSkills()
          ]);

        setDevelopers(developerData);
        setProjects(projectData);
        setSkills(skillData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    }

    loadData();
  }, []);

  async function handleDeveloperChange(event) {
    const developerId = event.target.value;

    setSelectedDeveloper(developerId);
    setRecommendations([]);

    if (!developerId) {
      return;
    }

    try {
      const data = await getRecommendations(developerId);
      setRecommendations(data);
    } catch (error) {
      console.error("Failed to load recommendations:", error);
    }
  }

  async function handleProjectChange(event) {
    const projectId = event.target.value;

    setSelectedProject(projectId);
    setProjectDevelopers([]);

    if (!projectId) {
      return;
    }

    try {
      const data = await getProjectDevelopers(projectId);
      setProjectDevelopers(data);
    } catch (error) {
      console.error("Failed to load project developers:", error);
    }
  }

  return (
    <div className="dashboard">

      <h2>Dashboard</h2>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Developers</h3>
          <p>{developers.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Projects</h3>
          <p>{projects.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Skills</h3>
          <p>{skills.length}</p>
        </div>

      </div>

      {/* Lists */}
      <div className="data-sections">

        {/* Developers */}
        <section className="data-section">
          <h2>Developers</h2>

          <div className="item-grid">
            {developers.map((developer) => (
              <div className="data-card" key={developer.id}>
                <h3>{developer.name}</h3>
                <p><strong>ID:</strong> {developer.id}</p>
                <p><strong>Email:</strong> {developer.email}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="data-section">
          <h2>Projects</h2>

          <div className="item-grid">
            {projects.map((project) => (
              <div className="data-card" key={project.id}>
                <h3>{project.name}</h3>
                <p><strong>ID:</strong> {project.id}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="data-section">
          <h2>Skills</h2>

          <div className="item-grid">
            {skills.map((skill) => (
              <div className="data-card" key={skill.id}>
                <h3>{skill.name}</h3>
                <p><strong>ID:</strong> {skill.id}</p>
                <p><strong>Category:</strong> {skill.category}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Recommendations */}
      <section className="recommendation-section">

        <h2>Project Recommendations</h2>

        <select
          value={selectedDeveloper}
          onChange={handleDeveloperChange}
        >
          <option value="">Select Developer</option>

          {developers.map((developer) => (
            <option key={developer.id} value={developer.id}>
              {developer.name}
            </option>
          ))}
        </select>

        <div className="recommendation-grid">

          {recommendations.map((recommendation) => (
            <div
              className="recommendation-card"
              key={recommendation.projectId}
            >
              <h3>{recommendation.project}</h3>

              <p>
                <strong>Matching Skills:</strong>{" "}
                {recommendation.matchingSkills}
              </p>

              <p>
                <strong>Skills:</strong>{" "}
                {recommendation.skills.join(", ")}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* Developer Matching */}
      <section className="recommendation-section">

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

        <div className="recommendation-grid">

          {projectDevelopers.map((developer) => (
            <div
              className="recommendation-card"
              key={developer.developerId}
            >
              <h3>{developer.developer}</h3>

              <p>
                <strong>Matching Skills:</strong>{" "}
                {developer.matchingSkills}
              </p>

              <p>
                <strong>Skills:</strong>{" "}
                {developer.skills.join(", ")}
              </p>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;