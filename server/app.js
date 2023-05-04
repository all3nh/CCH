require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./db/database');
const authRoutes = require('./routes/auth');
const imagesRoutes = require('./routes/images');
const predictionsRoutes = require('./routes/predictions');

const app = express();

// Middleware configuration
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static('public')); // Serve static files from the public directory

// Connect to the database
database.connect();

// Routes configuration
app.use('/api/auth', authRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/predictions', predictionsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
