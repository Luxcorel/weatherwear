"use client";

import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/swr-fetcher";
import { Button } from "@/components/ui/button";
import { SavedLocation, SavedLocationsResponse } from "@/frontend-types/location-types";

type Props = {
    readonly locations: SavedLocationsResponse | undefined;
    handleClick(value: SavedLocation): void;
    handleRemove(value: SavedLocation): void;
};

function LocationButtons(props: Props) {
    if (!props.locations) {
        return;
    }

    return props.locations.favorite_locations.map((value, index, array) => (
        <div key={value.latitude + value.longitude} className={"m-2 flex w-fit flex-col items-center text-center"}>
            <Button className={""} onClick={() => props.handleClick(value)}>
                {value.location_name}
            </Button>
            <Button className={"m-1 mx-6"} variant={"destructive"} onClick={() => props.handleRemove(value)}>
                Delete
            </Button>
        </div>
    ));
}

export default function SavedLocations() {
    //const router = useRouter();

    const { data, error, isLoading } = useSWR<SavedLocationsResponse>(`/api/locations`, fetcher);

    const handleLocationClick = async (location: SavedLocation) => {
        const date = new Date();
        // Set it expire in 7 days
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

        document.cookie = `latitude=${
            location.latitude
        }; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure=true`;
        document.cookie = `longitude=${
            location.longitude
        }; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure=true`;

        // using vanilla redirect to avoid stale location data (props aren't updated unless new request to server is made)
        // should probably use locally stored location info but this works...
        await mutate(`/api/weather?latitude=${location.latitude}&longitude=${location.longitude}`);
        await mutate(`/api/outfits?latitude=${location.latitude}&longitude=${location.longitude}`);
        window.location.href = "/";
    };

    const handleLocationRemove = async (value: SavedLocation) => {
        await fetch(`/api/locations/${value.id}`, {
            method: "DELETE",
        });

        //invalidate saved location data
        await mutate("/api/locations");
    };

    return (
        <div className={"flex w-4/5 flex-wrap justify-center"}>
            <LocationButtons locations={data} handleClick={handleLocationClick} handleRemove={handleLocationRemove} />
        </div>
    );
}
