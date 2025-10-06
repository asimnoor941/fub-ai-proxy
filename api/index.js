import fetch from "node-fetch";

/**
 * Vercel Serverless Function (no express needed)
 * Works as a proxy for your Google Apps Script
 */
export default async function handler(req, res) {
  try {
    const target =
      "https://script.google.com/macros/s/AKfycbymqHP6PzaGyIfh6yCydE17THEZEiASGpWJ13uUPNvJ0VUKRwW9q-Gm77hpgIeZy5a7jQ/exec" +
      (req.url || "");

    const response = await fetch(target);
    const html = await response.text();

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "no-store");
    // Remove frame blocking
    res.removeHeader?.("X-Frame-Options");
    res.removeHeader?.("Content-Security-Policy");

    res.status(200).send(html);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
}
