var express = require('express');
var router = express.Router();
const Todo = require('../models/todo');

/* GET home page. */
router.get('/', (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  Todo.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/', (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

module.exports = router;
