"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { GeocodingResponse } from "@/frontend-types/location-types";
import { mutate } from "swr";
import { Button } from "@/components/ui/button";

export default function NewLocationPicker() {
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

    const handleLocationAdd = async () => {
        if (fetchedLocation) {
            const response = await fetch("api/locations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    location_name: fetchedLocation.name,
                    latitude: fetchedLocation.latitude,
                    longitude: fetchedLocation.longitude,
                }),
            });

            //invalidate saved location data in <SavedLocation />
            await mutate("api/locations");
        }
    };

    return (
        <div className={"flex-wrap"}>
            <form onSubmit={handleSearchSubmit}>
                <input
                    required
                    className="rounded-md border px-4 py-2 focus:outline-none"
                    type="text"
                    placeholder="Add a new location"
                    value={locationQuery}
                    onChange={handleSearchChange}
                />
                <Button type="submit">Search</Button>
            </form>
            {fetchedLocation?.name ? (
                <Button onClick={handleLocationAdd}>{`Add ${fetchedLocation.name}`}</Button>
            ) : null}
        </div>
    );
}
