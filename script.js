document.addEventListener("DOMContentLoaded", () => {
    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            let projectsContainer = document.getElementById("projects");
            projects.forEach(project => {
                let projectDiv = document.createElement("div");
                projectDiv.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="${project.github}" target="_blank">GitHub</a>
                    <a href="${project.live}" target="_blank">Live Demo</a>
                `;
                projectsContainer.appendChild(projectDiv);
            });
        });
});

