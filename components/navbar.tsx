import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { auth } from "@/auth-config";
import React from "react";

// this is just a temporary navbar. it is supposed to be better in the future.
export default async function Navbar() {
    const session = await auth();

    // TODO fix navbar so that it is dynamic
    return (
        <div
            className={
                "flex h-14 min-w-fit flex-wrap items-center justify-around bg-blue-100 duration-700 ease-in hover:drop-shadow"
            }
        >
            <ThemeToggle />

            <div>
                <Link href={"/"}>
                    <Button
                        className={
                            "rounded-3xl border-2 border-gray-500 bg-blue-100 text-lg text-black duration-500 ease-in-out hover:border-green-500 hover:bg-white"
                        }
                    >
                        Home
                    </Button>
                </Link>
            </div>

            <div>
                <Link href={"/weather"}>
                    <Button
                        className={
                            "rounded-3xl border-2 border-gray-500 bg-blue-100 text-lg text-black duration-500 ease-in-out hover:border-green-500 hover:bg-white"
                        }
                    >
                        Weather
                    </Button>
                </Link>
            </div>

            <div>
                <Link href={"/me"}>
                    <Button
                        className={
                            "rounded-3xl border-2 border-gray-500 bg-blue-100 text-lg text-black duration-500 ease-in-out hover:border-green-500 hover:bg-white"
                        }
                    >
                        User info
                    </Button>
                </Link>
            </div>

            <div>
                <Link href={"/test"}>
                    <Button
                        className={
                            "rounded-3xl border-2 border-gray-500 bg-blue-100 text-lg text-black duration-500 ease-in-out hover:border-green-500 hover:bg-white"
                        }
                    >
                        Outfit testing
                    </Button>
                </Link>
            </div>

            {session ? (
                <div>
                    <Link href={"/api/auth/signout"}>
                        <Button
                            className={
                                "rounded-3xl border-2 border-gray-500 bg-blue-100 text-lg text-black duration-500 ease-in-out hover:border-green-500 hover:bg-white"
                            }
                        >
                            Logout ({session.user.name})
                        </Button>
                    </Link>
                </div>
            ) : (
                <div>
                    <Link href={"/api/auth/signin"}>
                        <Button
                            className={
                                "rounded-3xl border-2 border-gray-500 bg-blue-100 text-lg text-black duration-500 ease-in-out hover:border-red-500 hover:bg-white"
                            }
                        >
                            Login
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
