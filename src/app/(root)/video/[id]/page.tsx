import Navbar from "@/components/Navbar";

export default async function VideoDetail(
    {
        params
    }:{
        params : Promise<{id:string}>
    }
){
    const {id} = await params;
    return(
        <>
            <Navbar />
        </>
    )
}