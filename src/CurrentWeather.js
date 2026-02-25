import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import "./CurrentWeather.css";

export default function CurrentWeather(props) {
  const iconMapping = {
    "Clear": "CLEAR_DAY",
    "Clouds": "CLOUDY",
    "Rain": "RAIN",
    "Snow": "SNOW",
  };

  const currentIcon = iconMapping[props.data.description] || "CLEAR_DAY";

  return (
    <div className="CurrentWeather">
      <div className="weather-header">
        <h1>{props.data.city}</h1>
        <p className="text-muted">
          {}
          Last updated: Today
        </p>
      </div>

      <div className="weather-details-grid">
        <div className="temperature-section">
          <div className="float-left">
            <ReactAnimatedWeather
              icon={currentIcon}
              color="#f5a623"
              size={64}
              animate={true}
            />
          </div>
          <div className="float-left temperature-display">
            <span className="temperature">{Math.round(props.data.temperature)}</span>
            <span className="unit">°C</span>
          </div>
        </div>

        <div className="metrics-section">
          <ul>
            <li className="text-capitalize">Condition: {props.data.description}</li>
            <li>Humidity: <strong>{props.data.humidity}%</strong></li>
            <li>Wind: <strong>{Math.round(props.data.wind)} km/h</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}