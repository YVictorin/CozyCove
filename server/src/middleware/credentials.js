const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  
  if (!origin) {
    next();
    return;
  }
  
  const allowedOriginPatterns = [
    /^http:\/\/localhost:\d+$/,
    /^https:\/\/cozy-cove(-[a-zA-Z0-9-]+)?\.vercel\.app$/,
    /^https:\/\/cozy-cove-git-[a-zA-Z0-9]+-austins-projects-[a-zA-Z0-9]+\.vercel\.app$/
  ];
  
  const isAllowed = allowedOriginPatterns.some(pattern => pattern.test(origin));
  
  if (isAllowed) {
    res.header('Access-Control-Allow-Origin', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  }
  
  next();
};

export default credentials;