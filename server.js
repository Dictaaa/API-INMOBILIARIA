require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
