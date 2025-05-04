const express = require('express')
const app = express()
const port = 8888
const routes = require('./routes.js');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./app.db');

const sql = `
  CREATE TABLE IF NOT EXISTS watchlist (
    db_id INTEGER PRIMARY KEY AUTOINCREMENT,
    id INTEGER,
    status TEXT,
    progress TEXT,
    score TEXT,
    comment TEXT,
    title TEXT,
    image TEXT
  );
`;

db.run(sql, (err) => {
  if (err) return console.error("Failed to create table:", err.message);
  console.log("Watchlist table created or already exists.");
});

let watchlist = [];

app.use(express.json());
app.use(express.static('public'))

app.use('/', routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
