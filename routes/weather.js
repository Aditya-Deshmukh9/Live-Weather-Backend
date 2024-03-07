import express from "express";
import { getFormattedWeatherData } from "../utils/weatherUtils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req;
  const { unit } = query;

  // Set default unit to metric if not provided
  const units = unit ? unit.toLowerCase() : "metric";

  try {
    const weatherData = await getFormattedWeatherData({ ...query, units });
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
