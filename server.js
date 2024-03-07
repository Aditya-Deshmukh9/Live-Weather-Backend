import express from "express";
import cors from "cors";
import { PORT, CORE_OPTIONS } from "./config/index.js";
import weatherRouter from "./routes/weather.js";
import forecastRouter from "./routes/forecast.js";

const app = express();

app.use(cors(CORE_OPTIONS));
app.use("/weather", weatherRouter);
app.use("/forecast", forecastRouter);
app.use("/", (req, res) => {
  try {
    res.json({ msg: "Server started" });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
