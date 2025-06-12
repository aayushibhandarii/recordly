import VideoDetailHeader from "@/components/VideoDetailHeader";
import VideoPlayer from "@/components/VideoPlayer";
import { getVideoDetails } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function VideoDetail(
    {
        params
    }:{
        params : Promise<{id:string}>
    }
){
    const {id} = await params;
    const {video,user} = await getVideoDetails(id);
    if(!video){
        redirect("/404");
    }
    return(
        <div className="max-w-[1440px] mx-auto mt-10  px-4 sm:px-6 lg:px-8 ">
            <VideoDetailHeader {...video} ownerId={user?.id} ownerName={user?.name} ownerProfile={user?.image}/>
            <section>
                <div>
                    <VideoPlayer videoId={video.videoId} />
                </div>
            </section>
        </div>
    )
}