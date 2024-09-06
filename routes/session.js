const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/authMiddleware');
const db = require('../models/db');

// Session Scheduling Page
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('session', {
    user: req.user,
  });
});

// Create New Session Handle
router.post('/create', ensureAuthenticated, (req, res) => {
  const { mentorId, menteeId, scheduledTime } = req.body;

  db.query(
    'INSERT INTO sessions (mentor_id, mentee_id, scheduled_time) VALUES ($1, $2, $3)',
    [mentorId, menteeId, scheduledTime],
    (err, result) => {
      if (err) {
        req.flash('error_msg', 'Error creating session');
        res.redirect('/session');
      } else {
        req.flash('success_msg', 'Session scheduled successfully');
        res.redirect('/dashboard');
      }
    }
  );
});

module.exports = router;
