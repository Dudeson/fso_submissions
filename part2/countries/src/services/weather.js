import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const getWeather = (lat, lng) =>
  axios
    .get(BASE_URL, {
      params: {
        latitude: lat,
        longitude: lng,
        current: "temperature_2m,wind_speed_10m,weather_code",
      },
    })
    .then((res) => res.data.current);

export default { getWeather };
