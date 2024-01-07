"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClothingType } from "@/frontend-types/clothing-types";
import { UsableTemperatureRange } from "@/types/usableTemperatureRange";
import { mutate } from "swr";
import Image from "next/image";

export default function AddClothing() {
    const [addClothingIsVisible, setAddClothingIsVisible] = useState(false);

    const [clothingObject, setClothingObject] = useState({
        clothing_type: ClothingType.SHIRT,
        usable_temperature_range: 0,
        name: "",
        is_precipitation_proof: false,
        icon_path: "/images/clothing/shirt/0.svg",
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const response = await fetch("/api/clothes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clothingObject),
        });

        if (response.ok) {
            await mutate("/api/clothes");
            setAddClothingIsVisible((prevState) => !prevState);
        }
    };

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

        setClothingObject((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            is_precipitation_proof: !prevSelectedOptions.is_precipitation_proof,
        }));
    };

    function renderImages() {
        const avatars: any[] = [];
        const NUMBER_OF_AVATARS = clothingObject.clothing_type ? 12 : 0;

        for (let i = 0; i <= NUMBER_OF_AVATARS; i++) {
            avatars.push(
                <button
                    key={i}
                    id={`${i}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${i}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${i}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${i}.svg`}
                        alt={`Some picture ${i}`}
                    />
                </button>,
            );
        }

        return avatars;
    }

    return (
        <>
            <div className={"flex justify-center"}>
                <Button
                    variant={"default"}
                    onClick={() => {
                        setAddClothingIsVisible((prevState) => !prevState);
                    }}
                >
                    Add new clothing
                </Button>
            </div>
            <div
                className={`${
                    addClothingIsVisible ? "" : "hidden"
                } mx-auto mb-8 flex justify-center rounded-xl bg-blue-100 p-2 dark:bg-slate-800 md:w-4/5 lg:w-2/3`}
            >
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={"m-2 flex content-center justify-center"}>
                            <label className={"m-1"}>
                                <input
                                    type="radio"
                                    value={ClothingType.SHIRT}
                                    checked={clothingObject.clothing_type === "shirt"}
                                    onChange={changeClothingType}
                                />
                                Shirt
                            </label>

                            <label className={"m-1"}>
                                <input
                                    type="radio"
                                    value={ClothingType.OUTWEAR}
                                    checked={clothingObject.clothing_type === "outwear"}
                                    onChange={changeClothingType}
                                />
                                Outwear
                            </label>

                            <label className={"m-1"}>
                                <input
                                    type="radio"
                                    value={ClothingType.BOTTOM}
                                    checked={clothingObject.clothing_type === "bottom"}
                                    onChange={changeClothingType}
                                />
                                Bottom
                            </label>
                        </div>

                        {/* Usable Temperature Range */}
                        <div className={"m-2 flex justify-center"}>
                            <label className={"m-1"}>
                                <input
                                    type="radio"
                                    value={UsableTemperatureRange.FREEZING}
                                    checked={
                                        clothingObject.usable_temperature_range === UsableTemperatureRange.FREEZING
                                    }
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
                        <div className={"m-2 flex justify-center"}>
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
                        <div className={"m-2 flex justify-center"}>
                            <input
                                required
                                className="m-2 rounded-md border px-4 py-2 focus:outline-none dark:bg-slate-600"
                                type="text"
                                placeholder="Name for item"
                                value={clothingObject.name}
                                onChange={handleClothingNameChange}
                            />
                        </div>
                        <div className={"flex flex-wrap justify-center"}>{renderImages()}</div>
                    </div>

                    <div className={"m-2 flex justify-center"}>
                        <Button className={"m-2"} type="submit">
                            Add Item
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
