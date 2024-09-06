const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/authMiddleware');

// Video Session Page (Jitsi Meet Integration)
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('video', {
    user: req.user
  });
});

module.exports = router;
