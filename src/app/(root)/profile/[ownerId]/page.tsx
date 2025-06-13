import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import { getUserVideo } from "@/lib/actions/video";
import { redirect } from "next/navigation";

// import { auth, currentUser } from "@clerk/nextjs/server";
export default async function ProfilePage({
  params,searchParams
}:{
  params : Promise<{ownerId:string}>,
  searchParams : Promise<{filter : string|undefined,query:string|undefined}>
}){
  const {ownerId} = await params;
  const {query,filter} = await searchParams;
  const {user,videos,count} = await getUserVideo(ownerId,query,filter);

  if(!user){
    redirect("/404")
  }
    return(
        <>
            <Header subheading={user.email} heading={user.name} userprofile={user.image} />
                  <div className='mt-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center'>
                          {
                            count > 0 ? 
                            (
                              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
                                {
                                  videos.map((video)=>{
                                    return <Card key={video.video.id} id={video.video.id} duration={video.video.duration || 0} createdAt={video.video.createdAt} title={video.video.title} views={video.video.views} thumbnail={video.video.thumbnail_url} username={video.user?.name} userprofile={video.user?.image}
                                    visibility={video.video.visibility}
                                    / >
                                  })
                                }
                              </div>
                            ) :(
                              <EmptyState title="No Videos Available Yet" description='Videos will show up once you upload them'/>
                            )
                      }
                  </div>
        </>
    )
}