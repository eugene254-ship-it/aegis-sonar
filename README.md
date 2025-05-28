# AEGIS Frontend Build

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/eugene254shipits-projects/v0-aegis-frontend-build)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/1MKWjMJ81lW)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/eugene254shipits-projects/v0-aegis-frontend-build](https://vercel.com/eugene254shipits-projects/v0-aegis-frontend-build)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/1MKWjMJ81lW](https://v0.dev/chat/projects/1MKWjMJ81lW)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

Absolutely! Below is a complete, professional-grade `README.md` for the **AEGIS frontend** project. It’s tailored for contributors, developers, or stakeholders who want to understand the purpose, setup, structure, and contribution process.

---

# 🌐 AEGIS Frontend

> **Ethical AI for Global Impact Systems**
> Resilient, offline-first dashboards powered by AI for ethical decision-making in public health, governance, and climate.

![AEGIS Logo]

---

## 🚀 Overview

**AEGIS** is a decentralized, progressive web app (PWA) designed to support **ethical and transparent decision-making** across sectors like public health, climate resilience, and governance. This frontend connects to powerful AI reasoning systems via the **Perplexity Sonar API**, enabling users to ask complex questions and get **traceable, cited, context-aware answers.**

Built for everyone — from rural health officers to national policy teams — AEGIS functions **online and offline** with a clean, modular UI.

---

## 🧩 Key Features

* 🔍 **Sonar Deep Research** for contextual long-form answers
* 🧠 **Reasoning Pro** for policy simulation and chain-of-thought analysis
* 🌐 **Internet Search + Citations** for real-time, sourced insights
* ⚡ **PWA & Offline Mode** with IndexedDB caching and Workbox
* 🧭 **Role-Based Dashboards**: Health, Environment, Governance
* 🔒 **Auth & Access Control** via Supabase
* 🌍 **Multilingual + Responsive** UI with TailwindCSS

---

## 🛠️ Tech Stack

| Layer             | Stack                                                                |
| ----------------- | -------------------------------------------------------------------- |
| Framework         | `React` + `Vite`                                                     |
| Language          | `TypeScript`                                                         |
| Styling           | `TailwindCSS`                                                        |
| State/Data        | `Zustand`, `SWR`, `IndexedDB`                                        |
| Offline           | `Workbox` + `PWA manifest`                                           |
| Auth              | `Supabase Auth`                                                      |
| Backend Connector | Node.js proxy for Sonar API                                          |
| Deployment        | Vercel                                                               |
| AI APIs           | `Perplexity Sonar (Deep Research, Reasoning Pro, Search + Citation)` |

---

## 📁 Folder Structure

```
📦aegis-frontend/
 ┣ 📂src/
 ┃ ┣ 📂components/        # Reusable UI elements
 ┃ ┣ 📂pages/             # Main views (Dashboards, AI panel)
 ┃ ┣ 📂hooks/             # Custom hooks (useOffline, useSonarQuery)
 ┃ ┣ 📂utils/             # API client, caching logic
 ┃ ┣ 📂contexts/          # App state providers (user, theme, cache)
 ┃ ┣ 📂assets/            # Icons, images
 ┃ ┗ 📂i18n/              # Internationalization files
 ┣ 📄workbox-config.js    # Service Worker config
 ┣ 📄manifest.json        # PWA Manifest
 ┣ 📄vite.config.ts       # Vite config
 ┣ 📄tailwind.config.js   # Tailwind theme setup
 ┣ 📄package.json
 ┗ 📄README.md
```

---

## ⚙️ Getting Started

### 📦 Install Dependencies

```bash
npm install
# or
yarn
```

### 🧪 Run Dev Server

```bash
npm run dev
```

### 🛫 Build for Production

```bash
npm run build
```

---

## 🔐 Environment Setup

Create a `.env` file:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
VITE_SONAR_API_PROXY=/api/sonar-query
```

> 🔐 API keys are stored server-side; never expose your Sonar API key in frontend code.

---

## 🧠 API Integration (Sonar)

Frontend communicates with a backend endpoint `/api/sonar-query`, which:

* Forwards queries to the appropriate **Sonar API** mode
* Handles authentication, error responses, and formatting
* Returns structured insights, citations, and reasoning steps

> Learn more in the [Backend Readme →](../backend/README.md)

---

## 📴 Offline-First Behavior

AEGIS includes:

* `IndexedDB` to cache past responses and queries
* `Workbox` service workers for background sync
* Connection status alerts and fallback UIs

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests (requires Cypress setup)
npm run cypress
```

---

## 🧑‍💻 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 🌍 License

Licensed under MIT.
Built with ❤️ for planetary and interstellar resilience.

---

## 🤝 Acknowledgements

* Perplexity AI — for Sonar’s transformative API
* Supabase — for auth and data services
* TailwindCSS — for UI scalability
* Workbox — for offline-first infrastructure

---

Let me know if you’d like a version of this for a mobile app wrapper, backend services, or internal dev wiki.

