import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Weatherwear",
    description: "Weatherwear - outfit suggestions based on weather",
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider enableSystem disableTransitionOnChange attribute="class" defaultTheme="system">
                    <nav className={""}>
                        <Navbar />
                    </nav>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
