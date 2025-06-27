Here's your Justice Link Kenya - Frontend documentation rewritten in Markdown format for GitHub:

markdown
Copy
Edit
# Justice Link Kenya - Frontend 🇰🇪

This is the frontend for the **Justice Link Kenya** platform, built with React and Vite. It provides the user interface for reporting incidents, viewing news, and managing the platform as an administrator.

---

## ✨ Features

- **Secure Incident Reporting**: Users can submit detailed reports of incidents, with the option to remain anonymous.
- **User Report Tracking**: Logged-in users can view a personal dashboard to track the status of their submitted reports (Pending, Verified, or Rejected).
- **News Aggregation**: A public news page displays curated articles related to human rights and justice.
- **User Authentication**: Secure user registration and login system using both standard email/password and Google Sign-In.
- **Admin Dashboard**: A protected area for administrators to manage reports, users, and news articles.

---

## 🛠️ Tech Stack

| Area               | Technology                             |
|--------------------|-----------------------------------------|
| **Framework**       | React.js, Vite                         |
| **Styling**         | Tailwind CSS                          |
| **UI Components**   | shadcn/ui (customized)                |
| **Icons**           | Lucide React                          |
| **Authentication**  | Google OAuth 2.0 (`@react-oauth/google`) |
| **State Management**| React Context API (`AuthContext`)     |

---

## 📋 Prerequisites

- **Node.js** (v18.x or later)  
- **npm** or **yarn** package manager

---

## 🚀 Setup and Installation

Follow these steps to get your frontend development environment set up.

### 1. Navigate to the Frontend Folder

```bash
cd path/to/your/frontend/adrianmaina/justice-link-frontend/justice-link-frontend-9b879d46107acebac929200325adc07c06aa508d
2. Install Dependencies
Install all required Node.js packages from package.json.

bash
Copy
Edit
npm install
🔐 Google Authentication Setup
To enable Google Sign-In, you must create a Google Cloud project and obtain an OAuth 2.0 Client ID.

Follow the official Google Cloud OAuth guide to create your Client ID.

During setup, ensure you add the following Authorized JavaScript origin:

arduino
Copy
Edit
http://localhost:5173
Then, open the file:

css
Copy
Edit
src/main.jsx
Replace the placeholder with your actual Google Client ID:

js
Copy
Edit
const GOOGLE_CLIENT_ID = "YOUR_ACTUAL_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
▶️ Running the Frontend Server
To start the Vite development server, run:

bash
Copy
Edit
npm run dev
Your React application will be available at:

arduino
Copy
Edit
http://localhost:5173
Note: The frontend expects the backend API to be running at http://127.0.0.1:5000. Please ensure the backend server is running before launching the frontend.

