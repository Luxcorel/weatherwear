import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "NextJS test app",
    description: "A NextJS test app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}
