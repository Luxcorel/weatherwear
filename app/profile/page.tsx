import { Suspense } from "react";
import SavedLocations from "@/components/locations/saved-locations";
import { auth } from "@/auth-config";
import { redirect } from "next/navigation";
import NewLocationPicker from "@/components/locations/new-location-picker";
import MusicGenreSelector from "@/components/music-genre-selector";
import CurrentLocationButton from "@/components/locations/current-location-button";

export async function generateMetadata() {
    const session = await auth();
    if (!session) {
        return {};
    }

    return { title: `${session.user.name}'s profile | WeatherWear` };
}

export default async function Page() {
    const session = await auth();
    if (!session) {
        redirect("/setup");
    }

    return (
        <div
            className={
                "m-auto my-9 flex flex-col justify-center rounded-md bg-blue-100 drop-shadow-md dark:bg-slate-800 dark:shadow-blue-900 md:w-4/5 lg:w-2/3"
            }
        >
            <div>
                <Suspense fallback={<p className={"animate-pulse text-center text-2xl"}>Loading profile...</p>}>
                    <h1 className={"my-5 text-center text-2xl dark:text-slate-400"}>
                        {session.user.name}&apos;s profile
                    </h1>
                </Suspense>
            </div>

            <div className={"my-5 flex justify-center"}>
                <MusicGenreSelector />
            </div>

            <h2 className={"mt-5 text-center text-xl dark:text-slate-400"}>Saved locations</h2>

            <div className={"mb-8 mt-3 flex justify-center"}>
                <NewLocationPicker />
            </div>

            <div className={"mb-8 mt-3 flex justify-center"}>
                <SavedLocations />
            </div>

            <div className={"mb-7 flex justify-center"}>
                <CurrentLocationButton />
            </div>
        </div>
    );
}
