import SpotifyPlaylist from "@/components/spotify/spotify-playlist";
import WeatherInfo from "@/components/weather-info/weather-info";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
    const cookieStore = cookies();
    const latitude = cookieStore.get("latitude");
    const longitude = cookieStore.get("longitude");
    const savedLocation = cookieStore.get("saved_location");

    if (!(latitude && longitude) && !savedLocation) {
        redirect("/setup");
    }

    // TODO fix h-[40vh] with a better solution
    // TODO customize weatherKeyword to use keyword from outfit endpoint.
    return (
        <>
            <div className={"flex h-[40vh] w-full p-2"}>
                <div className={"m-2 w-full rounded-[12px] bg-red-500 dark:bg-slate-700"}>
                    <WeatherInfo />
                </div>
            </div>

            <div className={"w-full p-4"}>
                <SpotifyPlaylist weatherKeyword={"sunny"} />
            </div>
        </>
    );
}
