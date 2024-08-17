const router = require('express').Router();
const { Comment } = require('../models');

// Create a new comment
router.post('/', async (req, res) => {
  try {
    if (!req.session.user_id) {
      res.status(403).json({ message: 'You must be logged in to comment' });
      return;
    }
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id // assuming you have user_id in session
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a comment by id
router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json({ message: 'Comment updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment by id
router.delete('/:id', async (req, res) => {
  try {
    const affectedRows = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
