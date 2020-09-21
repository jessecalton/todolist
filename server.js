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
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // This is anything that is not the aforementioned backend routes
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
  // This is saying "look at the current directory, then look at client, then build, then load index.html"
}

app.listen(port, () => {
  console.log('Listening on port 5000');
});
