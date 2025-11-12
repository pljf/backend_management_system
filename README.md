# 🧭 General Back-end Management System

A simple yet functional **React Dashboard** built with **React, Ant Design, and Mock.js**.  
This project simulates a real management system with login authentication, data visualization, and CRUD user management.

---

## 🚀 Features

### 🔐 Authentication
- **Login / Logout** functionality (with mock backend verification)
- Simulated role-based menu loading via `mockServeData/permission.js`

### 🏠 Home Dashboard
- Displays user profile (avatar, name, role, last login info)
- Data visualization using Echarts:
  - Line chart of daily order data  
  - Bar and pie charts for sales statistics  
- Realtime mock data from `mockServeData/home.js`

### 👥 User Management
- View a paginated table of users  
- Add / Edit / Delete user records  
- Search users by name (case-insensitive)
- Built with Ant Design `Table`, `Form`, and `Modal` components

### 📂 Sidebar Navigation
- Dynamic menu loading
- Includes pages:  
  - `Home`
  - `Mall`
  - `User`
  - `Other` (with subpages)

### 🧩 Component Design
- **CommonHeader**: top bar with dropdown menu (profile / logout)  
- **CommonAside**: sidebar menu (collapsible)  
- **CommonTag**: navigation tag bar (breadcrumb-like tab system)

---
## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend Framework | React (Hooks) |
| UI Library | Ant Design |
| State Management | Redux Toolkit |
| Data Simulation | Mock.js |
| Charting | Echarts |
| Routing | React Router DOM |
| Language | JavaScript (ES6+) |

---

## 💻 Getting Started

### 1️⃣ Install Dependencies
npm install

### 2️⃣ Run the App
npm start

### 3️⃣ Login Credentials
Username: Patrick
Password: Patrick

---

## 💡 Usage

1. Open the browser and visit http://localhost:3000

2. Log in using the demo credentials

3. Navigate through:

- Home Page: View charts, statistics, and user profile

- User Page: Manage users (Add / Edit / Delete)

- Other Pages: Placeholder demo for system expansion

4. Log out via the profile dropdown menu on the header
