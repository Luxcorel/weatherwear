import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1 className={"my-5 text-center text-2xl"}>NextJS api test</h1>

            <Link href={"/api/weather"}>
                <Button className={"m-5 mx-auto flex bg-teal-600 p-5"}>Weather test page</Button>
            </Link>

            <Link href={"/me"}>
                <Button className={"m-5 mx-auto flex bg-teal-600 p-5"}>Protected page test page</Button>
            </Link>
        </div>
    );
}
