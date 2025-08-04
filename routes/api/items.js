const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');
const { verifyToken } = require('../../middleware/auth');

// GET Items (Protected)
router.get('/', verifyToken, (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Add/POST Item
router.post('/', verifyToken, (req, res) => {
  const newItem = new Item({ name: req.body.name });
  newItem.save()
    .then(item => res.json(item))
    .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE Item
router.delete('/:id', verifyToken, (req, res) => {
  Item.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ msg: 'Item not found or already deleted' });
      }
      res.json({ msg: 'Item successfully deleted' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;

// https://github.com/SanskritiUniyal/FirstRepo.git
