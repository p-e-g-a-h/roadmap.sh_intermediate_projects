#!/usr/bin/env node
const { program } = require("commander");
const express = require("express");
const { createClient } = require("redis");

const app = express();

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Error", err));

const redisConnect = async () => {
  await redisClient.connect();
  console.log("connected to redis");
};

program
  .option("--port <number>")
  .option("--origin <url>")
  .action(async (options) => {
    const { port = 3000, origin } = options;

    await redisConnect();

    app.get("/{*splat}", async (req, res) => {
      const cacheKey = req.originalUrl;
      try {
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          res.set("X-Cache", "HIT");
          return res.json(JSON.parse(cachedData));
        }

        const response = await fetch(`${origin}${cacheKey}`);
        const data = await response.json();

        await redisClient.set(cacheKey, JSON.stringify(data), { EX: 3600 });
        res.set("X-Cache", "MISS");
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: "proxy error" });
      }
    });

    app.listen(port, () => console.log(`server is running on port ${port}`));
  });

program.command("clear-cache").action(async (options) => {
  await redisConnect();
  await redisClient.FLUSHALL();
  console.log("cache cleared.");
  process.exit(0);
});

program.parse();
