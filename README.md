# 📦 Lost & Found Board

**Lost & Found Board** is a web application built with React, TypeScript, and Vite that allows users to post and manage lost or found items. It supports user authentication and separates items by user.

---

## Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/lost-found-board.git
cd lost-found-board
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Start the development server:

```bash
npm run dev
```

Open your browser at:
 `http://localhost:5173`

---

##  Technologies Used

*  **React** – UI building library
*  **Vite** – Fast front-end build tool
*  **Tailwind CSS** – Utility-first CSS framework
*  **TypeScript** – Typed JavaScript for safety
*  **React Hook Form** – Form handling and validation
*  **Axios** – HTTP requests
*  **MockAPI.io** – Simulated backend services

---

##  Project Structure

```
src/
├── components/        # Reusable UI components (Modal, Cards, Tabs)
├── pages/             # App pages (Login, Register, Board)
├── hooks/             # Custom React hooks
├── lib/               # API logic (axios requests)
├── types/             # TypeScript interfaces and types
├── assets/            # Static files like images
└── App.tsx            # Main routing and layout
```

---

##  Core Features

*  Register & Login
*  Post new items as either "Lost" or "Found"
*  Filter items by status: `Active` or `Done`
*  Mark items as "Done" when resolved
*  Each user sees and manages their own items
