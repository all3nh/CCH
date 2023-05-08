const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

// GET /api/images/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imagesController.getImageById(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    return res.status(200).json(image);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/images
router.get('/', async (req, res) => {
  try {
    const images = await imagesController.getAllImages();
    return res.status(200).json(images);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/images
router.post('/', async (req, res) => {
  try {
    const result = await imagesController.uploadImage(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
