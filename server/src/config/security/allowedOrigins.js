//feel free to add any urls you need to fetch to and from to the list
 const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',

    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:5175',

    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5173',
    'http://localhost:5174',

    'http://localhost:5173/login',
    'http://localhost:5174/login',
    'http://localhost:5175/login',

    'https://cozycove.vercel.app',
    'https://cozy-cove-play.vercel.app',
    'https://cozy-cove-server.vercel.app',
    'https://cozy-cove-git-yvpages-austins-projects-977ccb2e.vercel.app',
    /^https:\/\/.*\.vercel\.app$/  // Regex to allow any Vercel subdomain

];

export default allowedOrigins;