require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { pool } = require('./db/database');
const authMiddleware = require('./middleware/auth');
const imageUploadMiddleware = require('./middleware/imageUpload');
const authRoutes = require('./routes/auth');
const imagesRoutes = require('./routes/images');
const predictionsRoutes = require('./routes/prediction');
const registrationRoutes = require('./routes/registration');
const loginRoutes = require('./routes/login');

const app = express();

// Middleware configuration
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static('public')); // Serve static files from the public directory

// Routes configuration
app.use('/auth', authRoutes);
app.use('/images', imageUploadMiddleware, imagesRoutes);
app.use('/predictions', authMiddleware, predictionsRoutes);

app.use('/registration', registrationRoutes);
app.use('/login', loginRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, res) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Successfully connected to the database:', res.rows[0]);
  });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

// Authentication error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
});
