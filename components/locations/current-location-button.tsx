"use client";

import { Button } from "@/components/ui/button";
import { mutate } from "swr";

export default function CurrentLocationButton() {
    //const router = useRouter();

    function setCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            async (location) => {
                const { longitude, latitude } = location.coords;

                const date = new Date();
                // Set it expire in 7 days
                date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

                document.cookie = `latitude=${latitude}; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure=true`;
                document.cookie = `longitude=${longitude}; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure=true`;

                // using vanilla redirect to avoid stale location data (props aren't updated unless new request to server is made)
                // should probably use locally stored location info but this works...
                await mutate(`api/weather?latitude=${latitude}&longitude=${longitude}`);
                await mutate(`api/outfits?latitude=${latitude}&longitude=${longitude}`);
                window.location.href = "/";
            },
            (error) => {},
        );
    }

    const handleCurrLocationClick = () => {
        setCurrentLocation();
    };

    return (
        <>
            <Button
                className={
                    "rounded-3xl border-2 border-gray-500 bg-blue-100 text-lg text-black duration-500 ease-in-out hover:border-green-500 hover:bg-white"
                }
                type={"button"}
                onClick={handleCurrLocationClick}
            >
                Use current location
            </Button>
        </>
    );
}
