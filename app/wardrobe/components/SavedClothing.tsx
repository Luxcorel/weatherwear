"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/swr-fetcher";
import { ClothingResponse } from "@/frontend-types/clothing-response";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SavedClothing() {
    const { data, error, isLoading } = useSWR<ClothingResponse>(`api/clothes`, fetcher);

    return (
        <>
            {data ? (
                data.clothes ? (
                    <ul>
                        {data.clothes.map((value, index, array) => (
                            <li key={value.id}>{value.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>NO CLOTHING FOUND</p>
                )
            ) : null}
        </>
    );
}
