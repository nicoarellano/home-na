<div align="center">
  <br />
  <img src="public/images/cdt-logo-stroke.svg" alt="Collab Digital Twins Logo" height="72" />
  <br /><br />

  <h1>CDT HOME</h1>

  <p><strong>The public face of Collab Digital Twins</strong></p>

  <p>
    <a href="https://collabdt.org">Website</a> ·
    <a href="https://docs.google.com/forms/d/e/1FAIpQLScB12Qc7khiOk4a_E753jDccx6026AjO-_FINBKoZZZtkmqnA/viewform" target="_blank" rel="noopener">Beta Access</a> ·
    <a href="https://collabdt.org/privacypolicy">Privacy Policy</a> ·
    <a href="https://collabdt.org/cookiepolicy">Cookie Policy</a>
  </p>

  <br />

  <img src="https://img.shields.io/badge/license-AGPL%203.0-orange?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/platform-web-orange?style=flat-square" alt="Platform" />
  <img src="https://img.shields.io/badge/i18n-EN%20%C2%B7%20FR%20%C2%B7%20ES-orange?style=flat-square" alt="Internationalized" />
  <img src="https://img.shields.io/badge/not--for--profit-Canadian-orange?style=flat-square" alt="Canadian not-for-profit" />

  <br /><br />

  <img src="https://img.shields.io/badge/Next.js%2015-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React%2019-20232a?style=flat-square&logo=react&logoColor=61dafb" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />

  <br /><br />
  <hr />
  <br />
</div>

## About

`cdt-home` is the standalone marketing site for **Collab Digital Twins** — the landing page, story, contributors, and contact entry-point for the broader CDT platform. It is built to run on its own, deploy anywhere a modern Node.js runtime is available, and read as the first impression of the project.

Collab Digital Twins is the technology that powers web-based, non-proprietary platforms for the visualization and interaction of multi-scale geospatial information systems (GIS), open data, open building information modelling (BIM), and a wide range of other digital media — including text, images, animated and static 3D models, IFCs, and point clouds. CDT is stewarded by [Collab Digital Twins](https://collabdt.org), a Canadian not-for-profit established to promote openness, innovation, and long-term public benefit. Our mission is to **democratize digital twin technologies**.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, `output: 'standalone'`) |
| UI runtime | React 19 |
| Styling | Tailwind CSS 3 + `tailwindcss-animate` |
| Motion | Framer Motion |
| Icons | lucide-react |
| Toasts | sonner |
| Internationalization | `next-intl` (cookie-based locale — EN · FR · ES) |
| Mail | nodemailer (contact form) |
| Media hosting | MinIO (hero video, background image) |
| Container | Multi-stage Dockerfile, standalone Node server |

---

## Local development

```bash
npm install
cp .env.example .env.local   # fill in SMTP if you want the contact form to send mail
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Turbopack dev server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Next.js / ESLint check. |
| `npm run check-types` | TypeScript no-emit type check. |

---

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_FROM` | yes (for `/api/contact`) | SMTP credentials for nodemailer. Port defaults to `465` (TLS). |
| `CONTACT_RECIPIENT` | no | Address that receives form submissions. Defaults to `info@collabdt.org`. |
| `MINIO_BUCKET_URL` | yes | Base URL of the public MinIO bucket that hosts `cdt-homepage/cdt-demo-home.mp4` and `home-bg.png`. Server-side only (no `NEXT_PUBLIC_` prefix) — read in `src/app/page.tsx` and passed down via props so the URL is not inlined into the client bundle. Background falls back to `public/images/homepage/home-bg.png` when unset. |

---

## Internationalization

- Messages live in `src/i18n/messages/{en,fr,es}.json` under the `HomePage` namespace.
- Locale is selected via the `NEXT_LOCALE` cookie (`En` / `Fr` / `Es`). The navbar's language toggle writes that cookie and calls `router.refresh()`.
- No middleware required; resolution is server-side via `src/i18n/getUserLocale.ts`.

---

## Project layout

```
home/
  src/
    app/                       # Next.js App Router entry
      layout.tsx
      page.tsx                 # reads MINIO_BUCKET_URL server-side, passes via props
      api/contact/route.ts     # POST handler that calls sendEmail()
      cookiepolicy/page.tsx
      privacypolicy/page.tsx
    components/
      home/                    # page sections (Hero, About, Contributors, Contact, Footer, Navbar, Deployment)
      policy/                  # PolicyLayout + policy.css (shared by cookiepolicy & privacypolicy)
      ui/                      # UI primitives (Button, Card, Input, Textarea, LanguageToggle, CdtIcon, AnimatedBackground)
    i18n/
      config.ts
      request.ts
      getUserLocale.ts
      messages/{en,fr,es}.json
    lib/
      email.ts                 # nodemailer wrapper
      language.ts              # Language enum
      utils.ts                 # cn() classname helper
    styles/
      globals.css              # Tailwind base + shadcn theme tokens
      sovereign-tokens.css     # CSS variables for the "Sovereign Architect" design system
      home.css                 # home-specific component classes (tonal-card, btn-sovereign, hp-input, marquee, ...)
  public/
    favicon.ico
    images/                    # logos, OG card, homepage assets, team photos
  Dockerfile                   # multi-stage build, runs `node server.js` (standalone output)
  next.config.ts               # output: 'standalone', wrapped with createNextIntlPlugin
```

---

## Deployment

### Vercel / Netlify

`npm run build` produces a standard Next.js build. Set the SMTP env vars and deploy.

### Docker

```bash
docker build -t cdt-home .
docker run -p 3000:3000 --env-file .env.local cdt-home
```

The `output: 'standalone'` config in `next.config.ts` keeps the runtime image small — no dev dependencies, no source files shipped to the container.

---

## Relationship to `cdt-na`

This app was extracted from `../cdt-na/src/app/home` and made self-contained. The originals there can still serve the home page inside the monorepo; this copy is intended to live in its own repository going forward. UI primitives originally imported from `cdt-na/src/core` were copied verbatim into `src/components/ui` so this app has no path-based dependency on `cdt-na`.

---

## Contributing

We welcome community contributions.

Any contribution intentionally submitted for inclusion in a Collab Digital Twins project shall comply with the standard licensing model (**AGPL 3.0**).

### License

GNU Affero General Public License v3.0 — <https://www.gnu.org/licenses/agpl-3.0.en.html>

---

## Beta Access

To participate in the beta, complete the short **[beta access form](https://docs.google.com/forms/d/e/1FAIpQLScB12Qc7khiOk4a_E753jDccx6026AjO-_FINBKoZZZtkmqnA/viewform)**. We review submissions and contact you with onboarding details.

---

<div align="center">
  <sub>Stewarded by a Canadian not-for-profit organization for long-term public benefit.</sub>
</div>
