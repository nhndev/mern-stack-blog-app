const express = require('express');
const router = express.Router();

const fileUpload = require('express-fileupload');
const fileUploadOptions = {
    useTempFiles: true,
    tempFileDir: '/tmp/'
};

const postsController = require('../controllers/posts.controller');

router.get('/', postsController.getPosts);
router.get('/:id', postsController.getPost);
router.post('/', fileUpload(fileUploadOptions), postsController.createPost);
router.put('/:id', fileUpload(fileUploadOptions), postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;