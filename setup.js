const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create users table
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`);

// Create watchlist table
db.run(`CREATE TABLE IF NOT EXISTS watchlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  anime_id INTEGER,
  title TEXT,
  episodes INTEGER,
  cover TEXT,
  progress INTEGER,
  status TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
)`);

db.close();
