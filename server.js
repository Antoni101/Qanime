const express = require('express')
const app = express()
const port = 8888

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

app.use(express.json());
app.use(express.static('public'))

// 👇 new route for anime search
app.get('/api/anime', async (req, res) => {
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

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})