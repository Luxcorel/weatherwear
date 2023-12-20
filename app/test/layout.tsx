import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Outfit test page",
    description: "The outfit test page",
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
    return <div>{children}</div>;
}
