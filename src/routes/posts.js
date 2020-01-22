const express = require('express')

const postsController = require('../controllers/posts')

const checkAuth = require('../middleware/check-auth')
const extractFile = require('../middleware/file')

const router = express.Router()

router.post('', checkAuth, extractFile, postsController.createPost)
router.get('', postsController.getPosts)

router.put('/:id', checkAuth, extractFile, postsController.updatePost)
router.delete('/:id', checkAuth, extractFile, postsController.deletePost)
router.get('/:id', postsController.getPost)

module.exports = router