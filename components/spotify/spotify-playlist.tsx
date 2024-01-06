import { spotifyGet } from "@/lib/spotify-api-requests";
import { auth } from "@/auth-config";
import { redirect } from "next/navigation";
import SpotifyEmbedPlayer from "@/components/spotify/spotify-embed-player";

async function getPlaylist(searchQuery: string) {
    const session = await auth();
    if (!session || session.error) {
        redirect("/api/auth/signin");
    }

    const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=playlist&market=SE`;
    const data = await spotifyGet(url, session, 5000);
    const numberOfPlaylists = data.playlists.items.length;
    const randomPlaylist = Math.floor(Math.random() * numberOfPlaylists);

    return data.playlists.items[randomPlaylist].uri;
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
