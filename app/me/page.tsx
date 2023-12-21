import UserProfile from "@/components/user-info";
import { Suspense } from "react";

export default function Page() {
    return (
        <div>
            <h1 className={"my-5 text-center text-2xl"}>Your profile</h1>
            <Suspense fallback={<p className={"animate-pulse text-center text-2xl"}>Loading profile info...</p>}>
                <UserProfile />
            </Suspense>
        </div>
    );
}
