import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const WMO_DESCRIPTIONS = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Heavy freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

const Weather = ({ capital, capitalInfo }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!capitalInfo?.latlng) return;
    const [lat, lng] = capitalInfo.latlng;
    weatherService.getWeather(lat, lng).then(setWeather);
  }, [capitalInfo]);

  if (!weather) return <p>Loading weather...</p>;

  const description = WMO_DESCRIPTIONS[weather.weather_code] ?? "Unknown";

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.temperature_2m} °C</p>
      <p>Condition: {description}</p>
      <p>Wind speed: {weather.wind_speed_10m} km/h</p>
    </div>
  );
};

export default Weather;
