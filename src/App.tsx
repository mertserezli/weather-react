import './App.css';
import React, {useState} from "react";
import Results from "./results"

import IF from "./IfComponent"

require('dotenv').config();

interface weather{
    main: {temp: number};
    name: string;
    sys: {country: string}
    weather: Array<{main:string}>
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState<weather>({main:{temp:0}, name:"", sys:{country:""}, weather:[{main:""}]});
    const [error, setError] = useState(false);

    const search = (evt:React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key === "Enter") {
            fetch(`https://weather-react-server.herokuapp.com/weather?query=${query}`)
                .then(res => res.json())
                .then(result => {
                    if(result.message === "city not found") {
                        setWeather({main: {temp: 0}, name: "", sys: {country: ""}, weather: [{main: ""}]});
                        setError(true);
                    }else{
                        setWeather(result);
                        setError(false);
                    }
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
                <IF condition={weather.name !== ""}>
                    <Results name={weather.name} countryCode={weather.sys.country} temp={weather.main.temp} weather={weather.weather[0].main}/>
                </IF>
                <IF condition={error}>
                    <div data-testid="results">
                        <div className="location-box">
                        <div className="location" data-testid="location">Error city not found</div>
                        </div>
                    </div>
                </IF>
            </main>
        </div>
    );
}

export default App;
