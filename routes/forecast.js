import express from "express";
import { getForecastData } from "../utils/weatherUtils.js";
import { extractDailyData } from "../utils/weatherUtils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lon, units } = req.query;

  try {
    const forecastData = await getForecastData(lat, lon, units);
    const dailyData = extractDailyData(forecastData);

    res.json(dailyData);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

export default router;
