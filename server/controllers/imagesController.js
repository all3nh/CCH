const db = require('../db');

// GET all images
const getAllImages = async (req, res) => {
  try {
    const images = await db.getAllImages();
    return res.status(200).json(images);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET image by id
const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await db.getImageById(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    return res.status(200).json(image);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllImages,
  getImageById,
};
