import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { auth } from "@/auth-config";
import React from "react";
import { PreloadData } from "@/components/preloadData";

export default async function Navbar() {
    const session = await auth();

    // TODO fix navbar so that it is dynamic
    return (
        <div
            className={
                "flex h-full min-w-fit flex-wrap items-center justify-center bg-blue-100 duration-700 ease-in hover:drop-shadow-md dark:bg-black dark:shadow-md dark:shadow-blue-950"
            }
        >
            <ThemeToggle />

            <div className={"m-1"}>
                <Link href={"/"}>
                    <Button variant={"default"}>Home</Button>
                </Link>
            </div>

            <div className={"m-1"}>
                <Link href={"/wardrobe"}>
                    <Button variant={"default"}>Wardrobe</Button>
                </Link>
            </div>

            <div className={"m-1"}>
                <Link href={"/profile"}>
                    <Button variant={"default"}>Profile</Button>
                </Link>
            </div>

            {session ? (
                <div className={"m-1"}>
                    <Link href={"/api/auth/signout"}>
                        <Button variant={"default"}>Logout ({session.user.name})</Button>
                    </Link>
                </div>
            ) : (
                <div className={"m-1"}>
                    <Link href={"/api/auth/signin"}>
                        <Button variant={"default"}>Login</Button>
                    </Link>
                </div>
            )}

            <PreloadData />
        </div>
    );
}
