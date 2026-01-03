# AhhChip - Next.js Conversion Guide

## Overview
This is a Next.js conversion of the static HTML/CSS/JavaScript AhhChip portfolio application. The project has been successfully migrated from vanilla HTML to a modern React-based Next.js framework.

## Project Structure

```
nextfromstatic/
├── src/
│   ├── app/
│   │   ├── (pages)/
│   │   │   ├── page.js          # Home page
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── settings/
│   │   │   ├── job-alerts/
│   │   │   ├── admin-dashboard/
│   │   │   ├── job-detail/
│   │   │   ├── contact-us/
│   │   │   ├── faq/
│   │   │   ├── privacy-policy/
│   │   │   ├── terms-of-service/
│   │   │   ├── how-it-works/
│   │   │   ├── layout.js        # Root layout
│   │   │   └── globals.css
│   │   └── styles.css           # Migrated from original project
│   └── components/
│       └── Navbar.js            # Navigation component
├── public/
│   ├── ahchip.png               # Logo
│   ├── signin.png
│   ├── noprofile.png
│   └── sign up.jpg
├── package.json
├── next.config.mjs
├── tailwind.config.mjs
└── README.md
```

## Key Features

### Authentication
- **Demo Accounts**:
  - User: `user@demo.com` / `user123`
  - Admin: `admin@demo.com` / `admin123`
- Password visibility toggle
- Social login buttons (demo mode)
- Session management using localStorage

### Pages Implemented
1. **Home** (`/`) - Main dashboard with CV management and job listings
2. **Login** (`/login`) - User authentication
3. **Signup** (`/signup`) - New account creation
4. **Settings** (`/settings`) - User preferences and notification settings
5. **Job Alerts** (`/job-alerts`) - Notifications for new job postings
6. **Admin Dashboard** (`/admin-dashboard`) - Admin control panel
7. **Job Detail** (`/job-detail`) - Detailed job information
8. **Contact Us** (`/contact-us`) - Contact form
9. **FAQ** (`/faq`) - Frequently asked questions
10. **Privacy Policy** (`/privacy-policy`) - Privacy information
11. **Terms of Service** (`/terms-of-service`) - Terms and conditions
12. **How It Works** (`/how-it-works`) - Platform guide

### Components
- **Navbar** - Responsive navigation with dropdown menus and user profile
- Page-specific components for each route

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
cd nextfromstatic
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Production Build
```bash
npm run build
npm start
```

## Migration Highlights

### What Changed
1. **HTML → React Components**: All HTML pages converted to React functional components
2. **Vanilla JS → React Hooks**: 
   - `useState` for state management
   - `useEffect` for lifecycle operations
   - `useRouter` for client-side navigation
3. **CSS Framework**: Tailwind CSS included (can be extended)
4. **Routing**: Next.js App Router for file-based routing
5. **Authentication**: LocalStorage-based session management (for demo)

### CSS Migration
- Original `styles.css` copied to `src/app/styles.css`
- All CSS variables and styling preserved
- Tailwind CSS configured alongside custom CSS

### JavaScript Features
- Password toggle functionality converted to React state
- Form validation using React
- Modal dialogs using conditional rendering
- Dropdown menus with React event handlers

## API Structure (Ready for Backend Integration)

The application is ready to connect to a backend API. Currently uses localStorage for demo. To integrate with a backend:

1. **Authentication endpoints** needed:
   - `POST /api/auth/login`
   - `POST /api/auth/signup`
   - `POST /api/auth/logout`

2. **Job endpoints** needed:
   - `GET /api/jobs`
   - `GET /api/jobs/:id`
   - `POST /api/jobs/:id/apply`

3. **User endpoints** needed:
   - `GET /api/users/profile`
   - `PUT /api/users/profile`
   - `GET /api/users/settings`

## Environment Variables

Create a `.env.local` file for environment-specific variables:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
```bash
npm run build
# Deploy the `.next` directory
```

## Next Steps

1. **Backend Integration**: Connect to your API
2. **Database Setup**: Implement persistent user storage
3. **Real Authentication**: Replace localStorage with proper authentication
4. **Image Optimization**: Replace placeholder images with real ones
5. **Testing**: Add unit and integration tests
6. **Styling**: Customize Tailwind theme if needed

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License
See original project for license information.

## Support
For issues or questions, please refer to the contact-us page in the application.
