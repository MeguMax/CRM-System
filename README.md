# Development of a CRM System with Notification and Mailing Automation

## Technologies Used

**Frontend:** React 18, TypeScript, Redux Toolkit (@reduxjs/toolkit) with React-Redux for state management, React Hook Form with Yup validation (@hookform/resolvers, yup)  
**UI Library & Styling:** Material-UI (MUI) v5 (@mui/material, @mui/icons-material), Styled-Components, Emotion (@emotion/react, @emotion/styled)  
**Routing:** React Router DOM v6  

**Backend:** Node.js, Express.js, with security middleware (Helmet, CORS, Express Rate Limit) and environment configuration (dotenv)  

**Integrations:** Slack Web API (@slack/web-api), Nodemailer for Gmail SMTP integration  
**HTTP Client:** Axios  
**Utilities:** Date-fns for date manipulation, Joi for server-side validation  
**Development Tools:** Nodemon, Jest (Backend), React Scripts, Testing Library (Frontend)  

## Project Goal

To create a centralized sales management system that automates team notifications and client communication, streamlining the workflow from initial contact to deal closure.

## Project Description

This CRM system was developed from the ground up to optimize sales department processes. It provides a complete customer lifecycle management tool, guiding a lead from the first interaction to a closed deal, all supported by automated notifications and email campaigns.

## Implemented Functionality

### 1. Dashboard Module (Main Page)
- **Key Metrics:** Display of real-time counters for "Active Clients," "Closed Deals," "Total Value of All Deals," and "Active Deals."  
- **Funnel Visualization:** Progress bars for all deal stages, allowing for quick pipeline assessment.  
- **Mini-Calendar:** Displays upcoming reminders and tasks associated with deals, implemented using date-fns.  
- **Top Clients:** An automatically generated client ranking based on the total value of their associated deals.  
- **Integration Monitoring:** Status indicators showing the live connection to the Slack and Gmail APIs.  
- **Pie Chart:** A visual representation of the ratio between closed deals and all deals.  

### 2. Clients Module
- **Client List:** A table displaying all clients, built with MUI components.  
- **Search and Filter:** Functionality to search by client name and filter by their status ("Active"/"Inactive").  
- **CRUD Operations:** Full capability to Create, Read, Update, and Delete client records.  
- **Client Fields:** Name, email, phone number, company, and status. Forms are managed efficiently with React Hook Form and validated using Yup.  
- **Automation upon Addition:**  
  - Automatic sending of a welcome email via Nodemailer (Gmail SMTP).  
  - Notification sent to a designated Slack channel using @slack/web-api SDK.  

### 3. Pipeline Module (Sales Funnel)
- **Kanban Board:** A visual representation of deals, grouped into columns based on their status (Lead, Qualification, Proposal, Negotiation, Closed).  
- **Deal Management:** Change a deal's status via drag-and-drop, edit all its information, delete deals.  
- **Deal Fields:** Title, amount, assigned client, status, relevant event date.  
- **Automation:** Notification sent to Slack whenever a new deal is created.  
- **Dashboard Connection:** All changes reflected in the dashboard statistics, state managed globally by Redux Toolkit.  

### 4. Email Automation Module
- **Template System:** Creation and management of reusable email templates.  
- **Personalization:** Auto-population of fields using triggers (e.g., {{client_name}}).  
- **Data Binding:** Select a specific deal and client for the email.  
- **Gmail Integration:** Emails sent through Nodemailer via Gmail SMTP.  

### 5. Integrations
- **Slack:** Notifications to a selected channel for critical events using @slack/web-api SDK.  
- **Gmail:** Automatic triggered emails and manual bulk mailing through Nodemailer.  

## Architecture and Features
- **Frontend:** React 18 + TypeScript, Material-UI v5 + Styled-Components, Redux Toolkit for state, React Hook Form for forms.  
- **Backend:** Node.js + Express, secure REST API with Helmet, express-rate-limit, Joi for validation.  
- **Configuration Flexibility:** Integrations (email, Slack) can be disabled via environment variables for local development/testing.  

## Result
A powerful and flexible CRM system was created. It brings structure to client and deal management and, through automation, enhances communication efficiency within the team and with clients. Modern tech stack ensures maintainability, scalability, and excellent user experience.
