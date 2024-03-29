"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { GeocodingResponse } from "@/frontend-types/location-types";
import { mutate } from "swr";
import { Button } from "@/components/ui/button";

function LocationSearchResult(props: {
    readonly fetchedLocation: GeocodingResponse | undefined;
    readonly onClick: () => Promise<void>;
}) {
    if (!props.fetchedLocation) {
        return null;
    }

    if (!props.fetchedLocation.name) {
        return <p>No result found</p>;
    }

    return (
        <Button className={"mt-2"} onClick={props.onClick}>
            {`Add ${props.fetchedLocation.name}`}
        </Button>
    );
}

export default function NewLocationPicker() {
    const [locationQuery, setLocationQuery] = useState("");
    const [fetchedLocation, setFetchedLocation] = useState<GeocodingResponse>();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocationQuery(event.target.value);
    };

    const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const location = (await fetch(`/api/geocoding/${locationQuery}`).then(async (r) => r.json())) as
            | GeocodingResponse
            | undefined;

        if (location) {
            setFetchedLocation(location);
        }
    };

    const handleLocationAdd = async () => {
        if (!fetchedLocation) {
            return;
        }

        await fetch("/api/locations", {
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
        setLocationQuery("");
        setFetchedLocation(undefined);
        await mutate("/api/locations");
    };

    return (
        <div className={"w-3/4 flex-wrap"}>
            <form className={"flex w-full flex-col"} onSubmit={handleSearchSubmit}>
                <input
                    required
                    className="m-2 rounded-md border px-4 py-2 placeholder:text-slate-500 focus:outline-none dark:bg-slate-700 dark:text-slate-400"
                    type="text"
                    placeholder="Add a new location"
                    value={locationQuery}
                    onChange={handleSearchChange}
                />
                <Button type="submit">Search</Button>
            </form>

            <LocationSearchResult fetchedLocation={fetchedLocation} onClick={handleLocationAdd} />
        </div>
    );
}
