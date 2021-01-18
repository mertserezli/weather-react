import './App.css';
import React from "react";

require('dotenv').config();

const api = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/weather?q="
};

function App() {
    return (
        <div className="app">
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                    />
                </div>
                <div>
                    <div className="location-box">
                        <div className="location">City Name</div>
                        <div className="date">{new Date().getUTCDate()}</div>
                    </div>
                    <div className="weather-box">
                        <div className="temp">
                            15°c
                        </div>
                        <div className="weather">Sunny</div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
