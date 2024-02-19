import CurrentLocationButton from "@/components/locations/current-location-button";
import SavedLocations from "@/components/locations/saved-locations";

import NewLocationPicker from "@/components/locations/new-location-picker";

// This is a "welcome page" where users select a location to use.
// If no location cookies are set, users will be redirected here.
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
                    <SavedLocations />
                </div>
            </div>
        </>
    );
}
