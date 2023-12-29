import { spotifyGet } from "@/lib/spotify-api-requests";
import { auth } from "@/auth-config";
import { redirect } from "next/navigation";
import SpotifyEmbedPlayer from "@/components/spotify/spotify-embed-player";

async function getPlaylist(weatherKeyword: string) {
    const session = await auth();
    if (!session || session.error) {
        redirect("/api/auth/signin");
    }

    const url = `https://api.spotify.com/v1/search?q=${weatherKeyword}&type=playlist&market=SE&limit=1`;

    const data = await spotifyGet(url, session, null);

    return data.playlists.items[0].uri;
}

export default async function SpotifyPlaylist(props: { readonly weatherKeyword: string }) {
    const playlist = await getPlaylist(props.weatherKeyword);
    const regex = "spotify:playlist:";

    return (
        <div>
            <SpotifyEmbedPlayer magicId={playlist.split(regex)[1]} />
        </div>
    );
}
