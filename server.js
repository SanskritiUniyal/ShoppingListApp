require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://shoppinglistapp-yzrv.onrender.com'], // client URL
  credentials: true
}));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || require('./config/keys').mongoURI;
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));

// Health Check
app.get('/health', (req, res) => res.status(200).send('Server is healthy!'));

// Serve React App in Production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientBuildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
