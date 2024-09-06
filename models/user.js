const db = require('./db');

// Fetch User by Email
function findByEmail(email) {
  return db.query('SELECT * FROM users WHERE email = $1', [email]);
}

// Fetch User by ID
function findById(id) {
  return db.query('SELECT * FROM users WHERE id = $1', [id]);
}

// Create New User
function createUser(name, email, password) {
  return db.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    [name, email, password]
  );
}

module.exports = {
  findByEmail,
  findById,
  createUser,
};
