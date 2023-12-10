import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1 className={"my-5 text-center text-2xl"}>NextJS api test</h1>

            <div className={"m-5 flex justify-center"}>
                <Link href={"/api/weather"}>
                    <Button>Weather test page</Button>
                </Link>
            </div>

            <div className={"m-5 flex justify-center"}>
                <Link href={"/me"}>
                    <Button>Protected page test page</Button>
                </Link>
            </div>
        </div>
    );
}
