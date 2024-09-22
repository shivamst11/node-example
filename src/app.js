// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const filesRoutes = require('./routes/filesRoutes');
const poolRoutes = require('./routes/poolRoutes');
const { authenticateToken } = require('./middleware/authenticateToken');
const connectDB = require('./config/db');

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', authenticateToken, userRoutes);
app.use('/file', authenticateToken, filesRoutes);
app.use('/pool', authenticateToken, poolRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
