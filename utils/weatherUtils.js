import fetch from "node-fetch";
import { API_KEY, BASE_URL } from "../config/index.js";

const cache = {};

export const getWeatherData = async (infoType, searchParams) => {
  const cacheKey = JSON.stringify({ infoType, searchParams });

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const url = new URL(`${process.env.BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const response = await fetch(url);
  const data = await response.json();

  cache[cacheKey] = data;

  return data;
};

export const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    weather,
    sys: { country, sunrise, sunset },
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    weather,
    country,
    sunrise,
    sunset,
    speed,
    details,
    icon,
  };
};

export const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  return formattedCurrentWeather;
};

export const getForecastData = async (lat, lon, units) => {
  const url = new URL(`${BASE_URL}/forecast`);
  url.search = new URLSearchParams({ lat, lon, units, appid: API_KEY });

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const extractDailyData = (forecastData) => {
  const groupedByDate = {};
  forecastData.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(item);
  });

  const dailyData = Object.values(groupedByDate).map((items) => {
    const dataForDay = items.find((item) => item.dt_txt.includes("12:00:00"));

    if (!dataForDay) {
      return null;
    }

    return dataForDay;
  });

  const filteredDailyData = dailyData.filter((item) => item !== null);

  return filteredDailyData;
};
