# AhhChip API Reference Card

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.ahhchip.com/api
```

---

## 🔐 AUTHENTICATION ENDPOINTS

### Register (Sign Up)
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "first_name": "John",
  "last_name": "Doe"
}

Response: 201
{
  "id": 1,
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "role": "user"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200
{
  "id": 1,
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "role": "user"
}
```

### Google OAuth
```http
POST /auth/google
Content-Type: application/json

{
  "googleToken": "eyJhbGciOiJSUzI1NiIs..."
}

Response: 200
{
  "id": 1,
  "email": "user@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "role": "user"
}
```

### Facebook OAuth
```http
POST /auth/facebook
Content-Type: application/json

{
  "facebookToken": "EAABs..."
}

Response: 200
{
  "id": 1,
  "email": "user@facebook.com",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "role": "user"
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer {token}

Response: 200
{
  "message": "Logged out successfully"
}
```

### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer {token}

Response: 200
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 👤 USER ENDPOINTS

### Get Current User
```http
GET /users/me
Authorization: Bearer {token}

Response: 200
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "profile_photo": "https://...",
  "role": "user",
  "bio": "Software developer",
  "location": "Phnom Penh",
  "created_at": "2025-12-06T10:30:00Z"
}
```

### Get User by ID
```http
GET /users/:id
Authorization: Bearer {token}

Response: 200
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "profile_photo": "https://...",
  "bio": "Software developer",
  "location": "Phnom Penh"
}
```

### Update User Profile
```http
PUT /users/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Smith",
  "phone": "+1234567890",
  "bio": "Senior Software Developer",
  "location": "Bangkok"
}

Response: 200
{
  "id": 1,
  "message": "Profile updated successfully"
}
```

### Upload Profile Photo
```http
POST /users/:id/photo
Authorization: Bearer {token}
Content-Type: multipart/form-data

FormData:
  file: [Image File]

Response: 200
{
  "profile_photo": "https://s3.amazonaws.com/uploads/..."
}
```

### Delete Account
```http
DELETE /users/:id
Authorization: Bearer {token}

Response: 200
{
  "message": "Account deleted successfully"
}
```

---

## 💼 JOB ENDPOINTS

### List All Jobs
```http
GET /jobs?page=1&limit=20&location=Phnom%20Penh&type=Full-Time

Query Parameters:
  - page: 1 (default)
  - limit: 20 (default)
  - location: string (optional)
  - type: Full-Time|Part-Time|Contract (optional)
  - salary_min: number (optional)
  - salary_max: number (optional)

Response: 200
{
  "jobs": [
    {
      "id": 1,
      "title": "Senior Software Engineer",
      "company_name": "Tech Corp Inc.",
      "company_logo": "https://...",
      "location": "Phnom Penh",
      "job_type": "Full-Time",
      "salary_min": 1200,
      "salary_max": 1800,
      "skills_required": ["JavaScript", "React", "Node.js"],
      "experience_required": "3+ years",
      "description": "We are looking for...",
      "created_at": "2025-12-05T14:30:00Z",
      "saved": false
    }
  ],
  "total": 150,
  "page": 1,
  "pages": 8
}
```

### Search Jobs
```http
GET /jobs/search?q=JavaScript&location=Phnom%20Penh

Query Parameters:
  - q: keyword (required)
  - location: string (optional)
  - type: Full-Time|Part-Time|Contract (optional)

Response: 200
{
  "jobs": [...],
  "total": 45
}
```

### Get Job Details
```http
GET /jobs/:id
Authorization: Bearer {token} (optional)

Response: 200
{
  "id": 1,
  "title": "Senior Software Engineer",
  "company_name": "Tech Corp Inc.",
  "company_logo": "https://...",
  "location": "Phnom Penh",
  "job_type": "Full-Time",
  "salary_min": 1200,
  "salary_max": 1800,
  "skills_required": ["JavaScript", "React", "Node.js"],
  "experience_required": "3+ years",
  "description": "We are looking for...",
  "posted_by": 5,
  "saved": true,
  "match_score": 87,
  "created_at": "2025-12-05T14:30:00Z",
  "updated_at": "2025-12-05T14:30:00Z"
}
```

### Create Job (Admin Only)
```http
POST /jobs
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Senior Software Engineer",
  "company_name": "Tech Corp Inc.",
  "company_logo": "https://...",
  "location": "Phnom Penh",
  "job_type": "Full-Time",
  "salary_min": 1200,
  "salary_max": 1800,
  "skills_required": ["JavaScript", "React", "Node.js"],
  "experience_required": "3+ years",
  "description": "We are looking for..."
}

Response: 201
{
  "id": 1,
  "message": "Job created successfully"
}
```

### Update Job (Admin Only)
```http
PUT /jobs/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Lead Software Engineer",
  "salary_max": 2000
}

Response: 200
{
  "id": 1,
  "message": "Job updated successfully"
}
```

### Delete Job (Admin Only)
```http
DELETE /jobs/:id
Authorization: Bearer {admin_token}

Response: 200
{
  "message": "Job deleted successfully"
}
```

---

## 📄 RESUME ENDPOINTS

### Upload Resume
```http
POST /resumes
Authorization: Bearer {token}
Content-Type: multipart/form-data

FormData:
  file: [PDF or DOCX File]

Response: 201
{
  "id": 1,
  "file_name": "resume.pdf",
  "file_size": 245000,
  "parsed_data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": [
      {
        "company": "Previous Corp",
        "position": "Developer",
        "duration": "2020-2023"
      }
    ]
  },
  "created_at": "2025-12-06T10:30:00Z"
}
```

### List User's Resumes
```http
GET /resumes
Authorization: Bearer {token}

Response: 200
{
  "resumes": [
    {
      "id": 1,
      "file_name": "resume.pdf",
      "file_size": 245000,
      "is_active": true,
      "created_at": "2025-12-06T10:30:00Z"
    }
  ]
}
```

### Get Resume Details
```http
GET /resumes/:id
Authorization: Bearer {token}

Response: 200
{
  "id": 1,
  "file_name": "resume.pdf",
  "file_size": 245000,
  "file_path": "https://s3.amazonaws.com/uploads/...",
  "parsed_data": {
    "name": "John Doe",
    "skills": ["JavaScript", "React", "Node.js"]
  },
  "is_active": true
}
```

### Set Active Resume
```http
PUT /resumes/:id/active
Authorization: Bearer {token}

Response: 200
{
  "message": "Resume set as active"
}
```

### Delete Resume
```http
DELETE /resumes/:id
Authorization: Bearer {token}

Response: 200
{
  "message": "Resume deleted successfully"
}
```

---

## 🎯 JOB MATCHING ENDPOINTS

### Get Recommended Jobs
```http
GET /matches/recommendations?limit=10
Authorization: Bearer {token}

Query Parameters:
  - limit: 10 (default)
  - offset: 0 (default)

Response: 200
{
  "recommendations": [
    {
      "id": 1,
      "title": "Senior Software Engineer",
      "company_name": "Tech Corp Inc.",
      "location": "Phnom Penh",
      "match_score": 92,
      "match_reasons": [
        "Skills match: 95% (JavaScript, React)",
        "Experience level: 85% (3+ years required)",
        "Location: Match"
      ]
    }
  ]
}
```

### Get Match Score for Specific Job
```http
GET /matches/job/:jobId
Authorization: Bearer {token}

Response: 200
{
  "job_id": 1,
  "match_score": 87,
  "details": {
    "skills_match": 95,
    "experience_match": 75,
    "education_match": 80,
    "location_match": 100,
    "salary_match": 85
  },
  "recommendations": ["Update LinkedIn profile", "Highlight React projects"]
}
```

### Calculate Match (Manual)
```http
POST /matches/calculate
Authorization: Bearer {token}
Content-Type: application/json

{
  "user_id": 1,
  "job_id": 5
}

Response: 200
{
  "match_score": 87
}
```

---

## 🔔 JOB ALERT ENDPOINTS

### Create Job Alert
```http
POST /alerts
Authorization: Bearer {token}
Content-Type: application/json

{
  "job_title": "JavaScript",
  "location": "Phnom Penh",
  "job_type": "Full-Time",
  "salary_min": 1000,
  "salary_max": 2000,
  "frequency": "daily",  // daily, weekly, monthly
  "email_notification": true
}

Response: 201
{
  "id": 1,
  "message": "Alert created successfully"
}
```

### List User's Alerts
```http
GET /alerts
Authorization: Bearer {token}

Response: 200
{
  "alerts": [
    {
      "id": 1,
      "job_title": "JavaScript",
      "location": "Phnom Penh",
      "frequency": "daily",
      "is_active": true,
      "created_at": "2025-12-06T10:30:00Z"
    }
  ]
}
```

### Update Alert
```http
PUT /alerts/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "frequency": "weekly",
  "is_active": false
}

Response: 200
{
  "message": "Alert updated successfully"
}
```

### Delete Alert
```http
DELETE /alerts/:id
Authorization: Bearer {token}

Response: 200
{
  "message": "Alert deleted successfully"
}
```

---

## 📍 SAVED JOBS ENDPOINTS

### Save Job
```http
POST /saved-jobs/:jobId
Authorization: Bearer {token}

Response: 201
{
  "message": "Job saved successfully"
}
```

### Get Saved Jobs
```http
GET /saved-jobs?page=1&limit=20
Authorization: Bearer {token}

Response: 200
{
  "saved_jobs": [
    {
      "id": 1,
      "title": "Senior Software Engineer",
      "company_name": "Tech Corp Inc.",
      "location": "Phnom Penh",
      "saved_at": "2025-12-06T10:30:00Z"
    }
  ],
  "total": 5
}
```

### Remove Saved Job
```http
DELETE /saved-jobs/:jobId
Authorization: Bearer {token}

Response: 200
{
  "message": "Job removed from saved"
}
```

---

## ✅ HTTP STATUS CODES

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Not allowed (admin only) |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate resource |
| 500 | Server Error - Backend issue |

---

## 🔐 Authentication Header
All protected endpoints require:
```
Authorization: Bearer {jwt_token}
```

---

## 📝 Error Response Format
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "status": 400
}
```

---

## 💡 Common Examples

### JavaScript Fetch Example
```javascript
// Fetch jobs with authentication
const response = await fetch('http://localhost:5000/api/jobs', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
const data = await response.json();
```

### POST with Data
```javascript
const response = await fetch('http://localhost:5000/api/alerts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    job_title: 'JavaScript',
    location: 'Phnom Penh',
    frequency: 'daily'
  })
});
```

### File Upload
```javascript
const formData = new FormData();
formData.append('file', resumeFile);

const response = await fetch('http://localhost:5000/api/resumes', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: formData
});
```

---

**Last Updated**: December 6, 2025
**Version**: 1.0
**Status**: Ready for Integration
