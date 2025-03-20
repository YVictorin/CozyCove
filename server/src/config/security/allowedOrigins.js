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
    
    // Specific preview URLs (add your exact frontend URL here)
    'https://cozy-cove-git-yvpages-austins-projects-977ccb2e.vercel.app',

    // Render domain
    'https://cozycove-r6ih.onrender.com',

    
    // Match ALL Vercel preview deployments
    /\.vercel\.app$/
];

export default allowedOrigins;