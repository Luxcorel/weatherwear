import { NextRequest } from "next/server";
import { auth } from "@/auth-config";
import { fetchWeatherByLocation } from "@/lib/weather-api-requests";
import { db } from "@/db-config";
import { z } from "zod";
import { WEATHER_CONDITIONS } from "@/types/weather-conditions";
import { WEATHER_DATA_SCHEMA, WeatherData } from "@/types/weather-data";
import { UsableTemperatureRange } from "@/types/usableTemperatureRange";
import { ClothingDTO, ClothingType } from "@/types/clothing-types";

const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

// TODO refactor this endpoint at some point
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({}, { status: 401 });
  }

  // collect client input parameters
  const { searchParams } = request.nextUrl;
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  // no location given - return bad request error
  if (!(latitude && longitude)) {
    return Response.json({}, { status: 400 });
  }

  // validate client input
  const requestBody = locationSchema.safeParse({
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  });
  if (!requestBody.success) {
    return Response.json(
      {
        error: requestBody.error.issues,
      },
      { status: 400 },
    );
  }

  // fetch weather for the target location
  const weatherResponse = await fetchWeatherByLocation(requestBody.data.latitude, requestBody.data.longitude);
  if (!weatherResponse.location) {
    return Response.json(
      {
        error: "Could not find weather for that location",
      },
      { status: 400 },
    );
  }

  const weather = WEATHER_DATA_SCHEMA.safeParse(weatherResponse);
  if (!weather.success) {
    return Response.json(
      {
        error: "Weather data error",
      },
      { status: 500 },
    );
  }

  const wardrobe = await db
    .selectFrom("Clothing")
    .select([
      "Clothing.id",
      "Clothing.clothing_type",
      "Clothing.usable_temperature_range",
      "Clothing.name",
      "Clothing.is_precipitation_proof",
      "Clothing.icon_path",
    ])
    .where("Clothing.owner", "=", `${session.user.id}`)
    .execute();

  const weatherKeyword = WEATHER_CONDITIONS[weather.data.current.condition.code].weather_keyword || undefined;
  if (!weatherKeyword) {
    return Response.json({}, { status: 500 });
  }

  // weather data is available through the following variable: weather.data
  // weather keyword ("sunny", "cloudy", "rainy", "snowy") is available through the variable: weatherKeyword
  // this is the array that is supposed to contain the clothes that will make up the outfit:

  const outfit: ClothingDTO[] = clothesPicker(wardrobe as ClothingDTO[], weather.data);

  // TODO: add outfit-building logic here (pick appropriate clothing based on weather data)

  // the return is set up here per the API documentation (with the addition of "_debug" for testing purposes)
  return Response.json(
    {
      outfit,
      _debug: { wardrobe, weather, weatherKeyword },
    },
    { status: 200 },
  );
}

function clothesPicker(wardrobe: ClothingDTO[], weather: WeatherData) {
  const outfit: ClothingDTO[] = [];

  const shirts: ClothingDTO[] = [];
  const outwear: ClothingDTO[] = [];
  const bottoms: ClothingDTO[] = [];

  const temperatureRange = mapTemperatureToRange(weather.current.temp_c);
  const fallbackTemperatureRange = fallbackMapTemperatureToRange(weather.current.temp_c, temperatureRange);

  for (const clothing of wardrobe) {
    switch (clothing.clothing_type) {
      case "Shirt":
        shirts.push(clothing);
        break;

      case "Outwear":
        outwear.push(clothing);
        break;

      case "Bottom":
        bottoms.push(clothing);
        break;

      default:
        break;
    }
  }

  shuffle(shirts);
  shuffle(outwear);
  shuffle(bottoms);

  // SHIRTS
  for (const shirt of shirts) {
    if (shirt.usable_temperature_range === temperatureRange) {
      outfit.push(shirt);
      break;
    }
  }

  if (outfit.length !== 1) {
    for (const shirt of shirts) {
      if (shirt.usable_temperature_range === fallbackTemperatureRange) {
        outfit.push(shirt);
        break;
      }
    }
  }

  if (outfit.length !== 1) {
    outfit.push(getDummyClothing(ClothingType.SHIRT));
  }

  // OUTWEAR
  for (const outwearItem of outwear) {
    if (outwearItem.usable_temperature_range === temperatureRange) {
      outfit.push(outwearItem);
      break;
    }
  }

  if (outfit.length !== 2) {
    for (const outwearItem of outwear) {
      if (outwearItem.usable_temperature_range === fallbackTemperatureRange) {
        outfit.push(outwearItem);
        break;
      }
    }
  }

  if (outfit.length !== 2) {
    outfit.push(getDummyClothing(ClothingType.OUTWEAR));
  }

  // BOTTOM
  for (const bottom of bottoms) {
    if (bottom.usable_temperature_range === temperatureRange) {
      outfit.push(bottom);
      break;
    }
  }

  if (outfit.length !== 3) {
    for (const bottom of bottoms) {
      if (bottom.usable_temperature_range === fallbackTemperatureRange) {
        outfit.push(bottom);
        break;
      }
    }
  }

  if (outfit.length !== 3) {
    outfit.push(getDummyClothing(ClothingType.BOTTOM));
  }

  return outfit;
}

function getDummyClothing(clothingType: ClothingType) {
  return {
    id: "",
    clothing_type: clothingType,
    usable_temperature_range: 0,
    name: "",
    is_precipitation_proof: false,
    icon_path: "",
  };
}

//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(array: any[]) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function mapTemperatureToRange(weatherTemp: number): UsableTemperatureRange {
  if (weatherTemp < 0) {
    return UsableTemperatureRange.FREEZING;
  }

  if (weatherTemp < 11) {
    return UsableTemperatureRange.COLD;
  }

  if (weatherTemp < 21) {
    return UsableTemperatureRange.WARM;
  }

  return UsableTemperatureRange.HOT;
}

function fallbackMapTemperatureToRange(weatherTemp: number, tempRange: UsableTemperatureRange): UsableTemperatureRange {
  switch (tempRange) {
    case UsableTemperatureRange.FREEZING: {
      return UsableTemperatureRange.COLD;
    }

    case UsableTemperatureRange.COLD: {
      if (weatherTemp < 5) {
        return UsableTemperatureRange.FREEZING;
      }

      return UsableTemperatureRange.WARM;
    }

    case UsableTemperatureRange.WARM: {
      if (weatherTemp < 16) {
        return UsableTemperatureRange.COLD;
      }

      return UsableTemperatureRange.HOT;
    }

    //if tempRange = HOT
    default:
      return UsableTemperatureRange.WARM;
  }
}
