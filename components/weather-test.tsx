"use client";

import React, { useEffect, useState } from "react";
import { WeatherTestDTO } from "@/frontend-types/weather-test-DTO";
import { Location } from "@/frontend-types/location";
import useSWR from "swr";
import { fetcher } from "@/lib/data-fetcher";

// TODO: Don't use this
export default function WeatherTest() {
    const [locationInfo, setLocationInfo] = useState<Location>();

    const {
        data: weatherData,
        error,
        isLoading,
    } = useSWR<WeatherTestDTO>(
        `${locationInfo ? `api/weather?latitude=${locationInfo.latitude}&longitude=${locationInfo.longitude}` : ""}`,
        fetcher,
        {
            onSuccess(data) {
                document.title = `Weather in ${data.location}`;
            },
        },
    );

    useEffect(() => {
        getLocation();
    }, []);

    function getLocation() {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                setLocationInfo({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            },
            (error) => {
                console.log("Could not get location: " + error);
            },
        );
    }

    return (
        <>
            {isLoading ? <p className={"mb-5 animate-pulse text-center text-xl"}>Loading...</p> : null}
            {weatherData ? (
                <ul className={"text-center"}>
                    <li>Location: {weatherData.location}</li>
                    <li>Local time: {weatherData.local_time}</li>
                    <li>Precipitation: {weatherData.precipitation}</li>
                    <li>Temperature: {weatherData.degrees}C</li>
                    <li>Condition: {weatherData.condition}</li>
                </ul>
            ) : null}
        </>
    );
}
