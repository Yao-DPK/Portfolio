Below is a **complete, no-nonsense, step-by-step guide** to setting up a **modern React application**, with **examples**, **best practices**, and **official resources**.
I’ll be **brutally honest** where tools or approaches are outdated or bad practice.

This guide uses **Vite + React**, which is **the current recommended approach**.
If someone tells you to start with `create-react-app`, they are behind. Period.

---

# 🚀 React App Setup Guide (Modern, Clean, Production-Ready)

## 0. Prerequisites (Don’t Skip This)

You **must** have:

* **Node.js ≥ 18**
* **npm** (comes with Node) or **pnpm / yarn**

### Check versions

```bash
node -v
npm -v
```

👉 If Node is outdated, install from:
[https://nodejs.org/en/download](https://nodejs.org/en/download)

**Why this matters:**
React tooling depends heavily on modern ES features. Old Node versions = broken builds.

---

## 1. Create a New React App (Using Vite)

### Why Vite?

* Faster dev server
* Smaller bundles
* Officially recommended by React
* No hidden magic

### Create the project

```bash
npm create vite@latest my-react-app
```

When prompted:

```
✔ Select a framework: React
✔ Select a variant: React + JavaScript (or TypeScript if you’re serious)
```

Then:

```bash
cd my-react-app
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

✅ You now have a working React app.

---

## 2. Project Structure (Understand This or You’ll Suffer Later)

Default structure:

```
my-react-app/
├─ index.html
├─ package.json
├─ vite.config.js
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ index.css
   └─ assets/
```

### What matters:

* **main.jsx** → entry point
* **App.jsx** → root component
* **index.html** → single HTML file (SPA)

---

## 3. How React Actually Starts (Critical Understanding)

### `main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### `index.html`

```html
<div id="root"></div>
```

React:

1. Finds `#root`
2. Mounts `<App />`
3. Manages everything inside it

If you don’t understand this, debugging React will be painful.

---

## 4. Your First Real Component

### `src/App.jsx`

```jsx
function App() {
  return (
    <div>
      <h1>Hello React 👋</h1>
      <p>This is my first React app.</p>
    </div>
  )
}

export default App
```

React components:

* Are **functions**
* Return **JSX**
* Must start with a **capital letter**

---

## 5. JSX Rules (People Break These Constantly)

❌ Invalid:

```jsx
return (
  <h1>Hi</h1>
  <p>Oops</p>
)
```

✅ Valid:

```jsx
return (
  <>
    <h1>Hi</h1>
    <p>Works</p>
  </>
)
```

or

```jsx
return (
  <div>
    <h1>Hi</h1>
    <p>Works</p>
  </div>
)
```

---

## 6. Props (Component Communication)

### Example Component

```jsx
function Greeting({ name }) {
  return <h2>Hello {name}</h2>
}
```

### Usage

```jsx
<Greeting name="Pyke" />
```

Props:

* Are **read-only**
* Flow **parent → child**
* Mutating props = bad design

---

## 7. State (The Heart of React)

### Using `useState`

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

❗ Brutal truth:

* If you don’t understand **state**, you don’t understand React.
* State updates are **asynchronous**
* Never mutate state directly

❌ Wrong:

```js
count++
```

✅ Correct:

```js
setCount(count + 1)
```

---

## 8. Styling (What Actually Works)

### Option 1: Plain CSS (Recommended at Start)

```css
/* index.css */
body {
  font-family: sans-serif;
}
```

### Option 2: CSS Modules

```jsx
import styles from './App.module.css'

<h1 className={styles.title}>Hello</h1>
```

### Option 3: Tailwind (Advanced)

[https://tailwindcss.com/docs/guides/vite](https://tailwindcss.com/docs/guides/vite)

⚠️ Avoid styled-components early unless you know why you need it.

---

## 9. File Organization (Don’t Let It Rot)

A sane structure:

```
src/
├─ components/
│  ├─ Button.jsx
│  └─ Counter.jsx
├─ pages/
│  └─ Home.jsx
├─ hooks/
├─ services/
├─ App.jsx
└─ main.jsx
```

Bad structure = unmaintainable app.

---

## 10. Linting & Formatting (Professional Setup)

### Install ESLint

```bash
npm install -D eslint
npm init @eslint/config
```

### Install Prettier

```bash
npm install -D prettier
```

Why?

* Prevents bugs
* Enforces consistency
* Saves time arguing in code reviews

---

## 11. Build for Production

```bash
npm run build
```

Output:

```
dist/
```

Deploy this folder to:

* Vercel
* Netlify
* Cloudflare Pages

---

## 12. What NOT to Do (Hard Truths)

❌ Don’t use `create-react-app`
❌ Don’t overuse `useEffect`
❌ Don’t store everything in state
❌ Don’t ignore React DevTools

---

## 13. Official Resources (Verified & Trustworthy)

### React

* Official Docs (NEW):
  [https://react.dev](https://react.dev)
* React Hooks:
  [https://react.dev/reference/react](https://react.dev/reference/react)

### Vite

* Vite Docs:
  [https://vitejs.dev/guide/](https://vitejs.dev/guide/)

### JavaScript (Mandatory Knowledge)

* MDN JavaScript Guide:
  [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Best Practices

* React Patterns:
  [https://reactpatterns.com/](https://reactpatterns.com/)
* Bulletproof React Architecture:
  [https://github.com/alan2207/bulletproof-react](https://github.com/alan2207/bulletproof-react)

---

## 14. What You Should Learn Next (In Order)

1. `useEffect`
2. Controlled forms
3. React Router
4. Context API
5. TypeScript
6. Testing (Vitest + Testing Library)

---

Below is an **additional, complete deployment section** you can **append directly** to the markdown guide.
No fluff, no fake “one-click magic” promises — this is how deployment **actually works** in practice.

---

## 15. Deployment (From Local App to Production)

### Core Principle (Read This First)

A React app **does not run on a server**.
It is **compiled into static files** (HTML, CSS, JS) and then **served**.

If you don’t understand this, deployment will always feel like black magic.

---

## 15.1 Build the Application (Mandatory Step)

Before deploying **anywhere**, you must build:

```bash
npm run build
```

This creates:

```
dist/
├─ index.html
├─ assets/
│  ├─ index-xxxxx.js
│  └─ index-xxxxx.css
```

⚠️ **Important truths**

* You deploy the **`dist/` folder**
* You never deploy `src/`
* You never deploy `node_modules`

---

## 15.2 Deployment Options (What’s Actually Worth Using)

### ✅ Option 1: Vercel (Best DX for React)

**Pros**

* Zero config
* Automatic HTTPS
* Perfect for SPAs
* Fast global CDN

**Cons**

* Vendor lock-in
* Advanced features cost money

#### Steps

1. Push your project to GitHub
2. Go to: [https://vercel.com](https://vercel.com)
3. Import repository
4. Framework preset: **Vite**
5. Build command:

   ```bash
   npm run build
   ```
6. Output directory:

   ```
   dist
   ```

Deploy.

📌 Official docs:
[https://vercel.com/docs/frameworks/vite](https://vercel.com/docs/frameworks/vite)

---

### ✅ Option 2: Netlify (Very Solid Alternative)

**Pros**

* Stable
* Good free tier
* Simple config

**Cons**

* Slightly slower builds than Vercel

#### Steps

1. Push to GitHub
2. Go to: [https://www.netlify.com](https://www.netlify.com)
3. New site → Import from Git
4. Build command:

   ```bash
   npm run build
   ```
5. Publish directory:

   ```
   dist
   ```

📌 Official docs:
[https://docs.netlify.com/frameworks/vite/](https://docs.netlify.com/frameworks/vite/)

---

### ✅ Option 3: Cloudflare Pages (Fastest CDN)

**Pros**

* Extremely fast
* Excellent global caching
* Cheap at scale

**Cons**

* Less beginner-friendly UI

#### Steps

1. Push to GitHub
2. Go to: [https://pages.cloudflare.com](https://pages.cloudflare.com)
3. Create project
4. Framework preset: **Vite**
5. Build command:

   ```bash
   npm run build
   ```
6. Output directory:

   ```
   dist
   ```

📌 Official docs:
[https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite-site/](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite-site/)

---

## 15.3 Client-Side Routing (This Breaks Most Deployments)

If you use **React Router**, refreshing a page like:

```
/dashboard
```

will **404** unless configured.

### Fix for Vercel

Create `vercel.json`:

```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/" }
  ]
}
```

### Fix for Netlify

Create `public/_redirects`:

```
/*    /index.html   200
```

### Fix for Cloudflare Pages

Add `_routes.json`:

```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": []
}
```

❗ If routing breaks, **this is why**.

---

## 15.4 Environment Variables (Correct Way)

### Local (`.env`)

```env
VITE_API_URL=https://api.example.com
```

### Access in code

```js
const apiUrl = import.meta.env.VITE_API_URL
```

⚠️ Rules you must respect:

* Variables **must** start with `VITE_`
* Never put secrets (API keys) in frontend envs
* Everything here is **public**

📌 Official docs:
[https://vitejs.dev/guide/env-and-mode.html](https://vitejs.dev/guide/env-and-mode.html)

---

## 15.5 Custom Domain Setup

All platforms support:

* Custom domains
* HTTPS (automatic)
* Subdomains

Steps are always:

1. Add domain in platform UI
2. Update DNS records
3. Wait for SSL

Nothing React-specific here.

---

## 15.6 Performance Checklist (Before Shipping)

Before calling it “done”:

* ✅ `npm run build` without warnings
* ✅ Lighthouse score > 90
* ✅ No console errors
* ✅ Assets are hashed
* ✅ Images optimized
* ✅ `.env` not committed

---

## 15.7 What NOT to Do in Deployment

❌ Don’t deploy `src/`
❌ Don’t use Express just to serve React
❌ Don’t store secrets in frontend
❌ Don’t ignore routing rewrites
❌ Don’t assume dev behavior = prod behavior

---

## 15.8 Deployment Is Not DevOps Magic

If deployment feels confusing:

* You don’t understand **static hosting**
* Or you don’t understand **build steps**

Fix that — not the platform.

---

### Verified Sources

* React Official Docs: [https://react.dev](https://react.dev)
* Vite Deployment Guide: [https://vitejs.dev/guide/static-deploy.html](https://vitejs.dev/guide/static-deploy.html)
* Vercel Vite Docs: [https://vercel.com/docs/frameworks/vite](https://vercel.com/docs/frameworks/vite)
* Netlify Vite Docs: [https://docs.netlify.com/frameworks/vite/](https://docs.netlify.com/frameworks/vite/)
* Cloudflare Pages Vite Guide: [https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite-site/](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite-site/)

---

If you want next:

* **Docker-based deployment**
* **CI/CD with GitHub Actions**
* **Backend + React deployment**
* **Real production checklist**

Say it.

