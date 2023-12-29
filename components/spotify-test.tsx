import { auth } from "@/auth-config";
import { redirect } from "next/navigation";
import { SpotifyUser } from "@/types/spotify-types";
import { spotifyGet } from "@/lib/spotify-api-requests";

async function getUser() {
    const session = await auth();
    if (!session || session.error) {
        redirect("/api/auth/signin");
    }

    const data = await spotifyGet("https://api.spotify.com/v1/me", session, null);

    //TODO: add some validation before this:
    return data as SpotifyUser;
}

export default async function SpotifyTest() {
    const res = await getUser();

    return (
        <div className={"text-center"}>
            <p>{JSON.stringify(res)}</p>
        </div>
    );
}
