import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import "./WeatherApp.css";

export default function WeatherApp(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity || "Cape Town");

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      description: response.data.condition.description,
      wind: response.data.wind.speed,
      city: response.data.city,
      icon: response.data.condition.icon
    });
  }

  function search() {
    const apiKey = "787ofe478b86fc75394a34e4469a2t40";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  useEffect(() => {
    search();
  }, []); // runs only once on load

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (!weatherData.ready) {
    return <div className="loading">Loading beautiful weather...</div>;
  }

  return (
    <div className="WeatherApp">
      <div className="app-container">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="search"
            placeholder="Enter a city..."
            className="search-input"
            autoFocus
            onChange={handleCityChange}
          />
          <input
            type="submit"
            value="Search"
            className="search-button"
          />
        </form>

        <CurrentWeather data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} />

        <footer>
          This project was coded by{" "}
          <a
            href="https://github.com/Wallflower65"
            target="_blank"
            rel="noopener noreferrer"
          >
            Phaphamani Zoneleni
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/Wallflower65/Weather-React"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://weather-react-phaphamani.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hosted on Netlify
          </a>
        </footer>

      </div>
    </div>
  );
}