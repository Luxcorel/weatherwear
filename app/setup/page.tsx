import CurrentLocationButton from "@/components/locations/current-location-button";
import SavedLocations from "@/components/locations/saved-locations";
import NewLocation from "@/components/locations/NewLocation";

export default function Page() {
    return (
        <>
            <h1 className={"py-10 text-center text-2xl"}>Welcome to WeatherWear! Please choose a location to use:</h1>
            <div className={"flex justify-center"}>
                <CurrentLocationButton />
                <SavedLocations />
                <NewLocation />
            </div>
        </>
    );
}
