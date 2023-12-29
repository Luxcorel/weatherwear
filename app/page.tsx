import SpotifyPlaylist from "@/components/spotify/spotify-playlist";
import { cookies } from "next/headers";

export default function Home() {
    const cookieStore = cookies();
    const latitude = cookieStore.get("latitude");
    const longitude = cookieStore.get("longitude");

    // TODO customize weatherKeyword to use keyword from outfit endpoint.
    return (
        <div>
            <SpotifyPlaylist weatherKeyword={"sunny"} />
        </div>
    );
}
