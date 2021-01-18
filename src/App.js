import './App.css';
import React, {useState} from "react";

require('dotenv').config();

const api = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/weather?q="
};

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    };

    return (
        <div className="app">
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                <div>
                    <div className="location-box">
                        <div className="location">City Name</div>
                        <div className="date">{new Date().toDateString()}</div>
                    </div>
                    <div className="weather-box">
                        <div className="temp">
                            15°c
                        </div>
                        <div className="weather">Sunny</div>
                    </div>
                </div>
                ) : ('')}
            </main>
        </div>
    );
}

export default App;
