import React, { useState } from "react";
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

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
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
        </div>
      </div>
    );
  } else {
    search();
    return <div className="loading">Loading beautiful weather...</div>;
  }
}