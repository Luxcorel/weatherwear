import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Spotify testing",
    description: "Bruh",
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
    return <div>{children}</div>;
}
