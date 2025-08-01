const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const path = require('path');
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// DB Config
const db = require('./config/keys').mongoURI;
console.log("Loaded URI:", db);

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('Mongo Error:', err));

// API Routes
app.use('/api/items', items);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(buildPath));

  // ✅ Health route BEFORE catch-all
  app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy!');
  });

  // Catch-all: Send React's index.html for all unknown routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  // Health route also available in dev mode
  app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy!');
  });
}

// Port configuration
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
