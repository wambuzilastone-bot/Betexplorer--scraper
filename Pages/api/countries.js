import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get("https://www.betexplorer.com/soccer/");
    const $ = cheerio.load(data);

    let countries = [];
    $("select[name='country_id'] option").each((i, el) => {
      const country = $(el).text().trim();
      if (country && country !== "Select country") {
        countries.push(country);
      }
    });

    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: "Failed to scrape countries" });
  }
}
