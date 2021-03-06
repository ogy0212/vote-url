const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('./models/post');

router.use((req, res, next) => {
  console.log(`Time:${Date.now()}, Method:${req.method}, Path:${req.path}`);
  next();
})

router.get('/posts', (req, res) => {
  Post.find().then(records => {
    if(records) {
      res.send(records);
    } else {
      res.send([]);
    }
  })
})
router.post('/posts', (req, res) => {
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    url: req.body.url
  })
  post.save((err, record) => {
    if(err) {
      return res.status(400).send('internal error');
    }
    res.send(record);
  })
})
router.put('/posts/:id/upvote', (req, res) => {
  Post.findById(req.params.id, (err, record) => {
    if(err) {
      return res.status(400).send('internal error');
    }
    if(!record) {
      return res.status(404).send('not found');
    }
    record.votes = record.votes + 1;
    record.save();
    res.send(record);
  })
})
router.put('/posts/:id/downvote', (req, res) => {
  Post.findById({_id: req.params.id}, (err, record) => {
    if(err) {
      return res.status(400).send('internal error');
    }
    if(!record) {
      return res.status(404).send('not found');
    }
    record.votes = record.votes - 1;
    record.save();
    res.send(record);
  })
})
router.delete('/posts/:id', (req, res) => {
  Post.deleteOne({_id: req.params.id}, (err, record) => {
    if(err) {
      return res.status(400).send('internal error');
    }
    if(!record) {
      return res.status(404).send('not found');
    }
    res.send(record);
  })
})

module.exports = router;
