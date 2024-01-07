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
    } = useSWR<WeatherInfoDTO>(`/api/weather?latitude=${props.latitude}&longitude=${props.longitude}`, fetcher);

    return (
        <>
            {isLoading ? (
                <div className={"flex animate-pulse flex-col items-center"}>
                    <div className="mb-4 h-4 w-36 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-3 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-3 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
                </div>
            ) : null}
            {weather ? (
                <ul className={"text-center"}>
                    <li className={"text-2xl"}>{weather.location}</li>
                    <li className={"text-lg"}>{weather.degrees}C</li>
                    <li className={"text-lg"}>{weather.condition}</li>
                </ul>
            ) : null}
        </>
    );
}
