"use client";

import React, { useEffect } from "react";
import { preload } from "swr";
import { fetcher } from "@/lib/swr-fetcher";

export function PreloadData() {
    useEffect(() => {
        preload(`/api/clothes`, fetcher);
        preload(`/api/locations`, fetcher);
    }, []);

    return <></>;
}
