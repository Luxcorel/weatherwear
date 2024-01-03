import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Profile | WeatherWear",
};

export default function Layout({ children }: { readonly children: React.ReactNode }) {
    return <div>{children}</div>;
}
