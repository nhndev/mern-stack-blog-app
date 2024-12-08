const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: String,
    content: String,
    summary: String,
    cover: String,
}, {
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema);