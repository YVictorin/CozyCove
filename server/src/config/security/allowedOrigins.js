const allowedOriginsFromEnv = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = allowedOriginsFromEnv.split(',').filter(origin => origin.trim() !== '');

// Fallback to hardcoded list if environment variable is not set
if (allowedOrigins.length === 0) {
  allowedOrigins.push(
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'https://*.vercel.app',
    'https://cozycove-server.vercel.app',
    'https://cozycove-git-yvpages-yonjous-projects.vercel.app'
  );
}

export default allowedOrigins;