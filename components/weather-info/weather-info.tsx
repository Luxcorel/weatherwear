"use client";

import React from "react";
import { WeatherInfoDTO } from "@/frontend-types/weather-types";
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
                    <li>{weather.location}</li>
                    <li>{weather.degrees}C</li>
                    <li>{weather.condition}</li>
                </ul>
            ) : null}
        </>
    );
}
