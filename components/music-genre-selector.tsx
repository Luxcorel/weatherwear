"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function SelectedGenre() {
    function getClientSideCookie(name: string): string | undefined {
        return document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1];
    }

    const genreCookie = getClientSideCookie("genre");
    if (genreCookie) {
        return <h2 className={"text-center text-xl dark:text-slate-400"}>Current genre set: {genreCookie}</h2>;
    }
}

export default function MusicGenreSelector() {
    const router = useRouter();

    const [musicGenre, setMusicGenre] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMusicGenre(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const date = new Date();
        // Set it expire in 7 days
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

        document.cookie = `genre=${musicGenre}; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure=true`;

        router.refresh();
    };

    return (
        <div className={"flex w-3/4 flex-col"}>
            <SelectedGenre />

            <form className={"flex w-full flex-col"} onSubmit={handleSubmit}>
                <input
                    id={"submit"}
                    className="m-2 rounded-md border px-4 py-2 placeholder:text-slate-500 focus:outline-none dark:bg-slate-700 dark:text-slate-400"
                    type="text"
                    placeholder="Set genre (empty to disable)"
                    value={musicGenre}
                    onChange={handleChange}
                />
                <Button type="submit">Set new genre</Button>
            </form>
        </div>
    );
}
