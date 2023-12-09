"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    function cursedInsertIntoDom(data: any) {
        const paragraphElement = document.createElement("p");
        const textNode = document.createTextNode(data.message);
        paragraphElement.appendChild(textNode);

        const element = document.getElementById("result");
        if (element) {
            element.append(paragraphElement);
        }
    }

    async function handleGetButtonClick() {
        const response = await fetch("api/hello");
        const data = await response.json();
        cursedInsertIntoDom(data);
    }

    async function handlePostButtonClick() {
        const response = await fetch("api/hello", {
            method: "POST",
            body: JSON.stringify({ message: "hello" }),
        });
        const data = await response.json();
        cursedInsertIntoDom(data);
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            const email = formData.get("email");

            const response = await fetch("api/hello", {
                method: "POST",
                body: JSON.stringify({ email: email }),
            });

            const data = await response.json();
            cursedInsertIntoDom(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1 className={"my-5 text-center text-2xl"}>NextJS api test</h1>

            <button className={"m-5 mx-auto flex bg-teal-600 p-5"} onClick={handleGetButtonClick}>
                GET /api/hello
            </button>

            <button className={"m-5 mx-auto flex bg-teal-600 p-5"} onClick={() => router.push("/me")}>
                Go to protected page
            </button>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder={"Enter your email"}
                    name={"email"}
                    className={"mx-auto mb-5 flex text-black"}
                />
                <button type="submit" className={"mx-auto flex"}></button>
            </form>

            <div id={"result"}></div>
        </div>
    );
}
