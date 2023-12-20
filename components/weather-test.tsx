"use client";

import React, { useEffect, useState } from "react";
import { WeatherTestDTO } from "@/frontend-types/weather-test-DTO";

// TODO: Delete this
export default function WeatherTest() {
    const [weatherData, setWeatherData] = useState<WeatherTestDTO | undefined>();

    useEffect(() => {
        function fetchWeatherData(latitude: number, longitude: number) {
            fetch(`api/weather?latitude=${latitude}&longitude=${longitude}`).then((response) => {
                response.json().then((responseBody) => setWeatherData(responseBody));
            });
        }

        navigator.geolocation.getCurrentPosition(
            (location) => {
                fetchWeatherData(location.coords.latitude, location.coords.longitude);
            },
            (error) => {
                console.log("Could not fetch weather: " + error);
            },
        );
    }, []);

    return (
        <div>
            {weatherData ? (
                <div className={"text-center"}>
                    <p>Location: {weatherData.location}</p>
                    <p>Local time: {weatherData.local_time}</p>
                    <p>Precipitation: {weatherData.precipitation}</p>
                    <p>Temperature: {weatherData.degrees}C</p>
                    <p>Condition: {weatherData.condition}</p>
                </div>
            ) : (
                <p className={"animate-pulse text-center text-2xl"}>Loading weather data...</p>
            )}
        </div>
    );
}
