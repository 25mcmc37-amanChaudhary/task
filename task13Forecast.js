import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "b190a0605344cc4f3af08d0dd473dd25";

function Forecast({ city }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetchForecast(city);
  }, [city]);

  const fetchForecast = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setForecast(res.data.list.slice(0, 5));
    } catch (err) {
      console.log("Forecast error");
    }
  };

  return (
    <div>
      <h3>📅 5-Day Forecast</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {forecast.map((item, index) => (
          <div key={index}>
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <p>{item.main.temp} °C</p>
            <p>{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;