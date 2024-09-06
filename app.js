const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./models/db');

// Load environment variables
dotenv.config();

// Passport Config
require('./config/passport-config')(passport);

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');

// Express Session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Global Variables for Flash Messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/profile', require('./routes/profile'));
app.use('/video', require('./routes/video'));
app.use('/analysis', require('./routes/analysis'));
app.use('/session', require('./routes/session'));

// Database Connection Check
db.connect((err) => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Database connected');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
