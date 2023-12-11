/*
You can fetch anything you want from "backend" when using server side rendering:
async function getWeatherData() {
    const weatherApi = WEATHER_API_BASE_URL + `&q=${55.609}, ${13}&aqi=no`;
    const weatherResponse = await fetch(weatherApi, { next: { revalidate: 300 } });
    const weatherData: WeatherData = await weatherResponse.json();

    return weatherData;
}
 */

import WeatherTest from "@/components/WeatherTest";

export default function Weather() {
    //const weatherData = await getWeatherData();

    return (
        <>
            <h1 className={"my-5 text-center text-2xl"}>Weather info</h1>
            <WeatherTest />
        </>
    );
}
