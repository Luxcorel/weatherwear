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
        return (
            <>
                <button
                    key={0}
                    id={`${0}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${0}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${0}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${0}.svg`}
                        alt={`Some picture ${0}`}
                    />
                </button>
                <button
                    key={1}
                    id={`${1}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${1}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${1}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${1}.svg`}
                        alt={`Some picture ${1}`}
                    />
                </button>
                <button
                    key={2}
                    id={`${2}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${2}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${2}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${2}.svg`}
                        alt={`Some picture ${2}`}
                    />
                </button>
                <button
                    key={3}
                    id={`${3}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${3}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${3}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${3}.svg`}
                        alt={`Some picture ${3}`}
                    />
                </button>
                <button
                    key={4}
                    id={`${4}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${4}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${4}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${4}.svg`}
                        alt={`Some picture ${4}`}
                    />
                </button>
                <button
                    key={5}
                    id={`${5}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${5}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${5}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${5}.svg`}
                        alt={`Some picture ${5}`}
                    />
                </button>
                <button
                    key={6}
                    id={`${6}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${6}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${6}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${6}.svg`}
                        alt={`Some picture ${6}`}
                    />
                </button>
                <button
                    key={7}
                    id={`${7}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${7}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${7}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${7}.svg`}
                        alt={`Some picture ${7}`}
                    />
                </button>
                <button
                    key={8}
                    id={`${8}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${8}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${8}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${8}.svg`}
                        alt={`Some picture ${8}`}
                    />
                </button>
                <button
                    key={9}
                    id={`${9}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${9}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${9}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${9}.svg`}
                        alt={`Some picture ${9}`}
                    />
                </button>
                <button
                    key={10}
                    id={`${10}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${10}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${10}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${10}.svg`}
                        alt={`Some picture ${10}`}
                    />
                </button>
                <button
                    key={11}
                    id={`${11}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${11}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${11}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${11}.svg`}
                        alt={`Some picture ${11}`}
                    />
                </button>
                <button
                    key={12}
                    id={`${12}`}
                    type={"button"}
                    className={`m-2 h-20 w-20 p-1 transition duration-300 ease-in-out hover:scale-110 ${
                        clothingObject.icon_path === `/images/clothing/${clothingObject.clothing_type}/${12}.svg`
                            ? "scale-110 rounded-xl bg-white dark:bg-blue-900"
                            : ""
                    }  `}
                    onClick={() => {
                        setClothingObject((prevState) => ({
                            ...prevState,
                            icon_path: `/images/clothing/${clothingObject.clothing_type}/${12}.svg`,
                        }));
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={`/images/clothing/${clothingObject.clothing_type}/${12}.svg`}
                        alt={`Some picture ${12}`}
                    />
                </button>
            </>
        );
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
