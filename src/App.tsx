import './App.css';
import React, {useState} from "react";
import Results from "./results"

require('dotenv').config();

const api = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/weather?q="
};

interface weather{
    main: {temp: number} | undefined;
    name: string;
    sys: {country: string}
    weather: Array<{main:string}>
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState<weather>({main:undefined, name:"", sys:{country:""}, weather:[{main:""}]});

    const search = (evt:React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key === "Enter") {
            fetch(`${api.base}${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                });
        }
    };

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                        data-testid="search-bar"
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                <Results name={weather.name} countryCode={weather.sys.country} temp={weather.main.temp} weather={weather.weather[0].main}/>
                ) : ('')}
            </main>
        </div>
    );
}

export default App;
