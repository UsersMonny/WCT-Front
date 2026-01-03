# File Structure Guide

## Source Code Organization

```
nextfromstatic/
│
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout (wraps all pages)
│   │   ├── page.js                # Home page (/
│   │   ├── globals.css            # Tailwind globals
│   │   ├── styles.css             # Migrated custom CSS
│   │   │
│   │   ├── login/
│   │   │   └── page.js            # Login page (/login)
│   │   │
│   │   ├── signup/
│   │   │   └── page.js            # Sign up page (/signup)
│   │   │
│   │   ├── settings/
│   │   │   └── page.js            # Settings page (/settings)
│   │   │
│   │   ├── job-alerts/
│   │   │   └── page.js            # Job alerts page (/job-alerts)
│   │   │
│   │   ├── job-detail/
│   │   │   └── page.js            # Job detail page (/job-detail)
│   │   │
│   │   ├── admin-dashboard/
│   │   │   └── page.js            # Admin dashboard (/admin-dashboard)
│   │   │
│   │   ├── contact-us/
│   │   │   └── page.js            # Contact form (/contact-us)
│   │   │
│   │   ├── faq/
│   │   │   └── page.js            # FAQ page (/faq)
│   │   │
│   │   ├── how-it-works/
│   │   │   └── page.js            # How it works (/how-it-works)
│   │   │
│   │   ├── privacy-policy/
│   │   │   └── page.js            # Privacy policy (/privacy-policy)
│   │   │
│   │   └── terms-of-service/
│   │       └── page.js            # Terms of service (/terms-of-service)
│   │
│   └── components/
│       └── Navbar.js              # Shared navigation component
│
├── public/
│   ├── ahchip.png                 # Logo
│   ├── signin.png                 # Login page image
│   ├── noprofile.png              # Placeholder images
│   └── sign up.jpg                # Signup page image
│
├── .next/                         # Build output (generated)
├── node_modules/                  # Dependencies (generated)
│
├── package.json                   # Project metadata and scripts
├── package-lock.json              # Dependency lock file
├── next.config.mjs                # Next.js configuration
├── tailwind.config.mjs            # Tailwind CSS configuration
├── postcss.config.mjs             # PostCSS configuration
├── eslint.config.mjs              # ESLint configuration
├── jsconfig.json                  # JavaScript path aliases
│
├── MIGRATION_GUIDE.md             # Detailed migration documentation
├── QUICKSTART.md                  # Quick start instructions
├── CONVERSION_COMPLETE.md         # This conversion summary
├── README.md                       # Default Next.js README
└── .gitignore                      # Git ignore file
```

## Key Files Explained

### Layout Files
- **`layout.js`** - Root layout that wraps all pages with HTML structure, fonts, and meta tags

### Page Files
- **`page.js`** files are the actual page content for each route
- Each folder in `app/` becomes a route (e.g., `app/login/page.js` → `/login`)

### Component Files
- **`Navbar.js`** - Reusable navigation component imported in every page

### Configuration Files
- **`next.config.mjs`** - Next.js settings
- **`tailwind.config.mjs`** - Tailwind CSS customization
- **`package.json`** - Dependencies and scripts
- **`jsconfig.json`** - Path aliases (e.g., `@/components`)

### Styling
- **`globals.css`** - Tailwind CSS globals
- **`styles.css`** - Original CSS migrated from your static site

## How Routing Works

When you create a file structure like this:

```
src/app/
  page.js           → http://localhost:3000/
  login/page.js     → http://localhost:3000/login
  signup/page.js    → http://localhost:3000/signup
  settings/page.js  → http://localhost:3000/settings
```

The URL is automatically generated based on the folder structure!

## Component Import Path

Notice the `@/` alias in imports:

```javascript
import Navbar from '@/components/Navbar';
```

This is configured in `jsconfig.json` and means:
- `@/` = `src/`
- So `@/components` = `src/components`

## Adding New Pages

To add a new page:

1. Create a new folder in `src/app/`
2. Add a `page.js` file inside
3. Write your component and export it

Example:
```bash
# Create a new "About" page
mkdir src/app/about
# Create file: src/app/about/page.js
```

Then it's automatically available at `/about`!

## Building & Deployment

### Development Files
- `src/` folder contains your source code
- `public/` folder contains static assets
- Everything else is generated/configuration

### Build Output
- `.next/` folder is generated during build
- Contains optimized, production-ready code
- Not needed in version control (added to `.gitignore`)

### Deployment
When you deploy:
1. Push code to Git (src/, public/, config files)
2. Build system runs `npm run build`
3. `.next/` folder is generated
4. Only `.next/` and `public/` are deployed to server

## File Size Reference

```
src/app/
├── page.js                    ~2KB   (Home page)
├── login/page.js              ~3KB   (Login page)
├── signup/page.js             ~3KB   (Signup page)
├── settings/page.js           ~2KB   (Settings page)
├── admin-dashboard/page.js    ~2KB   (Admin page)
├── job-alerts/page.js         ~2KB   (Alerts page)
├── job-detail/page.js         ~2KB   (Detail page)
├── contact-us/page.js         ~2KB   (Contact page)
├── faq/page.js                ~2KB   (FAQ page)
├── how-it-works/page.js       ~2KB   (How it works)
├── privacy-policy/page.js     ~2KB   (Privacy)
├── terms-of-service/page.js   ~2KB   (Terms)
└── styles.css                 ~30KB  (Styling)

components/
└── Navbar.js                  ~4KB   (Navigation)

Total Source: ~63KB (minuscule!)
```

## Quick Navigation Guide

| Need to... | File to Edit |
|-----------|--------------|
| Change a page | `src/app/[page]/page.js` |
| Edit navigation | `src/components/Navbar.js` |
| Add styles | `src/app/styles.css` |
| Change colors/theme | `tailwind.config.mjs` |
| Add new page | Create `src/app/[name]/page.js` |
| Add images | Put in `public/` folder |
| Change title/meta | `src/app/layout.js` |

---

This structure makes it easy to:
- Find files quickly
- Add new pages (just create a folder!)
- Maintain code (all related files together)
- Scale the application
