import { Suspense } from "react";
import ReadonlySavedLocations from "@/components/locations/readonly-saved-locations";
import { auth } from "@/auth-config";
import { redirect } from "next/navigation";
import NewLocationPicker from "@/components/locations/new-location-picker";
import MusicGenreSelector from "@/components/music-genre-selector";

export async function generateMetadata() {
    const session = await auth();
    return session ? { title: `${session.user.name}'s profile | WeatherWear` } : {};
}

export default async function Page() {
    const session = await auth();
    if (!session) {
        redirect("/setup");
    }

    return (
        <>
            <div>
                <Suspense fallback={<p className={"animate-pulse text-center text-2xl"}>Loading profile...</p>}>
                    <h1 className={"my-5 text-center text-2xl"}>{session.user.name}&apos;s profile</h1>
                </Suspense>
            </div>

            <div className={"my-5 flex justify-center"}>
                <MusicGenreSelector />
            </div>

            <div>{/* TODO: Create new component that allows editing/deletion of location */}</div>

            <h2 className={"my-5 text-center text-xl"}>Saved locations</h2>

            <div className={"my-5 flex justify-center"}>
                <NewLocationPicker />
            </div>

            <div>
                <ReadonlySavedLocations />
            </div>
        </>
    );
}
