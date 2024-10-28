const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./model/User');
const PostModel = require('./model/Post'); // Make sure you have this model
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/user");

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) res.json('success');
                else res.json('incorrect');
            } else {
                res.json("no record existed");
            }
        });
});

app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

// Define Post routes
app.post('/api/posts', (req, res) => {
    const newPost = new PostModel(req.body);
    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(500).json(err));
});

app.get('/api/posts', (req, res) => {
    PostModel.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(500).json(err));
});

app.delete('/api/posts/:id', async (req, res) => {
    // Logic to delete the post by ID
    const postId = req.params.id;
    // Example: await Post.findByIdAndDelete(postId);
    res.status(204).send();
});

app.post('/api/posts/:id/reply', async (req, res) => {
    const postId = req.params.id;
    const replyText = req.body.text;
    // Logic to add the reply to the post
    // Example: await Post.findByIdAndUpdate(postId, { $push: { replies: { text: replyText } } });
    res.status(201).send();
});

app.post('/api/posts/:id/like', async (req, res) => {
    const postId = req.params.id;
    // Logic to increment the like count
    // Example: await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
    res.status(200).send();
});

app.patch('/api/posts/:id/like', async (req, res) => {
    const postId = req.params.id;
    // Logic to increment likes for the post
});


app.post('/api/posts/:id/dislike', async (req, res) => {
    const postId = req.params.id;
    // Logic to increment the dislike count
    // Example: await Post.findByIdAndUpdate(postId, { $inc: { dislikes: 1 } });
    res.status(200).send();
});
app.patch('/api/posts/:id/dislike', async (req, res) => {
    const postId = req.params.id;
    // Logic to increment dislikes for the post
});
app.get('/api/users/me', (req, res) => {
    // Logic to get the user profile
});


app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
