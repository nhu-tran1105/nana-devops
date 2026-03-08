# 🎮 Project QUEBEC

**Author:** Nhu Tran (Quynh Nhu)  
**Course:** CIS 486 — University of North Alabama (UNA)  
**Professor:** Dr. Barry Cumbie

---

## 📝 Project Overview

This project is a full-stack web application developed as part of the **QUEBEC** project requirements. It features a dynamic management interface that allows users to interact directly with data stored in a cloud environment. The project emphasizes modern development practices, including **MVC Architecture**, **Persistent Cloud Data**, and **Automated CI/CD**.

---

## 🚀 Live Deployments

The application is successfully deployed and accessible via the following links:

* **Production (GCP + Custom Domain):** [https://nana.barrycumbie.com/](https://nana.barrycumbie.com/)
* **Development (Render):** [https://quebec-cizi.onrender.com/](https://quebec-cizi.onrender.com/)
* **Direct IP Access:** [(https://34.16.156.28/)]

---

## 🛠️ Tech Stack & Architecture

* **Backend:** Node.js with the Express framework.
* **Database:** MongoDB Atlas (Cloud) for secure and persistent data storage.
* **Architecture:** Strictly follows the **Model-View-Controller (MVC)** pattern. Logic is clearly separated into `routes/`, `controllers/`, and `models/` directories.
* **CI/CD:** Automated deployment pipeline using **GitHub Actions**. Any changes pushed to the `devv` branch are automatically synchronized with the GCP production server via a secure SSH connection.
* **Process Management:** Utilizes **PM2** on the GCP instance to ensure 24/7 uptime and automatic restarts in case of failure.



---

## 🛡️ Security & Environment Configuration

* **Environment Variables:** Sensitive credentials (such as the MongoDB connection string) are strictly managed via `.env` files and **GitHub Secrets**.
* **Git Safety:** The `.env` file is explicitly excluded from the repository via `.gitignore` to prevent any security credential leakages.
* **Production Config:** Environment variables are securely injected into the Render and GCP environments during the deployment process.



---

## 📦 Getting Started Locally

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone -b devv [https://github.com/nhu-tran1105/nana-devops.git](https://github.com/nhu-tran1105/nana-devops.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    Create a `.env` file in the root directory and add your credentials:
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=3000
    ```
4.  **Start the server:**
    ```bash
    npm run start
    ```

---

> *“Design is not just what it looks like and feels like. Design is how it works.”* — Steve Jobs

**Made with 💖 in Florence, Alabama • 2026**

