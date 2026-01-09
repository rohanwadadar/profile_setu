# SETU – Full Stack User Profile Platform

SETU is a **full-stack web application** built using **Flask (Backend)** and **React + Tailwind CSS (Frontend)**.  
It implements **JWT-based authentication**, **role-based access control (RBAC)**, and a **user profile management system**.

The project follows **production-ready architecture** and modern best practices.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication (login & signup)
- Secure protected routes
- Role-Based Access Control (RBAC)
  - User
  - Admin

### 👤 User Profile
- View & update profile details
- Fields:
  - Name
  - Email
  - LinkedIn URL
  - Phone Number
  - Years of Experience
  - Current Organization

### 👮 Admin Panel
- Admin-only access
- View all registered users
- Role-aware UI rendering

### 🎨 Frontend
- React with Vite
- Tailwind CSS (v4)
- Modern, futuristic UI
- Protected routes with React Router
- Axios with interceptors

### ⚙️ Backend
- Flask REST API
- Flask-JWT-Extended
- SQLAlchemy ORM
- MySQL database
- Secure password hashing (bcrypt)

---

## 🏗️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Flask
- Flask-JWT-Extended
- Flask-CORS
- SQLAlchemy
- MySQL

---

## 📁 Project Structure

profile_setu/
├── backend/
│ ├── app/
│ │ ├── api/
│ │ ├── auth.py
│ │ ├── models.py
│ │ ├── routes.py
│ │ └── extensions.py
│ ├── run.py
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── auth/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── index.html
│ └── tailwind.config.cjs
│
├── .gitignore
└── README.md

yaml
Copy code

---

## ⚙️ Backend Setup (Flask)

### 1️⃣ Create Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate   # Windows
2️⃣ Install Dependencies
bash
Copy code
pip install -r requirements.txt
3️⃣ Environment Variables (.env)
env
Copy code
SECRET_KEY=supersecret
JWT_SECRET_KEY=jwtsecret
DATABASE_URL=mysql+pymysql://root@localhost/test

ADMIN_NAME=Super Admin
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin@123
4️⃣ Run Backend
bash
Copy code
python run.py
Backend runs on:

cpp
Copy code
http://127.0.0.1:5000
⚛️ Frontend Setup (React)
1️⃣ Install Dependencies
bash
Copy code
cd frontend
npm install
2️⃣ Run Development Server
bash
Copy code
npm run dev
Frontend runs on:

arduino
Copy code
http://localhost:5173
🔑 API Endpoints (Sample)
Auth
Method	Endpoint	Description
POST	/api/register	Register user
POST	/api/login	Login user

Profile
Method	Endpoint	Description
GET	/api/profile	Get user profile
PUT	/api/profile	Update profile

Admin
Method	Endpoint	Description
GET	/api/admin/users	List all users

🧪 Testing
Postman
Use Authorization: Bearer <JWT_TOKEN>

JSON body for POST/PUT requests

Browser
React frontend handles auth state

Protected routes auto-redirect

🧠 Key Concepts Demonstrated
JWT authentication

RBAC (Role-Based Access Control)

Secure password hashing

API ↔ Frontend integration

Clean folder structure

Production-ready React patterns

📌 Future Enhancements
Profile image upload

Resume upload (PDF)

JWT refresh tokens

Pagination & search in admin panel

Deployment (Docker + CI/CD)

👨‍💻 Author
Rohan Wadadar
Full Stack Developer (Flask • React • JWT • SQL)

⭐ If you like this project
Give it a ⭐ on GitHub — it helps a lot!

markdown
Copy code

---

### ✅ What this README gives you
- Recruiter-friendly
- Interview-ready
- Clear architecture
- Professional tone
- Scalable documentation

If you want next:
- 📦 **Dockerize project**
- ☁️ **Deploy to Render / Railway / Vercel**
- 🧪 **Add automated tests**
- 📝 **Resume bullet points for this project**

Just tell me 🚀
