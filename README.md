# Buildfolio

A developer-focused platform to discover projects, share ideas, and build a portfolio. Inspired by GitHub Explore, Product Hunt, and Dev.to — focused entirely on developer project showcases.

> ⚠️ **This project is still ongoing.** Features and architecture are actively being developed and improved.
> 🚀 **Update:** The project has been upgraded to a full-stack architecture with a Node.js/Express backend and PostgreSQL database!

> 📚 This project is part of an assignment in the bootcamp program from [harisenin.com](https://harisenin.com).

---

## Overview

Buildfolio lets developers:

- Discover projects built by other developers
- Showcase their own projects with tech stack, links, and descriptions
- Browse by category and trending technology
- Like, bookmark, and comment on projects from the community
- Manage projects via a personal dashboard (Create, Read, Update, Delete)
- Register and log in with secure JWT-based authentication
- Contact administrators via a built-in contact form

---

## Tech Stack

| Layer            | Choice                            |
| ---------------- | --------------------------------- |
| **Frontend**     | React 19 (Vite)                   |
| **Backend**      | Node.js + Express.js              |
| **Database**     | PostgreSQL (hosted on Neon)       |
| **Authentication**| JWT (JSON Web Tokens) & bcrypt    |
| **File Uploads** | Multer                            |
| **Email Service**| Nodemailer (Mailtrap)             |
| **Styling**      | Tailwind CSS v4                   |
| **Routing**      | React Router DOM                  |
| **State Mgt**    | Redux Toolkit + React Redux       |
| **API Client**   | Axios                             |

---

## Features

### Public

- Homepage with Featured Projects, Categories, Trending Technologies, Community Favorites
- View project details, read comments, and see bookmarks
- Responsive layout — mobile hamburger menu, adaptive grid
- Contact form to send messages to the platform administrators

### Auth

- Register with name, email, password
- Login with secure JWT authentication and bcrypt password hashing
- Session persistence

### Protected (requires login)

- **Dashboard** — view and manage all projects in a table
- **Create Project** — add a new project with image upload support
- **Edit Project** — update any existing project
- **Delete Project** — with confirmation dialog
- **Interact** — Like, bookmark, and comment on projects

---

## Project Structure

This is a monorepo-style structure containing both the frontend and backend:

```
buildfolio-react/
├── buildfolio-api/     # Express.js Backend
│   ├── src/
│   │   ├── config/     # Database and email configurations
│   │   ├── middleware/ # Authentication and upload middlewares
│   │   ├── routes/     # API route handlers
│   │   └── services/   # Business logic
│   ├── upload/         # Uploaded image files
│   └── .env            # Backend environment variables
├── src/                # React.js Frontend
│   ├── components/     # Reusable UI components
│   ├── data/           # Static seed data (categories, technologies)
│   ├── pages/          # Page components (Home, Dashboard, etc.)
│   ├── services/api/   # Axios API clients
│   └── store/          # Redux Toolkit slices and store
├── .env                # Frontend environment variables
└── package.json        # Frontend dependencies
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL database (or Neon.tech account)
- Mailtrap account (for testing emails)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kisnak21/buildfolio-react
cd buildfolio-react
```

### Backend Setup

1. Navigate to the backend directory and install dependencies:
```bash
cd buildfolio-api
npm install
```

2. Create a `.env` file in `buildfolio-api/` with the following variables:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/buildfolio
JWT_SECRET=your_jwt_secret_key
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass
```

3. Start the backend development server:
```bash
npm run dev
```
The backend will run on `http://localhost:3000`.

### Frontend Setup

1. Open a new terminal, navigate to the project root, and install dependencies:
```bash
cd buildfolio-react
npm install
```

2. Create a `.env` file in the project root:
```env
VITE_REAL_API_BASE_URL=http://localhost:3000
VITE_API_BASE_URL=https://<your-mockapi-id>.mockapi.io/api/v1/<your-resource> # If still needed for fallback
```

3. Start the frontend development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## Planned Improvements

- [ ] Migrate to Next.js with App Router
- [ ] Project ownership — users can only edit/delete their own projects
- [ ] Search, filter, and sort on homepage
- [ ] Public user profile pages (`/u/[username]`)
- [ ] AI features — project description generator, README generator, idea generator
- [ ] Deployment to Vercel and Render/Heroku for backend

---

## Developer

**Kresna Satya Nugroho**
GitHub: [@kisnak21](https://github.com/kisnak21)

---

## References

- [Express.js](https://expressjs.com/) — Backend framework
- [Neon Tech](https://neon.tech/) — Serverless PostgreSQL
- [Redux Toolkit](https://redux-toolkit.js.org) — state management
- [React Router](https://reactrouter.com) — client-side routing
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [MockAPI.io](https://mockapi.io) — fake REST API (legacy)
