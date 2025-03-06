# Email Domain Checker

## Overview

The Email Domain Checker is a web application that allows users to validate and categorize email addresses using a powerful validation service along with OpenAI integration for Email Provider Detection. The application features a user-friendly interface built with React and Tailwind CSS, and it includes a backend powered by Node.js and Express. Even python module is also build for python specifc email provider detection.

## Features

- **Email Validation**: Instantly validate email addresses to ensure they are correctly formatted and belong to valid domains by using NS Lookup along with predefined legit SMTP provider server list.
- **Custom List**: Has a fleixibilty to whitelist, blacklist domains before checking NSLookup and OpenAI
- **AI Verification**: Utilize OpenAI integration with 4o mini model to enhance the accuracy of email validation. It costs as lower as 0.75$ for 1 Lakh unknown email verification.
- **Responsive Design**: The application is fully responsive and works seamlessly on both desktop and mobile devices.
- **User-Friendly Interface**: Built with React and styled using Tailwind CSS for a modern look and feel.

## Tech Stack

- **Frontend**:

  - React
  - TypeScript
  - Tailwind CSS
  - Vite

- **Backend**:
  - Node.js
  - Express
  - OpenAI API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Vercel account for deployment (optional)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/samrathreddy/email-domain-checker.git
   cd email-domain-checker
   ```

2. **Install Dependencies**:
   - For the frontend:
     ```bash
     cd client
     npm install
     ```
   - For the backend:
     ```bash
     cd server
     npm install
     ```

### Running the Application

1. **Start the Backend**:

   ```bash
   cd server
   node app.js
   ```

2. **Start the Frontend**:

   ```bash
   cd client
   npm run dev
   ```

3. **Access the Application**:
   - Open your browser and navigate to `http://localhost:5173` to view the application.

## Environment Variables

If you need to set up environment variables for the frontend, create a `.env` file in the `client` directory and add the following:

```bash
VITE_BACKEND_URL="Backend_Server_Url"
```

If you need to set up environment variables for the backend, create a `.env` file in the `server` directory and add the following:

```bash
PORT = 3000
OPENAI_API_KEY=your_openai_api_key
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.
