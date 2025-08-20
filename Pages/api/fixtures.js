import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { league } = req.query;

  if (!league) {
    return res.status(400).json({ error: "Missing league parameter" });
  }

  try {
    const { data } = await axios.get(`https://www.betexplorer.com/soccer/${league}/fixtures/`);
    const $ = cheerio.load(data);

    let fixtures = [];
    $("table.sportName tr").each((i, el) => {
      const match = $(el).find("td").map((j, td) => $(td).text().trim()).get();
      if (match.length > 0) fixtures.push(match.join(" | "));
    });

    res.status(200).json(fixtures);
  } catch (error) {
    res.status(500).json({ error: "Failed to scrape fixtures" });
  }
}
