const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const app = express();

connectDB();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(bodyParser.json());
app.use('/api/todo', require('./routes/todo'));

app.listen(port, () => {
  console.log('Listening on port 5000');
});
