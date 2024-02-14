"use client";

import React from "react";
import { WeatherInfoDTO } from "@/frontend-types/weather-types";
import { fetcher } from "@/lib/swr-fetcher";
import useSWR from "swr";

type Props = {
    readonly latitude: number;
    readonly longitude: number;
};

function WeatherSkeleton() {
    return (
        <div className={"flex animate-pulse flex-col items-center"}>
            <div className="mb-4 h-4 w-36 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-3 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-3 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
    );
}

function WeatherInformation(props: { readonly weather: WeatherInfoDTO }) {
    return (
        <ul className={"text-center"}>
            <li className={"text-2xl"}>{props.weather.location}</li>
            <li className={"text-lg"}>{props.weather.degrees}C</li>
            <li className={"text-lg"}>{props.weather.condition}</li>
        </ul>
    );
}

export default function WeatherInfo(props: Props) {
    const {
        data: weather,
        error,
        isLoading,
    } = useSWR<WeatherInfoDTO>(`/api/weather?latitude=${props.latitude}&longitude=${props.longitude}`, fetcher);

    return <>{weather ? <WeatherInformation weather={weather} /> : <WeatherSkeleton />}</>;
}
