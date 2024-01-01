import WeatherInfo from "@/components/weather-info/weather-info";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SpotifyPlaylist from "@/components/spotify/spotify-playlist";
import { WeatherInfoDTO } from "@/frontend-types/weather-info-DTO";
import OutfitSuggestion from "@/components/outfit-suggestion/outfit-suggestion";

async function getWeatherInfo(latitude: number, longitude: number) {
    const response = await fetch(`${process.env.BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`, {
        next: { revalidate: 300 },
    });
    //TODO: should validate this
    return (await response.json()) as WeatherInfoDTO;
}

export default async function Home() {
    const cookieStore = cookies();
    const latitude = cookieStore.get("latitude");
    const longitude = cookieStore.get("longitude");
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
    // TODO: Add logic that personalizes weather keyword (user's preferred genre)
    return (
        <>
        <div className="flex flew-wrap">
            <div className={"w-full md:w-1/2 p-2"}>
                <div className={"m-9 w-full md:w-1/2  rounded-[12px] bg-blue-100 dark:bg-slate-700 h-[45vh] lg:h-[35vh] flex items-center justify-center"}>
                    {/* Suspense is used to stream server components to the client as data is fetched in them.
                    This can not be used with client components as they are sent straight away to the client.
                     To customize the loading state you can pass JSX to the fallback prop in the <Suspense /> component
                     */}
                    <Suspense fallback={<p className={"mb-5 animate-pulse text-center text-xl"}>Loading weather...</p>}>
                        <WeatherInfo latitude={latitudeValue} longitude={longitudeValue} />
                    </Suspense>
                </div>
            </div>

            <div className={"w-full md:w-1/2 p-2"}>
                <div className={"m-9 w-full md:w-1/2 rounded-[12px] bg-blue-100 dark:bg-slate-700 h-[45vh] lg:h-[35vh] flex items-center justify-center"}>
                    <OutfitSuggestion latitude={latitudeValue} longitude={longitudeValue} />
                        </div>
                    </div>
             </div>

            <div className={"w-full p-4"}>
                <SpotifyPlaylist weatherKeyword={weather.weather_keyword} />
            </div>
        </>
    );

}