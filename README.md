# Marcus Koch Website

A personal portfolio website built with **Astro** (static output) and **React islands**.

---

## ✨ Features

- Static HTML at build time, React only where the page is genuinely interactive
- ESLint configuration for clean code
- Clear folder separation for maintainability

---

## 📂 Project Structure

- **`public/`** – Static assets (favicons, images, robots.txt, …)
- **`src/pages/`** – One file per route (Astro file-based routing)
- **`src/layouts/`** – Shared page shell (`BaseLayout.astro`)
- **`src/components/`** – Static `.astro` components and React island `.jsx` components
- **`src/lib/`** – Pure logic, covered by `node --test`
- **`src/data/`** – Static content data (nav links, project list)
- **`src/styles/`** – Global Sass (variables, mixins, themes)
- **`astro.config.mjs`** – Astro configuration
- **`package.json`** – Dependencies and scripts
- **`pnpm-lock.yaml`** – Lockfile

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/marcus-koch-fs-dev/marcuskoch-website.git
cd marcuskoch-website

# Install dependencies (pnpm required)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview the production build
pnpm preview
```
