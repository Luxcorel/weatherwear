"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/swr-fetcher";
import { AllSavedClothingResponse } from "@/frontend-types/clothing-types";
import Image from "next/image";

export default function SavedClothing() {
    const { data, error, isLoading } = useSWR<AllSavedClothingResponse>(`api/clothes`, fetcher);

    return (
        <>
            {data ? (
                data.clothes ? (
                    <div className={"flex flex-wrap justify-evenly"}>
                        {data.clothes.map((value, index, array) => (
                            <div key={value.id} className={"m-5"}>
                                <Image src={value.icon_path} alt={""} width={50} height={50} />
                                {value.name}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>NO CLOTHING FOUND</p>
                )
            ) : null}
        </>
    );
}
