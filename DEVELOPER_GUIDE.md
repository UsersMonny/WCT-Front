# AhhChip Developer Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Frontend (Next.js)
```bash
cd nextfromstatic
npm install
npm run dev
# Open http://localhost:3000
```

### Backend (Express) - When Ready
```bash
mkdir backend
cd backend
npm init -y
npm install express pg bcryptjs jsonwebtoken cors dotenv
npm install -D nodemon
```

---

## 📁 Project Structure

```
nextfromstatic/
├── src/
│   ├── app/
│   │   ├── page.js           # Home page with jobs grid
│   │   ├── login/page.js     # Login page
│   │   ├── signup/page.js    # Signup page
│   │   ├── job-detail/page.js
│   │   ├── settings/page.js
│   │   ├── admin-dashboard/page.js
│   │   ├── styles.css        # Main stylesheet (5000+ lines)
│   │   └── layout.js         # Root layout with metadata
│   └── components/
│       └── Navbar.js         # Navigation component
├── public/               # Static assets
├── next.config.mjs
├── tailwind.config.mjs
└── jsconfig.json

backend/ (To be created)
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── jobs.js          # Job CRUD endpoints
│   ├── users.js         # User management
│   ├── resumes.js       # Resume management
│   ├── matches.js       # Job matching
│   └── alerts.js        # Job alerts
├── models/
│   ├── db.js            # Database setup
│   ├── User.js
│   ├── Job.js
│   ├── Resume.js
│   └── ...
├── middleware/
│   ├── auth.js          # JWT verification
│   └── errorHandler.js
├── services/
│   ├── emailService.js  # Email notifications
│   ├── matchingService.js # ML matching
│   └── crawlerService.js
├── utils/
│   └── constants.js
├── .env                 # Environment variables
└── server.js            # Entry point
```

---

## 🔑 Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 16 | React framework with SSR |
| Frontend | React 19 | UI components |
| Frontend | Tailwind CSS | Styling |
| Backend | Express | REST API server |
| Database | PostgreSQL | Primary data store |
| Cache | Redis | Session/cache layer |
| ML | scikit-learn/TensorFlow | Job matching |
| File Storage | AWS S3 or Local | Resume storage |
| Email | Nodemailer/SendGrid | Notifications |
| Scheduling | node-cron or Bull | Periodic tasks |
| Auth | JWT + OAuth2 | User authentication |

---

## 🔐 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ahhchip
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760  # 10MB

# Redis (optional)
REDIS_URL=redis://localhost:6379

# AWS S3 (optional)
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=your_bucket
```

---

## 📊 Database Schema

### users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  profile_photo VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',  -- 'user', 'admin'
  google_id VARCHAR(255),
  facebook_id VARCHAR(255),
  bio TEXT,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### jobs
```sql
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  company_name VARCHAR(255) NOT NULL,
  company_logo VARCHAR(255),
  location VARCHAR(255),
  job_type VARCHAR(50),  -- 'Full-Time', 'Part-Time', 'Contract'
  salary_min INTEGER,
  salary_max INTEGER,
  skills_required JSON,
  experience_required VARCHAR(100),
  posted_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### resumes
```sql
CREATE TABLE resumes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  file_path VARCHAR(255),
  file_name VARCHAR(255),
  file_size INTEGER,
  parsed_data JSONB,  -- Skills, experience, education
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### saved_jobs
```sql
CREATE TABLE saved_jobs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, job_id)
);
```

---

## 🔗 Key API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login with email
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/facebook` - Facebook OAuth
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token

### Jobs
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create job (admin)
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job (admin)
- `DELETE /api/jobs/:id` - Delete job (admin)
- `GET /api/jobs/search?q=keyword` - Search jobs

### Resumes
- `POST /api/resumes` - Upload resume
- `GET /api/resumes` - List user's resumes
- `DELETE /api/resumes/:id` - Delete resume

### Job Matching
- `GET /api/matches/recommendations` - Get matched jobs
- `GET /api/matches/job/:jobId` - Match score for job

### Alerts
- `POST /api/alerts` - Create job alert
- `GET /api/alerts` - List user's alerts
- `DELETE /api/alerts/:id` - Delete alert

---

## 🎯 Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/job-alerts

# Make changes, test locally
npm run dev  # Frontend
npm run dev  # Backend (in separate terminal)

# Commit with descriptive message
git add .
git commit -m "feat: implement job alerts API"

# Push and create PR
git push origin feature/job-alerts
```

### 2. Frontend Testing
```bash
# Manual browser testing
# http://localhost:3000 - Dev server with hot reload

# Build for production
npm run build

# Start production build locally
npm start
```

### 3. Backend Testing
```bash
# Test with Postman or curl
curl -X GET http://localhost:5000/api/jobs

# Backend should run on port 5000
# Frontend connects to it via NEXT_PUBLIC_API_URL
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` in both frontend and backend |
| "Connection refused on :5000" | Backend not running; start with `npm run dev` |
| "CORS error" | Check backend CORS config matches frontend URL |
| "JWT expired" | Implement refresh token logic in auth service |
| "File upload fails" | Check MAX_FILE_SIZE and UPLOAD_DIR permissions |
| Styling not loading | Clear `.next` folder: `rm -r .next` then rebuild |

---

## 📱 Component Integration Example

### Adding a new page
```javascript
// src/app/new-page/page.js
'use client';
import { useState, useEffect } from 'react';

export default function NewPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch from backend API
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/endpoint`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* Page content */}
    </div>
  );
}
```

---

## 📦 Deployment Checklist

- [ ] Environment variables set in production
- [ ] Database migrations run
- [ ] Frontend built (`npm run build`)
- [ ] Backend compiled and running
- [ ] SSL certificate installed
- [ ] Rate limiting configured
- [ ] Error tracking (Sentry) enabled
- [ ] Logging configured
- [ ] Backups automated
- [ ] Monitoring setup

---

## 📚 Documentation Files

- `IMPLEMENTATION_CHECKLIST.md` - Phase-by-phase tasks
- `PROJECT_SCOPE.md` - Full feature requirements
- `BACKEND_SETUP.md` - Backend initialization guide
- `MIGRATION_GUIDE.md` - Next.js conversion details
- `QUICKSTART.md` - 30-second setup guide
- `FILE_STRUCTURE.md` - Detailed file organization

---

## 🚦 Development Status

**Frontend**: ✅ Complete
- 12 routes created
- Navbar with auth logic
- Home page with job grid
- Login/Signup pages
- Responsive design
- Build succeeds

**Backend**: ⏳ Ready to start
- Database schema ready
- API endpoints documented
- 8-phase implementation plan

**Estimated Timeline**: 12 weeks for full MVP

---

## 👥 Team Roles

- **Frontend Dev**: Work on React components, styling, UX
- **Backend Dev**: Express server, APIs, database, ML service
- **DevOps**: Deployment, monitoring, infrastructure
- **QA**: Testing, bug reports, performance validation

---

## 📞 Support & Questions

Refer to specific documentation:
- **API Questions** → `PROJECT_SCOPE.md`
- **Setup Issues** → `BACKEND_SETUP.md`
- **Feature Details** → `IMPLEMENTATION_CHECKLIST.md`
- **File Organization** → `FILE_STRUCTURE.md`

---

**Last Updated**: December 6, 2025
**Project**: AhhChip - Job Portal Platform
**Status**: MVP Phase 1 Ready
