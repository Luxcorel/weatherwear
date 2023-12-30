import React from "react";
import { WeatherTestDTO } from "@/frontend-types/weather-test-DTO";

type Props = {
    readonly latitude: number;
    readonly longitude: number;
};

async function getWeatherInfo(latitude: number, longitude: number) {
    const response = await fetch(`${process.env.BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`);
    return (await response.json()) as WeatherTestDTO;
}

export default async function WeatherInfo(props: Props) {
    const weatherData = await getWeatherInfo(props.latitude, props.longitude);

    return (
        <>
            <ul className={"text-center"}>
                <li>Location: {weatherData.location}</li>
                <li>Local time: {weatherData.local_time}</li>
                <li>Temperature: {weatherData.degrees}C</li>
                <li>Condition: {weatherData.condition}</li>
            </ul>
        </>
    );
}
