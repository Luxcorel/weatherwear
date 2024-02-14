"use client";

import useSWR, { preload } from "swr";
import { fetcher } from "@/lib/swr-fetcher";
import { AllSavedClothingResponse } from "@/frontend-types/clothing-types";
import Image from "next/image";
import Link from "next/link";

export default function SavedClothing() {
    const { data, error, isLoading } = useSWR<AllSavedClothingResponse>(`/api/clothes`, fetcher);

    return (
        <div className={"mb-7 mt-4 w-full md:w-4/5 lg:w-2/3"}>
            {data ? (
                data.clothes ? (
                    <div className={"flex flex-wrap justify-center"}>
                        {data.clothes.map((value, index, array) => (
                            <div
                                key={value.id}
                                className={
                                    "mx-2 my-4 h-fit w-20 p-1 hover:scale-110 hover:rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900"
                                }
                            >
                                <Link
                                    href={`/wardrobe/${value.id}`}
                                    onMouseOver={() => preload(`/api/clothes/${value.id}`, fetcher)}
                                >
                                    <Image
                                        className={"mx-auto"}
                                        src={value.icon_path}
                                        alt={`Image of clothing named ${value.name}`}
                                        width={75}
                                        height={75}
                                    />
                                    <p className={"text-center"}>{value.name}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>NO CLOTHING FOUND</p>
                )
            ) : null}
        </div>
    );
}
