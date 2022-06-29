const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authController = require('../controllers/authController');
const cors = require('cors');
const app = require('../app');
const compression = require('compression');

// const apicache = require('apicache');
// let cache = apicache.middleware;

router.use(compression());

router.post('/authenticate', authController.handleAuth) 

router.get('/posts', postsController.list_posts);

router.get('/posts/:postid', postsController.single_post);

router.post('/posts', authController.checkTokenMiddleware, postsController.create_post);

router.put('/posts/:postid', authController.checkTokenMiddleware, postsController.update_post);

router.delete('/posts/:postid', authController.checkTokenMiddleware, postsController.delete_post);

module.exports = router;

