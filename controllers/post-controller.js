const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [User, Comment]
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [User, Comment]
    });
    if (!post) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id // assuming you have user_id in session
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post by id
router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post by id
router.delete('/:id', async (req, res) => {
  try {
    const affectedRows = await Post.destroy({
      where: {
        id: req.params.id
      }
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

