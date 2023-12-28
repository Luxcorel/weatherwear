import { auth } from "@/auth-config";

export default async function UserInfo() {
    const session = await auth();

    return (
        <>
            {session ? (
                <>
                    <p className={"text-center"}>UUID: {session.user.id}</p>
                    <p className={"text-center"}>EMAIL: {session.user.email}</p>
                    <p className={"text-center"}>NAME: {session.user.name}</p>
                    <p className={"text-center"}>OAUTH PROVIDER: {session.user.provider}</p>
                    <p className={"text-center"}>ACCESS_TOKEN: {session.user.accessToken}</p>
                </>
            ) : (
                <p className={"text-center text-2xl text-red-500"}>Could not load profile</p>
            )}
        </>
    );
}
