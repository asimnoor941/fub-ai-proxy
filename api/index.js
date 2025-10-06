import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("*", async (req, res) => {
  try {
    const target =
      "https://script.google.com/macros/s/AKfycbymqHP6PzaGyIfh6yCydE17THEZEiASGpWJ13uUPNvJ0VUKRwW9q-Gm77hpgIeZy5a7jQ/exec" +
      req.url;
    const r = await fetch(target);
    const text = await r.text();
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "no-store");
    res.removeHeader?.("X-Frame-Options");
    res.removeHeader?.("Content-Security-Policy");
    res.send(text);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

// ✅ Export a handler instead of starting the server
export default (req, res) => app(req, res);
