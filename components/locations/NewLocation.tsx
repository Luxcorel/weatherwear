"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { GeocodingResponse } from "@/lib/weather-api-requests";
import { mutate } from "swr";

export default function NewLocation() {
    const [locationQuery, setLocationQuery] = useState("");
    const [fetchedLocation, setFetchedLocation] = useState<GeocodingResponse>();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocationQuery(event.target.value);
    };

    const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const location = (await fetch(`api/geocoding/${locationQuery}`).then(async (r) => r.json())) as
            | GeocodingResponse
            | undefined;

        if (location) {
            setFetchedLocation(location);
        }
    };

    const handleLocationSelect = async () => {
        const response = await fetch("api/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                location_name: fetchedLocation?.name,
                latitude: fetchedLocation?.lat,
                longitude: fetchedLocation?.lon,
            }),
        });

        //invalidate saved location data in <SavedLocation />
        await mutate("api/locations");
    };

    return (
        <div className={"flex-wrap"}>
            <form onSubmit={handleSearchSubmit}>
                <input
                    className="rounded-md border px-4 py-2 focus:outline-none"
                    type="text"
                    placeholder="Add a new location"
                    value={locationQuery}
                    onChange={handleSearchChange}
                />
                <Button type="submit">Search</Button>
            </form>
            {fetchedLocation?.name ? (
                <Button onClick={handleLocationSelect}>{`Add ${fetchedLocation.name}`}</Button>
            ) : null}
        </div>
    );
}
