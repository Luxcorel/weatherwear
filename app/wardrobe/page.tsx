import AddClothing from "@/app/wardrobe/components/add-clothing";
import SavedClothing from "@/app/wardrobe/components/saved-clothing";

export default function Page() {
    return (
        <>
            <div className={"mt-5"}>
                <AddClothing />
            </div>

            <div className={"flex justify-center"}>
                <SavedClothing />
            </div>
        </>
    );
}
