const express = require("express");
const { Pool } = require("pg");
const { createClient } = require("redis");

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const redis = createClient({ url: process.env.REDIS_URL });

app.get("/api/visits", async (req, res) => {
  try {
    await pool.query("INSERT INTO visits DEFAULT VALUES");
    const { rows } = await pool.query("SELECT COUNT(*)::int AS n FROM visits");
    const cached = await redis.incr("hits");
    res.json({ postgres: rows[0].n, redis: cached });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

(async () => {
  await redis.connect();
  await pool.query(
    "CREATE TABLE IF NOT EXISTS visits (id SERIAL PRIMARY KEY, at TIMESTAMPTZ DEFAULT now())"
  );
  app.listen(5000, "0.0.0.0", () => console.log("API on 5000"));
})().catch((e) => { console.error(e); process.exit(1); });