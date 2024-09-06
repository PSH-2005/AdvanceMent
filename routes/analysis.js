const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/authMiddleware');
const openai = require('openai');

// Mentee Contribution Analysis Page
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('contributionFeedback');
});

// Analyze Contribution Handle
router.post('/analyze', ensureAuthenticated, async (req, res) => {
  const { contribution } = req.body;

  try {
    const response = await openai.Completion.create({
      model: "text-davinci-003",
      prompt: `Analyze this mentee contribution: ${contribution}`,
      max_tokens: 200,
    });

    const analysis = response.data.choices[0].text;

    res.render('contributionFeedback', {
      analysis,
    });
  } catch (error) {
    req.flash('error_msg', 'Error analyzing contribution');
    res.redirect('/analysis');
  }
});

module.exports = router;
