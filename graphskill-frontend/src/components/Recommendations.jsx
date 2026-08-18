import { useState } from "react";
import { getDevelopers, getRecommendations } from "../services/api";

function Recommendations() {
  const [developers, setDevelopers] = useState([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadDevelopers() {
    try {
      const data = await getDevelopers();
      setDevelopers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeveloperChange(event) {
    const developerId = event.target.value;
    setSelectedDeveloper(developerId);
    setRecommendations([]);

    if (!developerId) {
      return;
    }

    try {
      setLoading(true);

      const data = await getRecommendations(developerId);

      setRecommendations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (developers.length === 0) {
    loadDevelopers();
  }

  return (
    <div className="recommendations">
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

      {loading && <p>Loading recommendations...</p>}

      {recommendations.length > 0 && (
        <div>
          {recommendations.map((item) => (
            <div key={item.projectId}>
              <h3>{item.project}</h3>
              <p>
                Matching Skills: {item.matchingSkills}
              </p>
              <p>
                Skills: {item.skills.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendations;