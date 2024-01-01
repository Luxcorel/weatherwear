import CurrentLocationButton from "@/components/locations/current-location-button";
import SavedLocations from "@/components/locations/saved-locations";
import NewLocation from "@/components/locations/NewLocation";

export default function Page() {
    return (
        <>
            <h1 className={"mt-10 text-center text-2xl"}>Welcome to WeatherWear! Please choose a location to use:</h1>
            <div>
                <div className={"mt-10 flex justify-center"}>
                    <NewLocation />
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
