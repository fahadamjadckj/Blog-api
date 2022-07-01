const Post = require('../models/post');
const { body, validationResult} = require("express-validator");
const debug = require('debug')('post');

module.exports.single_post = function(req, res, next) {
    Post.findById({_id: req.params.postid}, function(err, post) {
        if(err) {
            // logging error:
            debug('single post error: ' + err);
            next(err);
        }
        else if(post==null) {
            res.json({error : 'post not found'});
        }
        else {
            res.json({post});
        }
    });
}

module.exports.list_posts = function(req, res, next) {
    Post.find({}, function(err, all_posts) {
        if (err) {
            // logging error:
            debug('all_posts_lists error: ' + err);
            next(err);
        }
        else{
            res.json({posts: all_posts});
        }
    });
}

module.exports.create_post = [

    body('title', 'no title').trim().isLength({min: 1}).escape(),
    body('html', 'no html').trim().isLength({min: 1}),
    body('date_published').trim().optional({checkFalsy: true}).escape(),
    body('author').trim().optional({checkFalsy: true}).escape(),
    body('post_image', 'no image specified'),

    (req, res, next) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            // logging error:
            debug('create post error: ' + errors);
            res.status(403).json({error: 'incomplete data'});
        }
        else {
            const NewPost = new Post({
                title: req.body.title,
                html: req.body.html,
                image: req.file.filename
            });

            if(req.body.date_published!=='') {
                NewPost.date_published = req.body.date_published;
            }
            if(req.body.author!=='') {
                NewPost.Author = req.body.author;
            }

            NewPost.save((err, post) => {
                if(err) {
                    // logging error:
                    debug('New post save error: ' + err);
                    next(err);
                }
                else{
                    res.json({
                        message: 'post created',
                        post: post
                    });
                }
                
            });
        }
    }

];


/**
 *  Updates a pre-existing post:
 * 
 */
module.exports.update_post = [

    body('title', 'no title').trim().isLength({min: 1}).escape(),
    body('html', 'no html').trim().isLength({min: 1}).escape(),
    body('date_published').trim().optional({checkFalsy: true}).escape(),
    body('author').trim().optional({checkFalsy: true}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            // logging error:
            debug('update post data error: ' + err);
            res.json({error: 'incomplete data'})
        }
        else {
            const update = new Post({
                title: req.body.title,
                html: req.body.html,
                _id: req.params.postid
            });

            if(req.body.date_published!=='') {
                update.date_published = req.body.date_published;
            }
            if(req.body.author!=='') {
                update.Author = req.body.author;
            }

            Post.findByIdAndUpdate({_id: req.params.postid}, update, {new: true}, function(err, post) {
                if(err) {
                    // logging error:
                    debug('post update error: ' + err);
                    next(err);
                }
                else{
                    res.json({
                        message: 'post updated',
                        post: post
                    });
                }
            })
        }

    },

]

/**
 * 
 *  deletes a post
 */

module.exports.delete_post = function(req, res, next) {
    Post.findOneAndRemove({_id:req.params.postid}, function(err, post) {
        if(err) {
            // logging error:
            debug('post delete error: ' + err);
            next(err);
        }
        else if(post==null) {
            // logging error:
            debug('no post to update: ' + 'null');
            res.status(404).json({error: 'post not found'});
        }
        else{
            res.json({
                message: 'deleted',
                post: post
            });
        }
    });
}

