const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const Path = require('path');
const app = express();

// Middleware
app.use(express.json()); // Important for req.body parsing, replaces body-parser

// DB Config
const db = require('./config/keys').mongoURI;
console.log("Loaded URI:", db);

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('Mongo Error:', err));

// Use Routes
app.use('/api/items', items); // Mount item routes

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){ 
    // /Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
         res.sendFile(Path.resolve(__dirname, 'client', 'build', 'index.html'));    
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));


