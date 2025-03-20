// Updated to handle all Vercel preview deployments
const allowedOrigins = [
    // Local development
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:5175',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    
    // Production domains
    'https://cozycove.vercel.app',
    'https://cozy-cove-play.vercel.app',
    'https://cozy-cove-server.vercel.app',
    
    // Match ALL Vercel preview deployments for both frontend and backend
    /^https:\/\/cozy-cove.*\.vercel\.app$/,
    /^https:\/\/cozy-cove-.*\.vercel\.app$/
];

export default allowedOrigins;