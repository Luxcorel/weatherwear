import { auth } from "@/auth-config";

export default async function UserInfo() {
    const session = await auth();

    return (
        <>
            {session ? (
                <>
                    <p className={"text-center"}>
                        {session.user.name} ({session.user.email})
                    </p>
                    <p className={"text-center"}>{session.user.id}</p>
                </>
            ) : (
                <p className={"text-center text-2xl text-red-500"}>Could not load profile</p>
            )}
        </>
    );
}
