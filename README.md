# Development of a CRM System with Notification and Mailing Automation

## Technologies Used

Frontend: React 18, TypeScript, Redux Toolkit (@reduxjs/toolkit) with React-Redux, React Hook Form + Yup  
UI Library: Material-UI v5, Styled-Components, Emotion  
Routing: React Router DOM v6  

Backend: Node.js, Express.js with Helmet, CORS, Express Rate Limit, dotenv  
Integrations: Slack Web API, Nodemailer (Gmail SMTP)  
HTTP Client: Axios  
Utilities: Date-fns, Joi  
Dev Tools: Nodemon, Jest, React Scripts, Testing Library  

## Project Goal

Centralized sales management system automating team notifications and client communication.

## Project Description

CRM system from lead to deal closure, with automated notifications and email campaigns.

## Implemented Functionality

1. **Dashboard Module** – key metrics, funnel visualization, mini-calendar, top clients, integration monitoring, pie chart.  
2. **Clients Module** – CRUD, search/filter, client fields, automation on addition (welcome email + Slack notification).  
3. **Pipeline Module** – Kanban board, deal management, automation (Slack notifications), dashboard connection.  
4. **Email Automation Module** – template system, personalization, Gmail integration via Nodemailer.  
5. **Integrations** – Slack notifications, Gmail triggered/manual emails.

## Architecture

Frontend: React + TypeScript, MUI + Styled-Components, Redux Toolkit, React Hook Form  
Backend: Node.js + Express, secure REST API, Joi validation  
Configuration: Integrations can be disabled via environment variables  

## Result

Efficient, automated CRM system, maintainable, scalable, modern UI/UX.

---

## How to Run the Project

### 1. Clone the repository
git clone [git@github.com](mailto:git@github.com):MeguMax/CRM-System.git
cd CRM-System

### 2. Install dependencies

**Backend:**
cd backend
npm install

**Frontend:**
cd ../crm-system
npm install

### 3. Create environment files
Create `.env` in both backend and frontend if needed. Example:

**Backend `.env`:**
PORT=5000
GMAIL_USER=[your-email@gmail.com](mailto:your-email@gmail.com)
GMAIL_PASS=your-app-password
SLACK_TOKEN=your-slack-token

**Frontend `.env`:**
REACT_APP_API_URL=[http://localhost:5000](http://localhost:5000)


### 4. Run the project

**Backend:**
cd backend
npm run dev

**Frontend:**
cd ../crm-system
npm start

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Optional: Testing

**Backend tests:**
cd backend
npm test


**Frontend tests:**
cd crm-system
npm test

