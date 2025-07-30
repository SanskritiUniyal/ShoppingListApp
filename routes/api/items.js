const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');

// @route GET /api/items
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => res.status(500).json({ error: err.message }));
});

// @route POST /api/items
router.post('/', (req, res) => {
  console.log('Incoming body:', req.body);
  const newItem = new Item({ name: req.body.name });

  newItem.save()
    .then(item => {
      console.log('Item saved:', item);
      res.json(item);
    })
    .catch(err => {
      console.error('Error saving item:', err);
      res.status(500).json({ error: err.message });
    });
});

// @route DELETE /api/items/:id
router.delete('/:id', (req, res) => {
  const itemId = req.params.id;

  Item.deleteOne({ _id: itemId })
    .then(result => {
      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Item not found or already deleted'
        });
      }

      res.json({ success: true, message: 'Item successfully deleted' });
    })
    .catch(err => {
      console.error('Error deleting item:', err.message);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;




// https://github.com/SanskritiUniyal/FirstRepo.git