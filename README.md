# 🌴 Blogging Paradise

A premium, full-stack blogging platform built with the PERN (PostgreSQL, Express, React, Node.js) stack. Featuring a modern glassmorphic UI, robust admin tools, and interactive content creation.

## 🚀 Key Features

*   **Premium Design**: Stunning dark-themed interface with glassmorphism and smooth Framer Motion animations.
*   **Relational Database**: Powered by **PostgreSQL** for scalable, robust data management.
*   **Admin Dashboard**: Manage users, stories, and monitor platform reach from a powerful interactive center.
*   **Secure Auth**: JWT-based session management with role-based access control (USER/ADMIN).
*   **Modular Architecture**: Clean code structure using controllers, routes, and Prisma ORM.

---

## 🛠️ Installation Guide

### 1. Prerequisites
*   [Node.js](https://nodejs.org/) (v16+)
*   [PostgreSQL](https://www.postgresql.org/) (Installed and Running)

### 2. Backend Setup
1. Open terminal in the `backend` folder.
2. Configure your `.env` file (see Template below).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Initialize the database:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open terminal in the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

---

## ⚙️ Environment Configuration

Create a file named `.env` in the `backend` folder with the following contents:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_premium_secret_key"
PORT=5000
```
*(Replace `USER`, `PASSWORD`, etc. with your actual PostgreSQL credentials.)*

---

## 📂 Project Structure

```text
Blogging-paradise/
├── backend/
│   ├── prisma/             # Database schema
│   ├── src/
│   │   ├── controllers/    # API Logics
│   │   ├── routes/         # Endpoint definitions
│   │   ├── middlewares/    # Security & Auth
│   │   └── lib/            # Prisma Client
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI cards, hero, navbar
│   │   ├── pages/          # Full page views
│   │   ├── context/        # Global Auth state
│   └── public/             # Static assets
```

---

### 👨‍💻 Contributing
Feel free to open issues or submit PRs to enhance the paradise. 🌟
