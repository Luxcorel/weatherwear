import SpotifyPlaylist from "@/components/spotify/spotify-playlist";
import WeatherInfo from "@/components/weather-info/weather-info";
import { cookies } from "next/headers";

export default function Home() {
    const cookieStore = cookies();
    const latitude = cookieStore.get("latitude");
    const longitude = cookieStore.get("longitude");

    // TODO customize weatherKeyword to use keyword from outfit endpoint.
    return (
        <div className={"flex w-full p-2"}>
            <div className={"m-2 w-full rounded-[12px] bg-red-500 dark:bg-slate-700"}>
                <WeatherInfo />
            </div>
            <div className={"m-2 w-full"}>
                <SpotifyPlaylist weatherKeyword={"sunny"} />
            </div>
        </div>
    );
}
