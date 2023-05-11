const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bigdata', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define a schema for a sample collection
const GameSchema = new mongoose.Schema({
  game: String,
  sentiment: String,
  sum: Number,
});
const PostSchema = new mongoose.Schema({
  post: String,
  parent_id: String,
  subreddit: String,
  created: Number
});

// Create a model for the collection
const GameModel = mongoose.model('games', GameSchema);
const PostModel = mongoose.model('posts', PostSchema);

// Use bodyParser middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Define a GET route to retrieve all games and posts from the database
app.get('/games', async (req, res) => {
  try {
    const games = await GameModel.find({});
    res.json(games);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await PostModel.find({});
    let newPosts = []
    for( let post of posts){
      let newPost={}
      newPost['createdAt'] = new Date(post.created * 1000);
      newPost.post = post.post.replaceAll('\"', '');
      newPost._id = post._id;
      newPost.parent_id = post.parent_id;
      console.log(newPost)
      newPosts.push(newPost)
    }
    res.json(newPosts);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});



// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});