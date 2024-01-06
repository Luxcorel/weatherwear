import AddClothing from "@/app/wardrobe/components/add-clothing";
import SavedClothing from "@/app/wardrobe/components/saved-clothing";

//TODO: Add editing/deletion
export default function Page() {
    return (
        <>
            <div>
                <AddClothing />
            </div>

            <div className={"flex justify-center"}>
                <SavedClothing />
            </div>
        </>
    );
}
