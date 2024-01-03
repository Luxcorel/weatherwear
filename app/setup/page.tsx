import CurrentLocationButton from "@/components/locations/current-location-button";
import ReadonlySavedLocations from "@/components/locations/readonly-saved-locations";

import NewLocationPicker from "@/components/locations/new-location-picker";

// this is meant as a "welcome page" where users get started or something.
// Redirects get issued to this page when a user's doesn't have a location selected.
export default function Page() {
    return (
        <>
            <h1 className={"mt-10 text-center text-2xl"}>Welcome to WeatherWear! Please choose a location to use:</h1>
            <div>
                <div className={"mt-10 flex justify-center"}>
                    <NewLocationPicker />
                </div>
                <div className={"mt-7 flex justify-center"}>
                    <CurrentLocationButton />
                </div>
                <div className={"mt-7 flex justify-center"}>
                    <ReadonlySavedLocations />
                </div>
            </div>
        </>
    );
}
