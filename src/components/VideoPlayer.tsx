import { createIFrameLink } from "@/lib/utils";

export default function VideoPlayer(
    {videoId}:{videoId:string}){
        return(
            <div className="relative aspect-video w-full rounded-2xl bg-[#000] flex-none; lg:max-w-[50vw]">
                <iframe className="absolute inset-0 h-full w-full rounded-2xl"
                    src={createIFrameLink((videoId))}
                    loading="lazy"
                    title="video player"
                    style={{border:0,zIndex:50}}
                    allowFullScreen
                    allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
                />
            </div>
        )
}