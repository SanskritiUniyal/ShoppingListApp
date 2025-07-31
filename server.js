const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const path = require('path'); // lowercase 'path' is the convention
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
  // Absolute path to client/build
  const buildPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy!');
});

// Port configuration
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
