import EditClothing from "@/app/wardrobe/components/edit-clothing";

export default async function Page(props: { readonly params: Promise<{ id: string }> }) {
    const params = await props.params;
    return (
        <>
            <EditClothing id={params.id} />
        </>
    );
}
