import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { auth } from "@/auth-config";

// this is just a temporary navbar. it is supposed to be better in the future.
export default async function Navbar() {
    const session = await auth();

    return (
        <div className={"flex flex-wrap justify-start"}>
            <ThemeToggle />

            <div className={"flex justify-center"}>
                <Link href={"/"}>
                    <Button variant={"outline"}>Home</Button>
                </Link>
            </div>

            <div className={"flex justify-center"}>
                <Link href={"/weather"}>
                    <Button variant={"outline"}>Weather</Button>
                </Link>
            </div>

            <div className={"flex justify-center"}>
                <Link href={"/me"}>
                    <Button variant={"outline"}>User info</Button>
                </Link>
            </div>

            <div className={"flex justify-center"}>
                <Link href={"/test"}>
                    <Button variant={"outline"}>Outfit testing</Button>
                </Link>
            </div>

            {session ? (
                <div className={"flex justify-center"}>
                    <Link href={"/api/auth/signout"}>
                        <Button variant={"outline"}>Logout ({session.user.name})</Button>
                    </Link>
                </div>
            ) : (
                <div className={"flex justify-center"}>
                    <Link href={"/api/auth/signin"}>
                        <Button variant={"outline"}>Login</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
