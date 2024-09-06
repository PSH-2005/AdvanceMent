const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models/db');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      db.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
        if (err) throw err;

        if (result.rows.length > 0) {
          const user = result.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        } else {
          return done(null, false, { message: 'That email is not registered' });
        }
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
      if (err) throw err;
      done(err, result.rows[0]);
    });
  });
};
