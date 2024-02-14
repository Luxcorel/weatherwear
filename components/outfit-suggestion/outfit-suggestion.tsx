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

function OutfitSuggestionSkeleton() {
    return (
        <div>
            <ul>
                <li key={"shirt"}>
                    <div className={"my-5 flex animate-pulse"}>
                        <Image
                            className={"mr-4 animate-spin grayscale"}
                            src={"/images/clothing/shirt/0.svg"}
                            alt={""}
                            width={75}
                            height={75}
                        />
                        <div className={"my-auto h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"} />
                    </div>
                </li>
                <li key={"outwear"}>
                    <div className={"my-5 flex animate-pulse"}>
                        <Image
                            className={"mr-4 animate-spin grayscale"}
                            src={"/images/clothing/outwear/0.svg"}
                            alt={""}
                            width={75}
                            height={75}
                        />
                        <div className={"my-auto h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"} />
                    </div>
                </li>
                <li key={"bottom"}>
                    <div className={"my-5 flex animate-pulse"}>
                        <Image
                            className={"mr-4 animate-spin grayscale"}
                            src={"/images/clothing/bottom/0.svg"}
                            alt={""}
                            width={75}
                            height={75}
                        />
                        <div className={"my-auto h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"} />
                    </div>
                </li>
            </ul>
        </div>
    );
}

function OutfitSuggestionCard(props: { readonly outfitData: SuggestionDTO }) {
    return (
        <div>
            <ul>
                {props.outfitData.outfit.map((clothing) => {
                    if (!clothing.id) {
                        return <li key={undefined}>No {clothing.clothing_type} received</li>;
                    }

                    return (
                        <li key={clothing.id}>
                            <div className={"my-5 flex"}>
                                <Image className={"mr-4"} src={clothing.icon_path} alt={""} width={75} height={75} />
                                <div className={"my-auto"}>{clothing.name}</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

// This component requires the client to be authenticated. Issues redirect to /setup if auth or location is missing.
export default function OutfitSuggestion(props: Props) {
    const router = useRouter();

    const { data, error, isLoading } = useSWR<SuggestionDTO>(
        `${props ? `/api/outfits?latitude=${props.latitude}&longitude=${props.longitude}` : ""}`,
        fetcher,
    );

    if (error) {
        router.push("/setup");
    }

    return (
        <div className={"text-center"}>
            {data ? <OutfitSuggestionCard outfitData={data} /> : <OutfitSuggestionSkeleton />}
        </div>
    );
}
