import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Weatherwear",
    description: "Weatherwear - outfit suggestions based on weather",
};

export default function Layout({ children }: { readonly children: React.ReactNode }) {
    return <div>{children}</div>;
}
