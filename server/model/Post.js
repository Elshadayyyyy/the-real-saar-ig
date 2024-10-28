const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;
