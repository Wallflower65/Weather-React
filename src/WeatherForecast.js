import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false); 

    if (props.coordinates) {
      let apiKey = "787ofe478b86fc75394a34e4469a2t40"; 
      let longitude = props.coordinates.longitude;
      let latitude = props.coordinates.latitude;
      let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

      axios.get(apiUrl).then((response) => {
        setForecast(response.data.daily);
        setLoaded(true);
      });
    }
  }, [props.coordinates]); 

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="forecast-grid">
          {forecast.map(function (dailyForecast, index) {
            if (index < 7) {
              return (
                <div className="forecast-day-wrapper" key={index}>
                  <WeatherForecastDay data={dailyForecast} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    return <div className="loading-forecast">Loading forecast...</div>;
  }
}