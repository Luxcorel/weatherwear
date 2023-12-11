import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
    return (
        <div className={"flex justify-start"}>
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
        </div>
    );
}
