const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const api = require('./server/api');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', api);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/readingit', { useNewUrlParser: true });


app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname, 'dist/index.html'))
});

app.listen(3000, () => console.log('listening on port 3000'));
