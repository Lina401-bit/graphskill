const API_BASE_URL = "https://graphskill-backend.onrender.com/api";

export async function getDevelopers() {
  const response = await fetch(`${API_BASE_URL}/developers`);

  if (!response.ok) {
    throw new Error("Failed to fetch developers");
  }

  return response.json();
}

export async function getProjects() {
  const response = await fetch(`${API_BASE_URL}/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function getSkills() {
  const response = await fetch(`${API_BASE_URL}/skills`);

  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }

  return response.json();
}

export async function getRecommendations(developerId) {
  const response = await fetch(
    `${API_BASE_URL}/recommendations/${developerId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return response.json();
}

export async function getProjectDevelopers(projectId) {
  const response = await fetch(
    `${API_BASE_URL}/recommendations/project/${projectId}/developers`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch project developers");
  }

  return response.json();
}

export async function getProjectDetails(projectId) {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch project details");
  }

  return response.json();
}