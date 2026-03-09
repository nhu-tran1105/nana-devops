document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projectsContainer");
    const projectForm = document.getElementById("projectForm");
    const submitBtn = document.querySelector('#projectForm button[type="submit"]');

    /**
     * READ: Fetch all projects from MongoDB via the API
     * Meets Requirement: 7.4, 7.5, 7.6 (Persistence)
     */
    const loadProjects = async () => {
        try {
            // Path matches your app.mjs: app.use('/nana/api', Routes);
            const res = await fetch('/nana/api/projects'); 
            const data = await res.json();
            
            if (!projectsContainer) return;
            projectsContainer.innerHTML = "";
            
            data.forEach(p => {
                projectsContainer.innerHTML += `
                    <div class="project-card">
                        <img src="${p.img || 'https://via.placeholder.com/300'}" alt="${p.title}">
                        <div class="project-card-body">
                            <h3>${p.title}</h3>
                            <p>${p.desc}</p>
                            <div class="project-buttons">
                                <div class="main-actions">
                                    <a href="${p.live || '#'}" class="btn-live">View Live</a>
                                    <a href="${p.code || '#'}" class="btn-source">Source Code</a>
                                </div>
                                
                                <div class="admin-controls">
                                    <button onclick="prepareEdit('${p._id}', '${p.title}', '${p.desc}', '${p.img}')" class="btn-edit">Edit</button>
                                    <button onclick="deleteProject('${p._id}')" class="btn-delete">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>`});
        } catch (error) {
            console.error("❌ Error loading projects:", error);
        }
    };

    /**
     * CREATE & UPDATE: Handles form submission for both new and existing items
     * Meets Requirement: 6.2 (HTTP POST/PUT Verbs)
     */
    if (projectForm) {
        projectForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const id = projectForm.dataset.editId; // Presence of ID determines Update vs Create
            const projectData = {
                title: document.getElementById('title').value,
                img: document.getElementById('img').value,
                desc: document.getElementById('desc').value,
                live: "#",
                code: "#"
            };

            const url = id ? `/nana/api/projects/${id}` : '/nana/api/projects';
            const method = id ? 'PUT' : 'POST';

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(projectData)
                });

                if (response.ok) {
                    alert(id ? "Project updated successfully!" : "Project added successfully!");
                    
                    // Reset Form State
                    delete projectForm.dataset.editId;
                    submitBtn.innerText = "Add Project";
                    projectForm.reset();
                    
                    // Refresh to show persistent data state
                    loadProjects(); 
                }
            } catch (error) {
                console.error("❌ API Error:", error);
            }
        });
    }

    /**
     * UPDATE UI: Populate form fields for editing
     */
    window.prepareEdit = (id, title, desc, img) => {
        document.getElementById('title').value = title;
        document.getElementById('desc').value = desc;
        document.getElementById('img').value = img;
        
        projectForm.dataset.editId = id; 
        submitBtn.innerText = "Update Project";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * DELETE: Remove project from database
     * Meets Requirement: 7.5 (Delete functionality)
     */
    window.deleteProject = async (id) => {
        if (confirm("Are you sure you want to delete this project? This cannot be undone.")) {
            try {
                const response = await fetch(`/nana/api/projects/${id}`, { 
                    method: 'DELETE' 
                });
                if (response.ok) {
                    loadProjects();
                }
            } catch (error) {
                console.error("❌ Error deleting project:", error);
            }
        }
    };

    // Initial Load
    loadProjects();
});