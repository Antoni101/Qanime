const express = require('express');
const router = express.Router();
const { saveWatchlist } = require('./db'); // ← this line is key
const db = require('./db').db;



router.get('/api/anime', async (req, res) => {
    const query = req.query.q;
    try {
        const jikanRes = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
        const data = await jikanRes.json();
        res.json(data);
    } catch (err) {
        console.error("Failed to fetch from Jikan:", err);
        res.status(500).json({ error: "Failed to fetch anime" });
    }
});
  
router.get('/api/anime/:id', async (req, res) => {
    const animeId = req.params.id;
    try {
      const jikanRes = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
      const data = await jikanRes.json();
      res.json(data);
    } catch (err) {
      console.error("Failed to fetch from Jikan:", err);
      res.status(500).json({ error: "Failed to fetch anime" });
    }
});

router.get('/api/anime/:id/reviews', async (req, res) => {
    const animeId = req.params.id;
    try {
      const jikanRes = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/reviews`);
      const data = await jikanRes.json();
      res.json(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      res.status(500).json({ error: "Failed to fetch anime reviews" });
    }
});

router.post('/api/watchlist/save', (req, res) => {
  const newWatchlist = req.body;

  saveWatchlist(newWatchlist, (err) => {
    if (err) {
      console.error("DB save failed:", err);
      return res.status(500).json({ error: "Failed to save watchlist" });
    }
    res.json({ success: true });
  });
});

router.get('/api/watchlist', (req, res) => {
  const sql = `SELECT * FROM watchlist`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Failed to fetch watchlist:", err);
      return res.status(500).json({ error: "Failed to load watchlist" });
    }

    // Strip DB ID before sending
    const cleaned = rows.map(({ db_id, ...rest }) => rest);
    res.json(cleaned);
  });
});


module.exports = router;
