import './App.css';
import React from "react";

require('dotenv').config();

const api = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/weather?q="
};

function App() {
    return (
        <div className="App">

        </div>
    );
}

export default App;
