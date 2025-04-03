const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/notifications", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  setInterval(() => {
    const priceChange = Math.random() * 2000 - 1000; // Simulate price change
    const bitcoinPrice = 50000 + priceChange;
    const ethereumPrice = 3000 + priceChange / 10;
    const weatherAlerts = ["Thunderstorm", "Heavy Rain", "Extreme Heat", "Normal"][Math.floor(Math.random() * 4)];

    const notification = {
      type: Math.random() > 0.5 ? "price_alert" : "weather_alert",
      bitcoin: { usd: bitcoinPrice },
      ethereum: { usd: ethereumPrice },
      weather: weatherAlerts,
    };

    res.write(`data: ${JSON.stringify(notification)}\n\n`);
  }, 8000); // Send updates every 8 seconds
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
