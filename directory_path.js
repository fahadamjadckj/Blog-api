const path = require('path');

/**
 * 
 *  returns the absolute path to Blog-api directory which can be used for
 *  providing absoulte paths to directories like images.
 * 
 */

function main_dirname() {
    return __dirname;
}

module.exports = main_dirname;