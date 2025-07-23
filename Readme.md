# 📋 Candidate Interview Tracking System

A centralized web-based platform to **streamline the end-to-end interview process** — from candidate registration to final selection. The system enables recruiters and interviewers to **manage candidate data, schedule interviews, collect feedback, analyze resumes with AI**, and view **interactive dashboards** — all in one place.

---

## 🚀 Key Features

### ✅ 1. Candidate Management
- Add and manage candidate profiles
- Track progress through stages:
  - Applied → Shortlisted → Interview Rounds → Selected / Rejected
- Upload and store resumes

### 📅 2. Interview Scheduling
- Schedule interviews with date, time, interviewer, and meeting link
- View upcoming interviews for each candidate
- Send auto-notifications (optional feature)

### 🗣️ 3. Feedback Collection
- Interviewers can give structured feedback:
  - Rating (1 to 5)
  - Written comments
- Feedback is stored and visible to recruiters

### 🤖 4. AI Resume Screening (Python Flask Microservice)
- Extracts text and skills from uploaded PDF resumes
- Compares extracted skills with the job description
- Generates a **Match Score** (e.g., 85% fit for 'Frontend Developer')
- Helps recruiters prioritize top candidates

### 📊 5. Dashboard & Analytics
- Total candidates
- Stage-wise funnel view
- Interview success rate
- Visual charts (Pie/Bar)

### 🔐 6. Role-Based Access
- Recruiter: Full access to candidates, scheduling, dashboard
- Interviewer: Limited access to assigned interviews and feedback only

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| 🖥️ Frontend | Angular (TypeScript) |
| 🧠 Backend APIs | .NET Core (C#) |
| 🤖 AI Service | Python Flask |
| 🔁 API Gateway | .NET Gateway (or NGINX Proxy) |
| 📦 Database | MongoDB / SQL Server |
| 🔐 Auth (optional) | JWT / Firebase Auth |
| 📧 Emails (optional) | SendGrid / SMTP |
| 📈 Charts | `ngx-charts` or `chart.js` |

---

## 📁 Project Structure

/frontend-angular/ → Angular project (UI)
/backend-dotnet/ → .NET Core Web API
/ai-resume-parser/ → Flask-based Python resume skill extractor
/api-gateway/ → API Gateway to route frontend calls
/docs/ → Architecture diagrams, API docs, flowcharts
README.md

---

## ⚙️ How It Works (System Flow)

1. **Recruiter adds a new candidate**
   - Fills name, email, job role, and uploads resume.
2. **Flask service extracts skills from resume**
   - Calculates match % based on required job skills.
3. **Recruiter schedules interview**
   - Selects date/time, interviewer, and adds meet link.
4. **Interviewer gives feedback**
   - Adds rating and comment after interview.
5. **Recruiter views dashboard**
   - Tracks candidates by stage and takes decisions.

---

## 🔧 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-org/interview-tracking-system.git
```

### 2. Setup Frontend (Angular)
```bash
cd frontend-angular
npm install
ng serve
```

### 3. Setup Backend (.NET Core)
```bash
cd backend-dotnet
dotnet restore
dotnet run
```

### 4. Setup Flask Resume Parser
```bash
cd ai-resume-parser
pip install -r requirements.txt
python app.py
```

