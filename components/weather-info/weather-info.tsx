import React from "react";
import { WeatherInfoDTO } from "@/frontend-types/weather-info-DTO";

type Props = {
    readonly latitude: number;
    readonly longitude: number;
};

async function getWeatherInfo(latitude: number, longitude: number) {
    const response = await fetch(`${process.env.BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`, {
        next: { revalidate: 60 },
    });
    return (await response.json()) as WeatherInfoDTO;
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
