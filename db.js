const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./app.db');

function saveWatchlist(watchlistArray, callback) {
  db.run(`DELETE FROM watchlist`, [], function (err) {
    if (err) return callback(err);

    const sql = `INSERT INTO watchlist(id, status, progress, score, comment, title, image)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const stmt = db.prepare(sql);

    for (const anime of watchlistArray) {
      stmt.run([
        anime.id,
        anime.status,
        anime.progress,
        anime.userScore,
        anime.userComment,
        anime.title,
        anime.image
      ]);
    }

    stmt.finalize(callback);
  });
}

module.exports = {
    saveWatchlist,
    db
};
  
