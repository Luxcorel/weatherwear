"use client";

import React from "react";
import { WeatherInfoDTO } from "@/frontend-types/weather-info-DTO";
import { fetcher } from "@/lib/swr-fetcher";
import useSWR from "swr";

type Props = {
    readonly latitude: number;
    readonly longitude: number;
};

export default function WeatherInfo(props: Props) {
    const {
        data: weather,
        error,
        isLoading,
    } = useSWR<WeatherInfoDTO>(`api/weather?latitude=${props.latitude}&longitude=${props.longitude}`, fetcher);

    return (
        <>
            {isLoading ? <p className={"mb-5 animate-pulse text-center text-xl"}>Loading weather...</p> : null}
            {weather ? (
                <ul className={"text-center"}>
                    <li>Location: {weather.location}</li>
                    <li>Local time: {weather.local_time}</li>
                    <li>Temperature: {weather.degrees}C</li>
                    <li>Condition: {weather.condition}</li>
                </ul>
            ) : null}
        </>
    );
}
