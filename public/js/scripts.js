document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projectsContainer");

  if (!projectsContainer) return;


  fetch("/nana/api/projects")
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      projectsContainer.innerHTML = ""; 
      
      data.forEach(project => {
        
        projectsContainer.innerHTML += `
          <div class="project-card">
            <img src="${project.img}" alt="${project.title}" loading="lazy">
            <div class="project-card-body">
              <h3>${project.title}</h3>
              <p>${project.desc}</p>
              <div class="project-buttons">
                <a href="${project.live}" target="_blank" class="btn-live">View Live</a>
                <a href="${project.code}" target="_blank" class="btn-code">Source Code</a>
              </div>
            </div>
          </div>`;
      });
    })
    .catch(error => {
      console.error("Error loading projects:", error);
      projectsContainer.innerHTML = "<p>Unable to load projects at this time.</p>";
    });
});