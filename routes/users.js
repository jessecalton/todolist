const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

router.post(
  '/',
  [
    check('username', 'Please add name').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    let newUser = null;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    } else {
      newUser = User({
        username: req.body.username,
        password: req.body.password,
      });
    }
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(req.body.password, salt);
    await newUser.save();

    const payload = {
      user: {
        id: newUser.id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  }
);

module.exports = router;
