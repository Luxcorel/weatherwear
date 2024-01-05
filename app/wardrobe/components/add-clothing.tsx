"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClothingType } from "@/frontend-types/clothing-types";
import { UsableTemperatureRange } from "@/types/usableTemperatureRange";
import { mutate } from "swr";

export default function AddClothing() {
    const [clothingObject, setClothingObject] = useState({
        clothing_type: ClothingType.SHIRT,
        usable_temperature_range: 0,
        name: "",
        is_precipitation_proof: false,
        icon_path: "/public/bruh.png",
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const response = await fetch("api/clothes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clothingObject),
        });

        await mutate("api/clothes");
    };

    const [clothingName, setClothingName] = useState();

    const [clothingType, setClothingType] = useState();

    const [weatherRange, setWeatherRange] = useState();

    const [waterProof, setWaterProof] = useState();

    const handleClothingNameChange = (event: any) => {
        const { value } = event.target;
        setClothingObject((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            name: value,
        }));
    };

    const changeClothingType = (event: any) => {
        const { value } = event.target;
        setClothingObject((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            clothing_type: value,
        }));
    };

    const changeWeatherRange = (event: any) => {
        const { value } = event.target;
        const actualVal = Number(value);

        setClothingObject((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            usable_temperature_range: actualVal,
        }));
    };

    const changeWaterProof = (event: any) => {
        const { value } = event.target;
        console.log("value: " + value);
        setClothingObject((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            is_precipitation_proof: !prevSelectedOptions.is_precipitation_proof,
        }));
    };

    return (
        <div className={"m-auto my-2 flex w-2/3 justify-center rounded-xl bg-blue-100"}>
            <form onSubmit={handleSubmit}>
                <div className={""}>
                    <div className={"m-2 flex "}>
                        <label className={"m-1"}>
                            <input
                                type="radio"
                                value={ClothingType.SHIRT}
                                checked={clothingObject.clothing_type === "Shirt"}
                                onChange={changeClothingType}
                            />
                            Shirt
                        </label>

                        <label className={"m-1"}>
                            <input
                                type="radio"
                                value={ClothingType.OUTWEAR}
                                checked={clothingObject.clothing_type === "Outwear"}
                                onChange={changeClothingType}
                            />
                            Outwear
                        </label>

                        <label className={"m-1"}>
                            <input
                                type="radio"
                                value={ClothingType.BOTTOM}
                                checked={clothingObject.clothing_type === "Bottom"}
                                onChange={changeClothingType}
                            />
                            Bottom
                        </label>
                    </div>

                    {/* Usable Temperature Range */}
                    <div className={"m-2 flex"}>
                        <label className={"m-1"}>
                            <input
                                type="radio"
                                value={UsableTemperatureRange.FREEZING}
                                checked={clothingObject.usable_temperature_range === UsableTemperatureRange.FREEZING}
                                onChange={changeWeatherRange}
                            />
                            FREEZING
                        </label>

                        <label className={"m-1"}>
                            <input
                                type="radio"
                                value={UsableTemperatureRange.COLD}
                                checked={clothingObject.usable_temperature_range === UsableTemperatureRange.COLD}
                                onChange={changeWeatherRange}
                            />
                            COLD
                        </label>

                        <label className={"m-1"}>
                            <input
                                type="radio"
                                value={UsableTemperatureRange.WARM}
                                checked={clothingObject.usable_temperature_range === UsableTemperatureRange.WARM}
                                onChange={changeWeatherRange}
                            />
                            WARM
                        </label>

                        <label className={"m-1"}>
                            <input
                                type="radio"
                                value={UsableTemperatureRange.HOT}
                                checked={clothingObject.usable_temperature_range === UsableTemperatureRange.HOT}
                                onChange={changeWeatherRange}
                            />
                            HOT
                        </label>
                    </div>

                    {/*Water Proof*/}
                    <div className={"m-2 flex"}>
                        <label className={"m-1"}>
                            <input
                                type="radio"
                                value="true"
                                checked={clothingObject.is_precipitation_proof}
                                onChange={changeWaterProof}
                            />
                            Waterproof
                        </label>

                        <label className={"m-1"}>
                            <input
                                type="radio"
                                value="false"
                                checked={!clothingObject.is_precipitation_proof}
                                onChange={changeWaterProof}
                            />
                            Not Waterproof
                        </label>
                    </div>

                    {/*Clothing name*/}

                    <input
                        className="m-2 rounded-md border px-4 py-2 focus:outline-none"
                        type="text"
                        placeholder="Name for item"
                        value={clothingName}
                        onChange={handleClothingNameChange}
                    />
                </div>

                <Button className={"m-2"} type="submit">
                    Add Item
                </Button>
            </form>
        </div>
    );
}
