import { useEffect, useState } from "react";
import { getSkills } from "../services/api";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadSkills();
  }, []);

  return (
    <div className="skills-section">
      <h2>Skills</h2>

      <div className="skill-list">
        {skills.map((skill) => (
          <div className="skill-card" key={skill.id}>
            <h3>{skill.name}</h3>
            <p>ID: {skill.id}</p>
            <p>Category: {skill.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;