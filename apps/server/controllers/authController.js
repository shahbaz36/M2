const admin = require('firebase-admin');
const {db} = require('../firebaseConfig')

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized: No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Verify the token using the Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    req.user = decodedToken;

    next(); 
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).send({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = { checkAuth };