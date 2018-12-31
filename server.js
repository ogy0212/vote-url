const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/readingit', { useNewUrlParser: true });

const path = require('path');

const api = require('./server/api');

app.use('/api', api);
app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname, 'dist/index.html'))
});

app.listen(3000, () => console.log('listening on port 3000'));
