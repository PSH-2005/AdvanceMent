const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/authMiddleware');

// Dashboard Page
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    user: req.user // user object will be available through passport
  });
});

module.exports = router;
