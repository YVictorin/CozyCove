# Cozy Cove

[![GitHub Issues](https://img.shields.io/github/issues/cozycove/cozycove.svg)](https://github.com/YVictorin/CozyCove/issues) [![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/YVictorin/CozyCove) [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://cozycove.vercel.app) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a full-stack web application designed to provide support, resources, and engaging activities for parents of neurodivergent children. The platform offers sensory tools, interactive games, visual scheduling tools, and educational content in a friendly, accessible interface.


---

## Features
- **Interactive Games** - Emotion drawing canvas and routine-building games for skill development
- **Visual Schedule Builder** - Drag-and-drop interface for creating custom visual schedules
- **Resource Hub** - Curated educational materials and support resources for parents
- **User Accounts** - Save progress, earn badges, and track achievements
- **Support Bot** - Interactive assistant to answer questions in real-time
- **Admin Dashboard** - Manage users and content with ease

#### User Roles:
- **Parent:** Access to resources, games, visual tools, and personal account
- **Administrator:** Full access to user management and content administration

---

## Tech Stack

### Frontend
- React.js with hooks and functional components
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- JWT for authentication

### Backend
- Node.js with Express
- MySQL database
- JWT authentication

---

## Setup
Clone this repo to your desktop and run `npm install` in both the client and server directories to install all dependencies.

You might want to look into creating `.env` files for both directories:

**Server .env**
```
PORT=3001
DB_HOST=localhost
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_NAME=cozycove
JWT_SECRET=your_secret_key
```

**Client .env**
```
VITE_BASE_URL=http://localhost:3001
```

---

## Usage
After installing dependencies, you can start the application:

For the server:
```bash
cd server
npm start
```

For the client:
```bash
cd client
npm run dev
```

You will then be able to access the application at localhost:5173 (or the port Vite assigns).

To create an administrator account, you'll need to register a regular account first, then update the role in the database.

---

## Project Structure

```
cozy-cove/
├── client/                 # React frontend
│   ├── src/               
│   │   ├── assets/         # Images and static files
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context (auth)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── validation/     # Form validation schemas
└── server/                 # Express backend
    ├── src/
    │   ├── config/         # App configuration
    │   ├── controllers/    # Request handlers
    │   ├── middleware/     # Express middleware
    │   ├── routes/         # API routes
    │   └── schemas/        # Validation schemas
```

---

## License
This project is licensed under the terms of the **MIT** license.
