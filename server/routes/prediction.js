const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const predictionsController = require('../controllers/predictionController');
const db = require('../db');

// GET all predictions
const getAllPredictions = async (req, res) => {
  try {
    const predictions = await db.getAllPredictions();
    return res.status(200).json(predictions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET prediction by id
const getPredictionById = async (req, res) => {
  try {
    const { id } = req.params;
    const prediction = await db.getPredictionById(id);
    if (!prediction) {
      return res.status(404).json({ error: 'Prediction not found' });
    }
    return res.status(200).json(prediction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET all predictions (requires authentication)
router.get('/', authMiddleware, predictionsController.getAllPredictions);

// GET prediction by id (requires authentication)
router.get('/:id', authMiddleware, predictionsController.getPredictionById);

module.exports = router;
