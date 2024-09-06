CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  mentee_id INTEGER REFERENCES users(id),
  contribution TEXT NOT NULL,
  feedback TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
