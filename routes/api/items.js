const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');
const { verifyToken } = require('../../middleware/auth');

// 🔐 GET items for logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📝 Add new item for logged-in user
router.post('/', verifyToken, async (req, res) => {
  console.log('User ID from token:', req.user.id);
  console.log('Request body:', req.body);
  try {
    const newItem = new Item({
      name: req.body.name,
      user: req.user.id
    });
    const saved = await newItem.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🗑 Delete item by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const result = await Item.deleteOne({ _id: req.params.id, user: req.user.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: 'Item not found or unauthorized' });
    }
    res.json({ msg: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
