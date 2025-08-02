//  Load environment variables first!
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

//  MongoDB Connection
const mongoURI = process.env.MONGO_URI || require('./config/keys').mongoURI;

mongoose
  .connect(mongoURI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.error(' MongoDB Connection Error:', err));

//  API Routes
app.use('/api/items', require('./routes/api/items'));

//  Health Check (always available)
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy!');
});

//  Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.resolve(__dirname, 'client', 'build');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
