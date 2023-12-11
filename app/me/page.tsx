import { auth } from "@/authConfig";

export default async function Page() {
    const session = await auth();
    return (
        <div>
            <h1 className={"my-5 text-center text-2xl"}>About me</h1>
            <p className={"text-center"}>{JSON.stringify(session?.user)}</p>
        </div>
    );
}
