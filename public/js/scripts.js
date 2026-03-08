document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projectsContainer");
  const achievementsContainer = document.getElementById("achievementsContainer");

  // Load Projects
  fetch("data/data.json")
    .then(r => r.json())
    .then(data => {
      data.forEach(d => {
        projectsContainer.innerHTML += `
          <div class="project-card">
            <img src="${d.img}" alt="${d.title}" loading="lazy">
            <div class="project-card-body">
              <h3>${d.title}</h3>
              <p>${d.desc}</p>
              <div class="project-buttons">
                <a href="${d.live}" target="_blank" class="btn-live">View Live</a>
                <a href="${d.code}" target="_blank" class="btn-code">Source Code</a>
              </div>
            </div>
          </div>`;
      });
    });

  // Load Achievements
  fetch("data/achievement.json")
    .then(r => r.json())
    .then(achievements => {
      achievements.forEach(a => {
        achievementsContainer.innerHTML += `
          <div class="col text-center">
            <div class="p-4 bg-white rounded shadow-sm h-100 d-flex flex-column justify-content-center">
              <i class="bi ${a.icon} fs-1 text-pink mb-3"></i>
              <p class="mt-2 fw-bold mb-1">${a.title}</p>
              <small class="text-muted">${a.desc}</small>
            </div>
          </div>`;
      });
    });
});