# Buildfolio

A developer-focused platform to discover projects, share ideas, and build a portfolio. Inspired by GitHub Explore, Product Hunt, and Dev.to — focused entirely on developer project showcases.

> ⚠️ **This project is still ongoing.** Features and architecture are actively being developed and improved.

> 📚 This project is part of an assignment in the bootcamp program from [harisenin.com](https://harisenin.com).

---

## Overview

Buildfolio lets developers:

- Discover projects built by other developers
- Showcase their own projects with tech stack, links, and descriptions
- Browse by category and trending technology
- Like projects from the community
- Manage projects via a personal dashboard (Create, Read, Update, Delete)
- Register and log in with a persistent session

---

## Tech Stack

| Layer            | Choice                            |
| ---------------- | --------------------------------- |
| Framework        | React 18 (Vite)                   |
| Styling          | Tailwind CSS v4                   |
| Routing          | React Router DOM                  |
| State Management | Redux Toolkit + React Redux       |
| API Client       | Axios                             |
| Fake API         | MockAPI.io                        |
| Linting          | ESLint + @stylistic/eslint-plugin |

---

## Features

### Public

- Homepage with Featured Projects, Categories, Trending Technologies, Community Favorites
- Like projects (persisted to API)
- Responsive layout — mobile hamburger menu, adaptive grid

### Auth

- Register with name, email, password
- Login with email + password validation against MockAPI
- Session persisted via `localStorage` — survives page refresh
- Logout clears session

### Protected (requires login)

- **Dashboard** — view and manage all projects in a table
- **Create Project** — add a new project with title, description, category, technologies, author, GitHub, and live URL
- **Edit Project** — update any existing project
- **Delete Project** — with confirmation dialog

---

## Project Structure

```
src/
├── components/
│   ├── auth/           # ProtectedRoute
│   ├── dashboard/      # ProjectTable, ProjectForm, ConfirmDialog
│   ├── home/           # Hero, Section, ProjectCard, CategoryCard, TechPill
│   ├── layout/         # Header, Footer, AuthCard, AvatarDropdown
│   └── ui/             # Button, Input, Checkbox, Divider, GoogleButton
├── data/               # Static seed data (categories, technologies)
├── pages/              # LoginPage, RegisterPage, HomePage, DashboardPage, NewProjectPage, EditProjectPage
├── services/
│   └── api/            # axiosClient.js, projectsApi.js, usersApi.js
└── store/
    └── redux/          # store.js, projectsSlice.js, authSlice.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/kisnak21/buildfolio-react
cd buildfolio-react
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=https://<your-mockapi-id>.mockapi.io/api/v1/<your-resource>
```

See `.env.example` for reference.

### Running Locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Known Limitations

- **Passwords are stored in plaintext** via MockAPI — this is an accepted limitation for this assignment/mock phase. Real password hashing and secure authentication are planned for a future iteration using Auth.js v5.
- **No real authorization** — any registered user can edit or delete any project. Ownership/scoping is planned for a future iteration.
- **Session is not token-based** — `localStorage` stores the user object directly, not a JWT or signed token. This is intentional for the current phase.
- **MockAPI free tier** — limited to 100 objects per resource. Suitable for development and demo purposes only.

---

## Planned Improvements

- [ ] Migrate to Next.js with App Router
- [ ] Real authentication — Auth.js v5, bcrypt password hashing
- [ ] PostgreSQL database via Neon + Prisma ORM
- [ ] Project ownership — users can only edit/delete their own projects
- [ ] Search, filter, and sort on homepage
- [ ] Public user profile pages (`/u/[username]`)
- [ ] AI features — project description generator, README generator, idea generator
- [ ] Deployment to Vercel

---

## Developer

**Kresna Satya Nugroho**
GitHub: [@kisnak21](https://github.com/kisnak21)

---

## References

- [MockAPI.io](https://mockapi.io) — fake REST API for development
- [Redux Toolkit](https://redux-toolkit.js.org) — state management
- [React Router](https://reactrouter.com) — client-side routing
- [DiceBear](https://www.dicebear.com) — pixel-art avatar generation
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [Dev.to](https://dev.to) — card design inspiration
- [Product Hunt](https://www.producthunt.com) — layout inspiration
- [GitHub Explore](https://github.com/explore) — project card aesthetic
