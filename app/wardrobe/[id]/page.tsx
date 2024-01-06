import EditClothing from "@/app/wardrobe/components/edit-clothing";

export default function Page({ params }: { readonly params: { id: string } }) {
    return (
        <>
            <EditClothing id={params.id} />
        </>
    );
}
