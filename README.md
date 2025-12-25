# 🎨 Artisy – Creative Image Sharing Platform (Backend)

Artisy is a full-stack creative platform where users can upload, explore, and interact with artistic images.  
This repository contains the **backend API** built using **Node.js, Express, MongoDB**, and **Cloudinary**.

🔗 **Live Frontend:** https://artisy-gallery.vercel.app  
🔗 **Backend API:** https://artisy-backend.onrender.com

---

## 🚀 Features

- 🔐 JWT Authentication (Login / Signup)
- 👤 User Profiles with View Tracking
- 🖼️ Image Upload (Cloudinary Integration)
- ❤️ Like & 👎 Dislike System
- 👁️ Image View Counter
- 🎨 Mood-based Image Filtering
- 📊 Profile Analytics (Views, Uploads)
- 🧠 Clean MVC Architecture
- 🔒 Secure Routes with Middleware

---

## 🧱 Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (Image Storage)

**Other Tools**
- Multer (file handling)
- dotenv
- bcrypt
- CORS

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
FRONTEND_URL=http://localhost:5173
🧪 API Endpoints Overview
🔐 Auth
POST /api/auth/signup

POST /api/auth/login

GET /api/auth/me

👤 User

GET /api/users/:username

GET /api/users/:username/images

🖼️ Images
GET /api/images/random

GET /api/images?mood=Calm

POST /api/images/upload

POST /api/images/:id/view

❤️ Reactions
POST /api/images/:id/like

POST /api/images/:id/dislike

🛠️ Run Locally
1️⃣ Clone the repository
git clone https://github.com/RickOnJava/ARTISY-backend.git
cd artisy-backend

2️⃣ Install dependencies
npm install

3️⃣ Start the server
npm run dev

Server will start at:

http://localhost:5000
🌐 Frontend Repository
👉 https://github.com/RickOnJava/ARTISY-frontend

📸 Screenshots
UI includes authentication pages, image feed, profile pages, and interactive modals.

🧠 Key Highlights
Clean REST API design

Secure authentication & authorization

Optimized MongoDB queries

Scalable architecture

Production-ready structure

👨‍💻 Author
RICK GHOSH
Full Stack Developer
📧 devwithrick404@gmail.com
🌐 https://rick-ghosh.netlify.app
