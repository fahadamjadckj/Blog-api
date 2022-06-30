const main_dirname = require('../directory_path');
const path = require('path');

/**
 * 
 *  simply finds the image from imageid in url params  or image_url property
 *  of Post object which  returns the link to image.
 */

function get_image(req, res, next) {
    const filename = req.params.imageid;
    const options = {
        root: '/home/fahad/Blog-api/images',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile(filename, options, function(err) {
        if(err) {
            console.log(err);
        }
        else{
            console.log('file sent');
        }
    });

};

module.exports = get_image;

