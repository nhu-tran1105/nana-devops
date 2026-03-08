document.addEventListener("DOMContentLoaded", () => {
  console.log("Nhu's Dev Portfolio Loaded");

  const projectsContainer = document.getElementById("projectsContainer");
  const achievementsContainer = document.getElementById("achievementsContainer");
  const searchInput = document.getElementById("searchInput");

  // Load Projects
  fetch("data/data.json")
    .then(res => res.json())
    .then(projects => {
      const renderProjects = (list) => {
        projectsContainer.innerHTML = "";
        list.forEach(p => {
          const card = `
            <div class="col">
              <div class="card h-100 shadow hover-shadow">
                <img src="${p.image}" class="card-img-top" alt="${p.title}" style="height: 250px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${p.title}</h5>
                  <p class="card-text flex-grow-1">${p.description}</p>
                  <div class="mb-3">
                    ${p.tags.map(t => `<span class="badge bg-primary me-1">${t}</span>`).join("")}
                  </div>
                  <div class="mt-auto">
                    <a href="${p.liveUrl}" target="_blank" class="btn btn-success btn-sm me-2">Live Demo</a>
                    <a href="${p.sourceUrl}" target="_blank" class="btn btn-outline-dark btn-sm">Source Code</a>
                  </div>
                </div>
              </div>
            </div>`;
          projectsContainer.innerHTML += card;
        });
      };
      renderProjects(projects);

      // Search functionality (BONUS!)
      searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = projects.filter(p => 
          p.title.toLowerCase().includes(term) || 
          p.description.toLowerCase().includes(term) ||
          p.tags.some(t => t.toLowerCase().includes(term))
        );
        renderProjects(filtered);
      });
    });

  // Load Achievements
  fetch("data/achievements.json")
    .then(res => res.json())
    .then(achs => {
      achs.forEach(a => {
        achievementsContainer.innerHTML += `
          <div class="col">
            <div class="card text-center h-100 border-0 shadow-sm">
              <div class="card-body">
                <i class="${a.icon} fa-3x mb-3 text-primary"></i>
                <h5 class="card-title">${a.title}</h5>
                <p class="card-text"><strong>${a.issuer}</strong><br>${a.year}</p>
              </div>
            </div>
          </div>`;
      });
    });
});