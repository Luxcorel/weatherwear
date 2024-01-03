"use client";

import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/swr-fetcher";
import { Button } from "@/components/ui/button";
import { SavedLocationsResponse, SavedLocation } from "@/frontend-types/location-types";

export default function SavedLocations() {
    //const router = useRouter();

    const { data, error, isLoading } = useSWR<SavedLocationsResponse>(`api/locations`, fetcher);

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
        await mutate(`api/weather?latitude=${location.latitude}&longitude=${location.longitude}`);
        await mutate(`api/outfits?latitude=${location.latitude}&longitude=${location.longitude}`);
        window.location.href = "/";
    };

    return (
        <>
            <ul>
                {data
                    ? data.favorite_locations.map((value, index, array) => (
                          <Button
                              key={value.latitude + value.longitude}
                              className={
                                  "rounded-3xl border-2 border-gray-500 bg-blue-100 text-lg text-black duration-500 ease-in-out hover:border-green-500 hover:bg-white"
                              }
                              onClick={() => handleLocationClick(value)}
                          >
                              {value.location_name}
                          </Button>
                      ))
                    : null}
            </ul>
        </>
    );
}
