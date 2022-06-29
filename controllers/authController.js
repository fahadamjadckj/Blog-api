const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const User = require('../models/user');
const debug = require('debug')('auth');

module.exports.handleAuth = function(req, res, next) {

    /**
     * 
     * checking if the username and password are correct and assigning the token:
     * if both username and password are correct assign assign the token esle dont;
     * 
     */
    debug('username: ' + req.body.username);
    debug('password: ' + req.body.password);
    User.findOne({username: req.body.username}, function(err, user) {
        if(err) {
            // logging error:
            debug('auth error: ' + err);
            next(err);
        }

        //console.log(user);
        if(user!=null) {
            if(req.body.password === user.password) {
                const token = jwt.sign({user: user, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 48)
                }, process.env.JWT_KEY, function(err, token) {
                    res.json({
                        token: token
                    })
                });
            }
            else
            {
                // logging error:
                debug('bad auth: ' + err);
                res.status(403).json({error: 'bad auth'});
            }
            
        }
        else {
            // logging error:
            debug('not identified: ' + req.body.username);
            res.status(403).json({
                error: 'Not identified'
            });
        }
        
    });
    
}

// token checking middlware:

module.exports.checkTokenMiddleware = function(req, res, next) {
    const userToken = req.headers['authorization'];

    if (userToken !== undefined) {
        jwt.verify(userToken, process.env.JWT_KEY, function(err, decoded) {

            // if there is an error in decoding or the token has expired tell the user:

            if(err) {
                // logging error:
                debug('checktoken err: ' + err);
                res.status(403).json({
                    error: err
                })
            }
            else {
                User.findOne({username: decoded.user.username}, function(err, user) {
                    if(err) {
                        // logging error:
                        debug('Middleware query error: ' + err);
                        next(err);
                    }

                    if(user!=null) {
                        if(decoded.user.password === user.password) {
                            next();
                        }
                        else {
                            // logging error:
                            debug('checkToken wrong pass: ' + decoded.user.username);
                            res.status(403).json({
                                error: 'wrong pass'
                            });
                        }
                    }
                    else {
                        // logging error:
                        debug('checkToken null user: ' + decoded.user.username);
                        res.status(403).json({
                            error: 'bad token'
                        });
                    }
                });
            };
            
        });
    }
    else {
        debug('token undefined');
        res.status(403).json({
            message: 'please authenticate first!'
        });
    }
}
