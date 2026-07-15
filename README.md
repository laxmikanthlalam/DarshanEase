# 🛕 DarshanEase – Temple Darshan Booking System

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Full%20Stack-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express" />
</p>

---

## 📖 Overview

**DarshanEase** is a full-stack MERN web application designed to modernize the temple darshan booking process by replacing traditional manual booking methods with a secure online platform.

The system enables devotees to explore temples, view available darshan slots, reserve tickets online, manage bookings, and download booking confirmations. It also provides a comprehensive admin dashboard for managing temples, darshan slots, users, and bookings.

---

## 🚀 Problem Statement

Traditional temple darshan booking often involves:

- Long waiting queues
- Manual ticket booking
- Limited slot availability information
- Time-consuming administrative processes
- Poor booking management

DarshanEase addresses these challenges through a secure and efficient online booking platform.

---

## 💡 Solution

DarshanEase digitizes the complete temple booking workflow by providing:

- Online temple exploration
- Real-time darshan slot availability
- Secure authentication
- Online booking & cancellation
- PDF ticket generation
- Admin management system

---

# ✨ Features

## 👤 User Features

- User Registration & Login
- JWT Authentication
- Browse Available Temples
- Temple Search & Filtering
- View Temple Details
- Real-Time Slot Availability
- Book Darshan Tickets
- Cancel Bookings
- Download PDF Ticket
- User Profile Management
- Responsive UI

---

## 👨‍💼 Admin Features

- Secure Admin Login
- Dashboard Analytics
- Temple Management (CRUD)
- Darshan Slot Management
- Booking Management
- Revenue Overview
- User Statistics
- Charts & Reports

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Bootstrap 5
- Axios
- React Toastify
- React Icons

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- Morgan
- CORS

## Database

- MongoDB Atlas
- Mongoose ODM

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

# 📂 Project Structure

```
DarshanEase
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── config
│   └── server.js
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/laxmikanthlalam/DarshanEase.git
```

```
cd DarshanEase
```

---

## Backend Setup

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

CLIENT_URL=http://localhost:5173
```

Start Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Start Frontend

```bash
npm run dev
```

---

# 🔐 Authentication

- JWT Based Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization

---

# 📊 Admin Dashboard

The Admin Dashboard provides:

- Total Users
- Total Temples
- Total Slots
- Total Bookings
- Revenue Statistics
- Charts & Analytics

---

# 📄 API Modules

### Authentication

- Register
- Login

### Users

- Profile
- Update Profile

### Temples

- Create Temple
- Update Temple
- Delete Temple
- View Temples

### Slots

- Create Slot
- Update Slot
- Delete Slot

### Bookings

- Book Slot
- Cancel Booking
- View Bookings
- Download Ticket

### Admin

- Dashboard
- Statistics

---

# 📸 Screenshots

> Add screenshots here after deployment.

- Home Page
- Temple Listing
- Temple Details
- Booking Page
- My Bookings
- User Profile
- Admin Dashboard
- Temple Management
- Slot Management

---

# 🌍 Live Demo

### Frontend

```
https://darshan-ease-sepia.vercel.app
```

### Backend API

```
https://darshanease-backend-e74x.onrender.com
```

---

# 🔮 Future Enhancements

- Online Payment Gateway
- QR Code Based Entry
- Email Notifications
- SMS Alerts
- Temple Reviews & Ratings
- AI-Based Crowd Prediction
- Multi-language Support
- Mobile Application

---

# 👨‍💻 Developer

**Lalam Laxmikanth**

B.Tech Computer Science & Engineering

Aditya College of Engineering & Technology

📧 Email: your-email@example.com

🔗 GitHub: https://github.com/laxmikanthlalam

🔗 LinkedIn: Add your LinkedIn profile

---

# ⭐ Support

If you like this project,

🌟 Star this repository

🍴 Fork it

🤝 Contribute

---

# 📜 License

This project is developed for educational and learning purposes.

© 2026 Lalam Laxmikanth. All Rights Reserved.
