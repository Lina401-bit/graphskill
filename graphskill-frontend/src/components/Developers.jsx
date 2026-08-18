import { useEffect, useState } from "react";
import { getDevelopers } from "../services/api";

function Developers() {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    async function loadDevelopers() {
      try {
        const data = await getDevelopers();
        setDevelopers(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDevelopers();
  }, []);

  return (
    <div className="developers-section">
      <h2>Developers</h2>

      <div className="developer-list">
        {developers.map((developer) => (
          <div className="developer-card" key={developer.id}>
            <h3>{developer.name}</h3>
            <p>ID: {developer.id}</p>
            <p>Email: {developer.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Developers;