"use client";

import React, { useEffect, useState } from "react";
import { WeatherTestDTO } from "@/frontend-dto/weather-test-DTO";

//TODO: Delete this
export default function WeatherTest() {
    const [weatherData, setWeatherData] = useState<WeatherTestDTO | undefined>();

    useEffect(() => {
        async function fetchWeatherData(latitude: number, longitude: number) {
            const response = await fetch(`api/weather?latitude=${latitude}&longitude=${longitude}`);
            const responseBody = await response.json();
            setWeatherData(responseBody);
        }

        navigator.geolocation.getCurrentPosition(
            (location) => {
                fetchWeatherData(location.coords.latitude, location.coords.longitude);
            },
            (error) => {
                alert("No weather for you!");
            },
        );
    }, []);

    return (
        <div>
            {weatherData ? (
                <div className={"text-center"}>
                    <p>Location: {weatherData.location}</p>
                    <p>Precipitation: {weatherData.precipitation}</p>
                    <p>Temperature: {weatherData.degrees}C</p>
                </div>
            ) : (
                <p className={"animate-pulse text-center text-2xl"}>Loading weather data...</p>
            )}
        </div>
    );
}
