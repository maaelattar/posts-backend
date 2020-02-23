const express = require('express');

const postsController = require('../controllers/posts');

const checkAuth = require('../middleware/check-auth');
const parser = require('../middleware/extract-image');
const router = express.Router();

router.param('id', postsController.populatePost);

router.post('', checkAuth, parser, postsController.createPost);
router.get('', postsController.getPosts);

router.get('/:id', postsController.getPost);
router.delete('/:id', checkAuth, postsController.deletePost);

router.put('/:id', checkAuth, parser, postsController.updatePost);

module.exports = router;
