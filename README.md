# 🚀 DevOps Task App

A fullstack DevOps project demonstrating a modern development workflow using:

- ⚛️ React (Frontend)
- 🟢 Node.js + Express (Backend)
- 🍃 MongoDB (Database)
- 🐳 Docker & Docker Compose
- ⚙️ Jenkins (CI/CD Pipeline)

---

## 📸 Overview

Simple task management application where you can:

- ✅ Create tasks
- 📋 View tasks
- ✏️ Update tasks
- ❌ Delete tasks

All data is persisted in MongoDB and the entire app is containerized.

---

## 🏗️ Project Structure

```bash
devops-lab/
│
├── backend/ # Node.js API
├── frontend/ # React app
├── docker-compose.yml
├── .env
└── README.md
```

---

## ⚙️ Requirements

Make sure you have installed:

- Docker
- Docker Compose

---

## 🚀 Run Locally

```bash
docker compose up --build

```

---

## ⚙️ Access

Frontend → http://localhost:3000
Backend API → http://localhost:5000/tasks
Jenkins → http://localhost:8080

---

## 🧪 Example API

Get tasks
GET /tasks

Create task
POST /tasks

---

## 🔐 Environment Variables

Create a .env file in root:

MONGO_URI=mongodb://mongo:27017/devopsdb
PORT=5000

---

## 🐳 Docker

The app is fully containerized using Docker Compose:

Backend service
Frontend service
MongoDB service

---

## ⚙️ CI/CD (Jenkins)

This project includes a Jenkins pipeline that:

Clones the repository
Builds Docker images
Runs containers

---

## 🧠 What I Learned

Dockerizing fullstack apps
Managing multi-container environments
Setting up CI/CD pipelines with Jenkins
Connecting services via Docker networks
Using environment variables securely

---

## 📌 Future Improvements

🔐 Authentication (JWT)
🎨 Better UI (Tailwind / Material UI)
☁️ Deploy to cloud (AWS / Azure)
☸️ Kubernetes deployment
👨‍💻 Author

---

## 👨‍💻 Author

Developed as part of a DevOps learning 🚀
