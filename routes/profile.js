const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/authMiddleware');
const db = require('../models/db');

// Profile Page
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('profile', {
    user: req.user
  });
});

// Edit Profile Handle
router.post('/edit', ensureAuthenticated, (req, res) => {
  const { name, email, bio } = req.body;

  db.query(
    'UPDATE users SET name = $1, email = $2, bio = $3 WHERE id = $4',
    [name, email, bio, req.user.id],
    (err, result) => {
      if (err) {
        req.flash('error_msg', 'Error updating profile');
        res.redirect('/profile');
      } else {
        req.flash('success_msg', 'Profile updated successfully');
        res.redirect('/profile');
      }
    }
  );
});

module.exports = router;
