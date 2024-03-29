import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Wardrobe | WeatherWear",
};

export default function Layout({ children }: { readonly children: React.ReactNode }) {
    return <div>{children}</div>;
}
