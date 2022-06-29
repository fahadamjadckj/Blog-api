const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const PostSchema = new Schema({
    title: { type: String, required: true, maxLength: 60 },
    html: {type: String, required: true},
    date_published: {type: Date, default: new Date},
    Author: {type: String, default: 'Fahad Amjad'}
});

PostSchema
    .virtual('date_published_formatted')
    .get(() => {
        return DateTime.fromJSDate(this.date_published).toLocaleString(DateTime.DATE_MED);
    })

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel; 