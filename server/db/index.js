const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
//const { Pool } = require('pg');
const app = express();
app.use(bodyParser.json());

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database:', err.stack);
    process.exit(1);
  });
