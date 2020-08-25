var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Todo = require('../models/Todo');

/* GET home page. */
router.get('/', auth, (req, res, next) => {
  Todo.find({ user: req.user.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.post(
  '/',
  [auth, [check('action', 'Action field is empty').not().isEmpty()]],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { action, timeline } = req.body;

    try {
      const newTodo = new Todo({
        action,
        timeline,
        user: req.user.id,
      });

      const todo = await newTodo.save();
      res.json(todo);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server err');
    }
  }
);

router.delete('/:id', (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
