const router = require('express').Router();
const postRoutes = require('./post-controller');
const userRoutes = require('./user-controller');
const commentRoutes = require('./comment-controller');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
