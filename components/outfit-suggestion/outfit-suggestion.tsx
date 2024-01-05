"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/swr-fetcher";
import React from "react";
import { useRouter } from "next/navigation";
import { SuggestionDTO } from "@/frontend-types/clothing-types";
import Image from "next/image";

type Props = {
    readonly latitude: number;
    readonly longitude: number;
};

// This component requires the client to be authenticated. Issues redirect to /setup if auth or location is missing.
export default function OutfitSuggestion(props: Props) {
    const router = useRouter();

    const { data, error, isLoading } = useSWR<SuggestionDTO>(
        `${props ? `api/outfits?latitude=${props.latitude}&longitude=${props.longitude}` : ""}`,
        fetcher,
    );

    if (error) {
        router.push("/setup");
    }

    return (
        <div className={"text-center"}>
            {isLoading ? <p className={"mb-5 animate-pulse text-center text-xl"}>Loading outfit...</p> : null}

            {data ? (
                <div>
                    <ul>
                        {data.outfit.map((clothing) =>
                            clothing.id ? (
                                <li key={clothing.id}>
                                    <div className={"flex"}>
                                        <Image src={clothing.icon_path} alt={""} width={50} height={50} />
                                        <div>{clothing.name}</div>
                                    </div>
                                </li>
                            ) : (
                                <li key={undefined}>No {clothing.clothing_type} received</li>
                            ),
                        )}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}
