import { Oval } from "react-loader-spinner";
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function MyWeatherComponent() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const searchWeather = async () => {
    if (!input.trim()) return;
    setWeather({ ...weather, loading: true });
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const api_key = "f00c38e0279b7bc85480c3fe775d518c";

    try {
      const response = await axios.get(url, {
        params: {
          q: input,
          units: "metric",
          appid: api_key,
        },
      });
      console.log("Weather Data Response =>", response);
      setWeather({ data: response.data, loading: false, error: false });
    } catch (error) {
      setWeather({ ...weather, data: {}, error: true });
      setInput("");
      console.error("Error fetching weather data", error);
    }
  };

  return (
    <div className="App">
      <h1 className="app-name" style={{ color: "blue", marginBottom: "20px", fontSize: "50px" }}>
        Weather App
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          style={{ width: "300px", height: "30px", padding: "10px", borderRadius: "10px" }}
        />
        <button onClick={searchWeather} style={{ marginLeft: "10px", padding: "10px", borderRadius: "10px" }}>
          Search
        </button>
      </div>

      {weather.loading && (
        <>
          <br />
          <br />
          <Oval type="Oval" color="black" height={100} width={100} />
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontSize: "30px" }}>City not found, please check the city name</span>
          </span>
        </>
      )}

      {weather.data && weather.data.main && (
        <div>
          <div className="city-name" style={{ fontSize: "20px", margin: "20px" }}>
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>

          <div className="icon-temp">
            <img
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            <div style={{ fontSize: "20px" }}>
              {Math.round(weather.data.main.temp)}<sup className="deg">°C</sup>
            </div>
            <div style={{ fontSize: "20px" }}>
              Humidity: {weather.data.main.humidity}%
            </div>
          </div>

          <div className="des-wind" style={{ fontSize: "20px" }}>
            <p>Weather description: {weather.data.weather[0].description}</p>
            <p>Wind Speed: {weather.data.wind.speed} m/s</p>
          </div>

          <div className="sun-times" style={{ fontSize: "20px", marginTop: "20px" }}>
            <p>Sunrise: {formatTime(weather.data.sys.sunrise)}</p>
            <p>Sunset: {formatTime(weather.data.sys.sunset)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyWeatherComponent;
