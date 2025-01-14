const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models/db');

// Login Page
router.get('/login', (req, res) => res.render('auth/login'));

// Register Page
router.get('/register', (req, res) => res.render('auth/register'));

// Register Handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('auth/register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    db.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
      if (err) throw err;
      if (result.rows.length > 0) {
        errors.push({ msg: 'Email already exists' });
        res.render('auth/register', { errors, name, email, password, password2 });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;
          db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hash],
            (err, result) => {
              if (err) throw err;
              req.flash('success_msg', 'You are now registered and can log in');
              res.redirect('/login');
            }
          );
        });
      }
    });
  }
});

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) throw err;
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
});

module.exports = router;
