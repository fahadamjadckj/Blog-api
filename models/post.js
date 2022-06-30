const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const PostSchema = new Schema({
    title: { type: String, required: true, maxLength: 60 },
    html: {type: String, required: true},
    date_published: {type: Date, default: Date.now()},
    Author: {type: String, default: 'Fahad Amjad'},
    image: {type: String, required: true} 
});

PostSchema
    .virtual('date_published_formatted')
    .get(() => {
        return DateTime.fromJSDate(this.date_published).toLocaleString(DateTime.DATE_MED);
    });

PostSchema
    .virtual('image_url')
    .get(function() {
        return '/api/images/' + this.image;
    });

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel; 