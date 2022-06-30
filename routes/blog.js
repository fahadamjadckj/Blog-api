const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authController = require('../controllers/authController');
const cors = require('cors');
const app = require('../app');
const compression = require('compression');
const imageController = require('../controllers/imageController');
const multer = require('multer');
const path = require('path');
const main_dirname = require('../directory_path');

/**
 *  Configuration for storing of images that are received from multipart form,
 * May add file type and size validation in future.
 */
const fileStorageEngine = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(main_dirname(), '/images'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
});
const upload = multer({storage: fileStorageEngine});

router.use(compression());

router.post('/authenticate', authController.handleAuth) 

router.get('/images/:imageid', imageController);

router.get('/posts', postsController.list_posts);

router.get('/posts/:postid', postsController.single_post);

router.post('/posts', authController.checkTokenMiddleware, upload.single('post_image'), postsController.create_post);

router.put('/posts/:postid', authController.checkTokenMiddleware, postsController.update_post);

router.delete('/posts/:postid', authController.checkTokenMiddleware, postsController.delete_post);

module.exports = router;

