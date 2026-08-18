\# GraphSkill – Developer Skill \& Project Matching System



GraphSkill is a full-stack developer skill and project matching application built to demonstrate how graph-based data can be used to connect developers, skills, and projects.



The application provides a dashboard for viewing developers, projects, and skills, along with intelligent matching between developers and projects based on their skills.



\## Features



\* Developer management and visualization

\* Project management and visualization

\* Skill management and categorization

\* Developer → Project recommendations

\* Project → Developer matching

\* Matching skill count

\* Matching skill details

\* Dashboard statistics

\* Responsive professional UI

\* REST APIs using Spring Boot

\* Graph database integration using CognoDB

\* CORS configuration for frontend-backend communication

\* Environment variables for database credentials

\* Global exception handling



\## Tech Stack



\### Backend



\* Java

\* Spring Boot

\* Spring Web

\* REST APIs

\* Neo4j Java Driver

\* CognoDB

\* Maven



\### Frontend



\* React

\* Vite

\* JavaScript

\* HTML

\* CSS



\### Database



\* CognoDB / Neo4j-compatible graph database



\## Project Structure



```text

graphskill/

│

├── graphskill-backend/

│   └── graphskill-backend/

│       ├── src/

│       │   └── main/

│       │       ├── java/

│       │       │   └── com/example/graphskill\_backend/

│       │       │       ├── config/

│       │       │       ├── controller/

│       │       │       └── exception/

│       │       └── resources/

│       │           └── application.properties

│       ├── pom.xml

│       └── mvnw

│

├── graphskill-frontend/

│   ├── src/

│   │   ├── components/

│   │   ├── services/

│   │   ├── App.jsx

│   │   └── App.css

│   ├── package.json

│   └── vite.config.js

│

└── README.md

```



\## Dashboard



The dashboard displays three primary statistics:



\* Developers

\* Projects

\* Skills



It also provides detailed sections for browsing the available developers, projects, and skills.



\## Developer → Project Matching



A developer can be selected from the \*\*Project Recommendations\*\* dropdown.



The system analyzes the developer's skills against the skills required by each project and returns projects with matching skills.



Example:



```text

Developer: Lina Patil



Project: Student Management System

Matching Skills: 3

Skills: Java, SQL, Spring Boot

```



Results are sorted by the number of matching skills.



\## Project → Developer Matching



A project can be selected from the \*\*Developer Matching\*\* dropdown.



The system compares the project's required skills against every developer's skills and returns developers who match the project.



Example:



```text

Project: Student Management System



Developer: Rahul Sharma

Matching Skills: 3

Skills: JavaScript, React, SQL

```



Developers are ranked according to their number of matching skills.



\## Backend API



The backend exposes REST endpoints for developers, projects, skills, health checking, and recommendations.



\### Health Check



```text

GET /api/health

```



Example response:



```json

{

&nbsp; "status": "UP",

&nbsp; "database": "CognoDB"

}

```



\### Developers



```text

GET /api/developers

```



\### Projects



```text

GET /api/projects

```



\### Skills



```text

GET /api/skills

```



\### Project Recommendations



```text

GET /api/recommendations/{developerId}

```



\### Developer Matching



```text

GET /api/recommendations/project/{projectId}

```



\## Environment Variables



Database credentials are not stored directly in the source code.



The backend uses environment variables:



```properties

cognodb.uri=${COGNODB\_URI}

cognodb.username=${COGNODB\_USERNAME}

cognodb.password=${COGNODB\_PASSWORD}

```



Set the following variables before running the backend:



```text

COGNODB\_URI

COGNODB\_USERNAME

COGNODB\_PASSWORD

```



Never commit actual database credentials to GitHub.



\## Running the Backend



Navigate to:



```text

graphskill-backend/graphskill-backend

```



On Windows PowerShell:



```powershell

.\\mvnw.cmd spring-boot:run

```



The backend runs on:



```text

http://localhost:8080

```



\## Running the Frontend



Navigate to:



```text

graphskill-frontend

```



Install dependencies:



```powershell

npm install

```



Start the development server:



```powershell

npm run dev

```



The frontend runs on:



```text

http://localhost:5173

```



\## Architecture



```text

React Frontend

&nbsp;     │

&nbsp;     │ REST API

&nbsp;     ▼

Spring Boot Backend

&nbsp;     │

&nbsp;     │ Neo4j Driver

&nbsp;     ▼

CognoDB Graph Database

```



The graph database represents relationships between:



```text

Developer ──HAS\_SKILL──> Skill



Project ──REQUIRES\_SKILL──> Skill

```



These relationships are used to calculate developer-project compatibility.



\## Example Graph Relationship



```text

(Lina Patil)

&nbsp;     │

&nbsp;     ├── HAS\_SKILL ──> Java

&nbsp;     ├── HAS\_SKILL ──> SQL

&nbsp;     └── HAS\_SKILL ──> Spring Boot



(Student Management System)

&nbsp;     │

&nbsp;     ├── REQUIRES\_SKILL ──> Java

&nbsp;     ├── REQUIRES\_SKILL ──> SQL

&nbsp;     └── REQUIRES\_SKILL ──> Spring Boot

```



This allows the system to identify matching skills efficiently.



\## Error Handling



The backend includes centralized exception handling using a global exception handler.



API errors are returned with appropriate HTTP responses instead of exposing internal application details.



\## CORS



The backend is configured to allow communication between the React development server and Spring Boot API.



Frontend:



```text

http://localhost:5173

```



Backend:



```text

http://localhost:8080

```



\## Security



Sensitive database credentials are managed through environment variables rather than hardcoded values.



The repository does not contain the actual CognoDB password.



\## Future Enhancements



Possible future improvements include:



\* Developer and project CRUD operations

\* Authentication and authorization

\* Advanced skill weighting

\* Skill proficiency levels

\* Match percentage calculation

\* Search and filtering

\* Graph visualization

\* Production deployment

\* Automated testing and CI/CD



\## Author



\*\*Lina Patil\*\*



GitHub:



https://github.com/Lina401-bit



\## Assignment



Developed as a full-stack implementation demonstrating developer skill management and graph-based project matching using Spring Boot, React, and CognoDB.



