"use client";

import useSWR from "swr";
import { SuggestionDTO } from "@/frontend-types/suggestion-dto";
import { fetcher } from "@/lib/swr-fetcher";
import React from "react";
import { useRouter } from "next/navigation";

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
            {isLoading ? <p className={"mb-5 animate-pulse text-center text-xl"}>Loading...</p> : null}

            {data ? (
                <div>
                    <h1>Outfit suggestion</h1>
                    <ul>
                        {data.outfit.map((clothing) =>
                            clothing.id ? (
                                <li key={clothing.id}>{JSON.stringify(clothing)}</li>
                            ) : (
                                <li key={undefined}>No {clothing.clothing_type}</li>
                            ),
                        )}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}
