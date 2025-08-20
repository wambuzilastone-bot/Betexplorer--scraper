import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { country } = req.query;

  if (!country) {
    return res.status(400).json({ error: "Missing country parameter" });
  }

  try {
    const { data } = await axios.get(`https://www.betexplorer.com/soccer/${country}/`);
    const $ = cheerio.load(data);

    let leagues = [];
    $("a.league-link").each((i, el) => {
      const league = $(el).text().trim();
      if (league) leagues.push(league);
    });

    res.status(200).json(leagues);
  } catch (error) {
    res.status(500).json({ error: "Failed to scrape leagues" });
  }
}
