import React from "react";

interface Props {
    name: string
    countryCode: string
    temp: number
    weather: string
}

export default function Results({name, countryCode, temp, weather}: Props) {
    return (
        <div data-testid="results">
            <div className="location-box">
                <div className="location" data-testid="location">{name}, {countryCode}</div>
                <div className="date" data-testid="date">{new Date().toDateString()}</div>
            </div>
            <div className="weather-box">
                <div className="temp" data-testid="temp">
                    {Math.round(temp)}°c
                </div>
                <div className="weather" data-testid="weather">{weather}</div>
            </div>
        </div>
    );
}