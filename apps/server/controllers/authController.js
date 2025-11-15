const admin = require('firebase-admin');

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and is formatted correctly
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized: No token provided' });
  }

  // Extract the token from the header
  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Verify the token using the Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Token is valid! Attach the user's info to the request object
    req.user = decodedToken;
    
    // Pass control to the next function (the route handler)
    next(); 
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).send({ message: 'Forbidden: Invalid token' });
  }
};

// Export the middleware
module.exports = { checkAuth };