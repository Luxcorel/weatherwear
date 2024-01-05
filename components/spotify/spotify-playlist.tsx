import { spotifyGet } from "@/lib/spotify-api-requests";
import { auth } from "@/auth-config";
import { redirect } from "next/navigation";
import SpotifyEmbedPlayer from "@/components/spotify/spotify-embed-player";

async function getPlaylist(searchQuery: string) {
    const session = await auth();
    if (!session || session.error) {
        redirect("/api/auth/signin");
    }

    const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=playlist&market=SE&limit=1`;

    const data = await spotifyGet(url, session, null);

    return data.playlists.items[0].uri;
}

export default async function SpotifyPlaylist(props: { readonly searchQuery: string }) {
    const playlist = await getPlaylist(props.searchQuery);
    const regex = "spotify:playlist:";

    return (
        <div>
            <SpotifyEmbedPlayer mediaId={playlist.split(regex)[1]} mediaType={"playlist"} />
        </div>
    );
}
