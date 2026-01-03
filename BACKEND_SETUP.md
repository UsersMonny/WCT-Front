# Backend Setup Guide

## Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Redis (optional, for caching)

### Installation

```bash
# Create backend directory
mkdir backend
cd backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express cors dotenv pg bcryptjs jsonwebtoken
npm install nodemailer axios puppeteer passport passport-google-oauth20 passport-facebook
npm install multer sharp uuid
npm install --save-dev nodemon

# Install optional
npm install redis socket.io bull winston
```

### Environment Setup

Create `.env` file:
```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/ahchip
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Redis
REDIS_URL=redis://localhost:6379
```

### Project Structure

```
backend/
├── config/
│   ├── database.js
│   ├── passport.js
│   └── email.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── jobController.js
│   ├── resumeController.js
│   └── alertController.js
├── models/
│   ├── User.js
│   ├── Job.js
│   ├── Resume.js
│   └── Alert.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── jobs.js
│   ├── resumes.js
│   └── alerts.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── upload.js
├── services/
│   ├── emailService.js
│   ├── fileService.js
│   ├── matchingService.js
│   └── crawlerService.js
├── utils/
│   ├── logger.js
│   └── validators.js
├── .env.example
├── server.js
└── package.json
```

### Core Files

**server.js**
```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/alerts', require('./routes/alerts'));

// Error handling
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Database Schema (PostgreSQL)

```sql
-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  avatar VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user',
  provider VARCHAR(50) DEFAULT 'email',
  providerId VARCHAR(255),
  bio TEXT,
  phone VARCHAR(20),
  location VARCHAR(100),
  skills TEXT[],
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resumes Table
CREATE TABLE resumes (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  fileName VARCHAR(255) NOT NULL,
  fileUrl VARCHAR(255) NOT NULL,
  fileType VARCHAR(10),
  parsedData JSONB,
  isActive BOOLEAN DEFAULT FALSE,
  uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP
);

-- Jobs Table
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  salaryMin INTEGER,
  salaryMax INTEGER,
  currency VARCHAR(10) DEFAULT 'USD',
  location VARCHAR(255),
  workType VARCHAR(50),
  skills TEXT[],
  experienceMin INTEGER,
  experienceMax INTEGER,
  postedBy INTEGER REFERENCES users(id),
  source VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expiresAt TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Alerts Table
CREATE TABLE job_alerts (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  keywords TEXT[],
  location VARCHAR(100),
  salaryMin INTEGER,
  salaryMax INTEGER,
  frequency VARCHAR(20) DEFAULT 'weekly',
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Applications Table
CREATE TABLE job_applications (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  jobId INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  resumeId INTEGER REFERENCES resumes(id),
  status VARCHAR(50) DEFAULT 'applied',
  appliedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responseAt TIMESTAMP
);

-- Create Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_resumes_userId ON resumes(userId);
CREATE INDEX idx_alerts_userId ON job_alerts(userId);
```

### Package.json Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "seed": "node scripts/seed.js"
  }
}
```

---

## Integration with Next.js Frontend

In your Next.js project, create an API client:

**lib/api.js**
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async register(userData) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  // Jobs
  async getJobs(filters = {}) {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_URL}/jobs?${params}`);
    return res.json();
  },

  async getJob(id) {
    const res = await fetch(`${API_URL}/jobs/${id}`);
    return res.json();
  },

  // Add more methods...
};
```

Update your Next.js pages to use this:

```javascript
import { apiClient } from '@/lib/api';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    apiClient.getJobs().then(data => setJobs(data.jobs));
  }, []);

  return (
    // Your component...
  );
}
```

---

## Next Steps

1. Setup Express backend
2. Configure PostgreSQL database
3. Implement authentication APIs
4. Build user and job APIs
5. Connect to Next.js frontend
6. Implement ML matching
7. Add web scraper
8. Deploy to production

Ready to start implementing the backend?
