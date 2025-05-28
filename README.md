
# 🌐 AEGIS Frontend

> **Ethical AI for Global Impact Systems**
> Resilient, offline-first dashboards powered by AI for ethical decision-making in public health, governance, and climate.

🚀 Overview
AEGIS is a decentralized, progressive web app (PWA) designed to support ethical and transparent decision-making across sectors like public health, climate resilience, and governance. This frontend connects to powerful AI reasoning systems via the Perplexity Sonar API, enabling users to ask complex questions and get traceable, cited, context-aware answers.

Built for everyone — from rural health officers to national policy teams — AEGIS functions online and offline with a clean, modular UI.

🔗 Live Application: https://www.aegis.rocks
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
