import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import Forecast from "./Forecast";

const API_KEY = "b190a0605344cc4f3af08d0dd473dd25";

function Weather() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      setError("");
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found ❌");
      setWeather(null);
    }
  };

  return (
    <div>
      <Search setCity={setCity} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>🌡 Temp: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌥 Condition: {weather.weather[0].description}</p>
        </div>
      )}

      {weather && <Forecast city={city} />}
    </div>
  );
}

export default Weather;