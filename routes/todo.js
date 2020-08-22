var express = require('express');
var router = express.Router();
const Todo = require('../models/todo');

/* GET home page. */
router.get('/', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
