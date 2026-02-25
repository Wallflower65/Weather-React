import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherForecastDay(props) {
 
  function maxTemperature() {
    let temperature = Math.round(props.data.temperature.maximum);
    return `${temperature}°`;
  }

  function minTemperature() {
    let temperature = Math.round(props.data.temperature.minimum);
    return `${temperature}°`;
  }

  function day() {
    let date = new Date(props.data.time * 1000);
    let day = date.getDay();
    
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    return days[day];
  }

  const iconMapping = {
    "clear-sky-day": "CLEAR_DAY",
    "clear-sky-night": "CLEAR_NIGHT",
    "few-clouds-day": "PARTLY_CLOUDY_DAY",
    "few-clouds-night": "PARTLY_CLOUDY_NIGHT",
    "scattered-clouds-day": "CLOUDY",
    "scattered-clouds-night": "CLOUDY",
    "broken-clouds-day": "CLOUDY",
    "broken-clouds-night": "CLOUDY",
    "shower-rain-day": "RAIN",
    "shower-rain-night": "RAIN",
    "rain-day": "RAIN",
    "rain-night": "RAIN",
    "thunderstorm-day": "RAIN",
    "thunderstorm-night": "RAIN",
    "snow-day": "SNOW",
    "snow-night": "SNOW",
    "mist-day": "FOG",
    "mist-night": "FOG",
  };

  const currentIcon = iconMapping[props.data.condition.icon] || "CLEAR_DAY";

  return (
    <div className="WeatherForecastDay">
      <div className="forecast-time">{day()}</div>
      
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={currentIcon}
          color="#f5a623"
          size={36} 
          animate={true}
        />
      </div>
      
      <div className="forecast-temperatures">
        <span className="forecast-temperature-max">
          {maxTemperature()}
        </span>
        <span className="forecast-temperature-min">
          {minTemperature()}
        </span>
      </div>
    </div>
  );
}