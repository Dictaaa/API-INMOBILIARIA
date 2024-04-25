const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  const secretKey = process.env.SECRET_KEY; 

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token de autenticación inválido' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
