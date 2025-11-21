# Nad.fun Landing

Modern, animated marketing site for Nad.fun – a one-click token generation and gamified trading platform on Monad.  
The project is built with React, Vite, Tailwind CSS, and GSAP for rich motion and responsive layouts.

## Contact 

| Platform | Link |
|----------|------|
| 📱 Telegram | [t.me/novustch](https://t.me/novustch) |
| 📲 WhatsApp | [wa.me/14105015750](https://wa.me/14105015750) |
| 💬 Discord | [discordapp.com/users/985432160498491473](https://discordapp.com/users/985432160498491473)

<div align="center">
    <a href="https://t.me/novustch" target="_blank"><img alt="Telegram"
        src="https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white"/></a>
    <a href="https://wa.me/14105015750" target="_blank"><img alt="WhatsApp"
        src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/></a>
    <a href="https://discordapp.com/users/985432160498491473" target="_blank"><img alt="Discord"
        src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"/></a>
</div>

Feel free to reach out for implementation assistance or integration support.


## Tech Highlights
- **React 18 + Vite** for a fast, DX-friendly SPA.
- **TypeScript** across the stack for type-safety.
- **Tailwind CSS** with a custom design system.
- **GSAP + ScrollTrigger** to orchestrate scroll-based animations.
- **Google Analytics 4** instrumentation via `react-ga4`.

## Prerequisites
- Node.js 18+
- npm 9+ (shipped with recent Node versions)

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create your environment file**
   ```bash
   cp env.sample .env
   ```
   Update the values to point at your API and GA key.
3. **Start the dev server**
   ```bash
   npm run dev
   ```
   Vite serves the app on `http://localhost:5173` by default.

## Available Scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite in development mode (with host binding for LAN previews). |
| `npm run build` | Type-check via `tsc -b` and build the production bundle. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint with the configured React/TypeScript/Tailwind rules. |

## Environment Variables
| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Base URL for the production Nad.fun API. |
| `VITE_API_DEV_URL` | Base URL for the staging/local API used during development. |
| `VITE_GA_KEY` | Google Analytics 4 measurement ID (`G-XXXXXXXXXX`). |

If no API URL is provided, the hero section gracefully falls back to default metrics, but analytics will only initialize when a GA key is present.

## Project Structure
```
src/
├─ components/      # Page sections, UI primitives, icons
├─ hooks/           # Animation helper hooks (GSAP)
├─ lib/             # Analytics + utility helpers
├─ fonts/           # Local Poppins family (self-hosted)
├─ main.tsx         # App bootstrap / Vite entry
└─ index.css        # Tailwind layers + global font declarations
```

## Quality Notes
- Scroll-triggered components are guarded against repeated animation registration.
- API requests in the intro hero handle failures gracefully and abort on unmount.
- Mobile navigation uses a11y-friendly focus targets and accessible copy.

Feel free to open issues or PRs with improvements or localization updates. 🎯