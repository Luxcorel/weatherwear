"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/data-fetcher";
import { SuggestionDTO } from "@/frontend-types/suggestion-dto";
import { useEffect, useState } from "react";
import { Location } from "@/frontend-types/location";

export default function OutfitSuggestionTestInfo() {
    const [locationInfo, setLocationInfo] = useState<Location>();

    useEffect(() => {
        getLocation();
    }, []);

    const { data, error, isLoading } = useSWR<SuggestionDTO>(
        `${locationInfo ? `api/outfits?latitude=${locationInfo.latitude}&longitude=${locationInfo.longitude}` : ""}`,
        fetcher,
    );

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
            <div className={"text-center"}>
                {isLoading ? <p className={"animate-pulse text-xl"}>LOADING...</p> : null}

                <ul>{data?.outfit?.map((clothing) => <li key={clothing.id} />)}</ul>
                <ul>
                    <li>Degrees celsius: {data?.degrees_c}</li>
                    <li>Weather keyword: {data?.weather_keyword}</li>
                    <li>Weather picture: {data?.weather_picture}</li>
                </ul>
            </div>
        </>
    );
}
