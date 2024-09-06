CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER REFERENCES users(id),
  mentee_id INTEGER REFERENCES users(id),
  scheduled_time TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
