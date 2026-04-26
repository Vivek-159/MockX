# MockX - AI-Powered Mock Interviewer

MockX is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to help users practice interviews with AI. It features Google authentication, resume analysis, and interactive interview practice sessions.

## 🚀 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas connection string)
- A Google Cloud Console account (for Google OAuth credentials)
- A Groq account (for AI API key)

---

## 🛠️ Installation & Setup

This project is split into two directories: `frontend/my-app` and `backend`. You need to set up both.

### 1. Backend Setup

Open a terminal and navigate to the backend directory:
```bash
cd backend
```

Install the backend dependencies:
```bash
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=3000
MONGO_URI="your_mongodb_connection_string"
GROQ_API_KEY="your_groq_api_key"
GOOGLE_CLIENT_ID="your_google_client_id"
```

Start the backend server:
```bash
npm run start
```
*The backend should now be running on `http://localhost:3000`.*

### 2. Frontend Setup

Open a **new** terminal and navigate to the frontend directory:
```bash
cd frontend/my-app
```

Install the frontend dependencies:
```bash
npm install
```

Create a `.env` file in the `frontend/my-app` directory and add your Google Client ID:
```env
VITE_GOOGLE_CLIENT_ID="your_google_client_id"
```

Start the frontend development server:
```bash
npm run dev
```
*The frontend should now be running on `http://localhost:5173`.*

---

## 💻 Usage

Once both servers are running:
1. Open your browser and navigate to `http://localhost:5173`.
2. You can create an account manually or use the **Google Login** button to authenticate.
3. Upload your resume and begin practicing with the AI interviewer!

## 🔧 Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, `@react-oauth/google`
- **Backend:** Node.js, Express.js, MongoDB/Mongoose, JWT, Google Auth Library, Groq AI API
