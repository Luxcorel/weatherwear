import WeatherInfo from "@/components/weather-info/weather-info";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SpotifyPlaylist from "@/components/spotify/spotify-playlist";
import OutfitSuggestion from "@/components/outfit-suggestion/outfit-suggestion";
import { WeatherInfoDTO } from "@/frontend-types/weather-types";
import Image from "next/image";
import React from "react";

/** Fetches weather information from the backend weather endpoint
 * @param latitude The latitude of the location
 * @param longitude The longitude of the location
 */
async function getWeatherInfo(latitude: number, longitude: number) {
    const response = await fetch(`${process.env.BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`, {
        next: { revalidate: 300 },
    });
    return (await response.json()) as WeatherInfoDTO;
}

export default async function Home() {
    const cookieStore = cookies();
    const latitudeCookie = cookieStore.get("latitude");
    const longitudeCookie = cookieStore.get("longitude");
    const musicGenreCookie = cookieStore.get("genre");

    if (!latitudeCookie || !longitudeCookie) {
        redirect("/setup");
    }

    const latitude = Number.parseFloat(latitudeCookie.value);
    const longitude = Number.parseFloat(longitudeCookie.value);
    const musicGenre = musicGenreCookie?.value;
    const weather = await getWeatherInfo(latitude, longitude);

    const spotifyQuery = musicGenre ? weather.weather_keyword + " " + musicGenre : weather.weather_keyword;

    return (
        <div>
            <div className="mt-10 flex justify-center">
                <div className={"w-full md:w-4/5 lg:w-1/2"}>
                    <div
                        className={
                            "mx-auto flex h-full w-full items-center justify-evenly rounded-[12px] bg-blue-100 p-10 drop-shadow dark:bg-slate-800 dark:text-slate-400"
                        }
                    >
                        <div className="mr-10 flex flex-col items-center">
                            <WeatherInfo latitude={latitude} longitude={longitude} />
                            <Image
                                className={"mt-2 animate-[pulse_1s_ease-out_1]"}
                                src={weather.weather_picture}
                                alt={`${weather.weather_picture} weather icon`}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div>
                            <OutfitSuggestion latitude={latitude} longitude={longitude} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={"w-full p-6"}>
                <SpotifyPlaylist searchQuery={spotifyQuery} />
            </div>
        </div>
    );
}
