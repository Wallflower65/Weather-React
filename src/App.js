import React from "react";
import WeatherApp from "./WeatherApp";
import "./App.css";

export default function App() {
return (
<div className="App">
<div className="container">
<WeatherApp defaultCity="Cape Town" />
</div>
</div>
);
}