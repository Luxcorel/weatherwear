import WeatherInfo from "@/components/weather-info/weather-info";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SpotifyPlaylist from "@/components/spotify/spotify-playlist";
import OutfitSuggestion from "@/components/outfit-suggestion/outfit-suggestion";
import { WeatherInfoDTO } from "@/frontend-types/weather-types";
import Image from "next/image";
import React from "react";

async function getWeatherInfo(latitude: number, longitude: number) {
    const response = await fetch(`${process.env.BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`, {
        next: { revalidate: 60 },
    });
    //TODO: should validate this
    return (await response.json()) as WeatherInfoDTO;
}

export default async function Home() {
    const cookieStore = cookies();
    const latitude = cookieStore.get("latitude");
    const longitude = cookieStore.get("longitude");
    const musicGenre = cookieStore.get("genre");
    //TODO: Add cookie for choosing preferred music genre?
    //TODO: Set latitude and longitude from saved location on frontend instead of passing savedLocation id?
    // const savedLocation = cookieStore.get("saved_location");

    if (!(latitude && longitude)) {
        redirect("/setup");
    }

    const latitudeValue = Number(latitude.value);
    const longitudeValue = Number(longitude.value);
    const weather = await getWeatherInfo(latitudeValue, longitudeValue);

    // TODO fix h-[40vh] with a better solution
    return (
        <div>
            {/*TODO: Do this better*/}
            <div className={"mx-5 flex justify-end"}>
                <Image
                    className={"animate-[pulse_1s_ease-out_1]"}
                    src={weather.weather_picture}
                    alt={`${weather.weather_picture} weather icon`}
                    width={50}
                    height={50}
                />
            </div>
        
            <div className="flex justify-center">
                <div className={"w-full md:w-3/4"}>
                    <div
                        className={
                            "mx-auto flex h-[45vh] w-full items-center justify-center rounded-[12px] bg-blue-100 dark:bg-slate-800 drop-shadow dark:text-slate-400 md:w-1/2 lg:h-[35vh]"
                        }
                    >
                        
                        <div className="m-3 p-2">
                            <WeatherInfo latitude={latitudeValue} longitude={longitudeValue} />
                                </div>
                        <div className="mt-4 ">
                            <OutfitSuggestion latitude={latitudeValue} longitude={longitudeValue} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={"w-full p-6"}>
                <SpotifyPlaylist
                    searchQuery={
                        musicGenre?.value ? weather.weather_keyword + " " + musicGenre.value : weather.weather_keyword
                    }
                />
            </div>
        </div>
    );
}
