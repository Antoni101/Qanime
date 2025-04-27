const express = require('express');
const router = express.Router();

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

module.exports = router;
