# 🚀 Lalith Kumar — Personal Portfolio

A modern, responsive developer portfolio built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features smooth animations, glassmorphism design, and a clean dark-mode UI.

---

## ✨ Features

- ⚡ **Vite** — lightning-fast dev server and build tool
- ⚛️ **React 18** with TypeScript — functional components and hooks
- 🎨 **Tailwind CSS v3** — utility-first styling
- 🎭 **Framer Motion** — smooth page and scroll animations
- 🌑 Dark-mode-first glassmorphism design
- 📱 Fully responsive (mobile-first)
- 🔤 Google Fonts — Inter + JetBrains Mono
- 🧭 Sticky navbar with smooth scroll and active-section tracking
- 💬 Animated contact form

---

## 📋 Prerequisites

Make sure you have the following installed:

| Tool | Minimum version |
|------|----------------|
| [Node.js](https://nodejs.org/) | v18+ |
| npm | v9+ |

Verify your versions:

```bash
node -v
npm -v
```

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at **[http://localhost:5173](http://localhost:5173)** with Hot Module Replacement (HMR) enabled.

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the local dev server with HMR |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 🗂️ Project Structure

```
portfolio/
├── public/
│   └── favicon.svg           # Custom favicon
├── src/
│   ├── assets/
│   │   └── profile.jpg       # Profile photo
│   ├── components/
│   │   ├── Navbar.tsx        # Sticky nav with hamburger menu
│   │   ├── Hero.tsx          # Hero section with CTA buttons
│   │   ├── About.tsx         # About me + bio
│   │   ├── Skills.tsx        # Skills with animated progress bars
│   │   ├── Projects.tsx      # Project cards + GitHub links
│   │   ├── Contact.tsx       # Contact form
│   │   └── Footer.tsx        # Footer with scroll-to-top
│   ├── App.tsx               # Root component
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles + Tailwind directives
├── index.html                # HTML entry point with SEO meta tags
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.ts            # Vite configuration
└── tsconfig.app.json         # TypeScript configuration
```

---

## 🎨 Customization

### Update personal info
Edit the relevant component files inside `src/components/`:

- **Name / role / tagline** → `src/components/Hero.tsx`
- **Bio / highlights** → `src/components/About.tsx`
- **Skills and levels** → `src/components/Skills.tsx`
- **Projects** → `src/components/Projects.tsx`
- **Contact details** → `src/components/Contact.tsx`

### Replace profile photo
Drop your photo at `src/assets/profile.jpg` (any JPG/PNG works — Vite handles the import).

### Theme colors
Colors are defined in `tailwind.config.js` under `theme.extend.colors`. The primary accent is `#6366f1` (indigo) and the secondary is `#06b6d4` (cyan).

---

## 🚀 Deploying

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag & drop the `dist/` folder to netlify.com
```

### GitHub Pages

```bash
npm run build
# Push the `dist/` folder contents to your `gh-pages` branch
```

---

## 🧰 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS v3 | Utility-first styling |
| Framer Motion | Animations |
| Lucide React | Icon set |
| Vite | Build tool / dev server |

---

## 📄 License

MIT © [Lalith Kumar](https://github.com/yourusername)
