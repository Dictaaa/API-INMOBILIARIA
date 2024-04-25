const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticate');

let users = [
  { username: 'daencovi', password: '123' }
];

let statistics = [
    { month: 'ENERO', quantity: 20, totalSale: 40000000 },
    { month: 'FEBRERO', quantity: 30, totalSale: 80000000 },
    { month: 'MARZO', quantity: 30, totalSale: 90000000 },
    { month: 'ABRIL', quantity: 50, totalSale: 110000000 }
];

router.get('/statistics', (req, res) => {
    res.json(statistics);
});

router.get('/users', authenticateToken, (req, res) => {
    res.json(users);
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  users.push({ username, password });
  res.status(201).json({ message: 'Usuario creado exitosamente' });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  
    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
    res.json({ token });
});

module.exports = router;
