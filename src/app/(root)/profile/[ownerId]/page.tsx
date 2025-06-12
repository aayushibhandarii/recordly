import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import { getUserDetails, getUserVideo } from "@/lib/utils";
import { redirect } from "next/navigation";

// import { auth, currentUser } from "@clerk/nextjs/server";
export default async function ProfilePage({
  params
}:{
  params : Promise<{ownerId:string}>
}){
  const {ownerId} = await params;
  const {videos} = await getUserVideo(ownerId);
  const user = await getUserDetails(ownerId);
  if(!user){
    redirect("/404")
  }
    return(
        <>
            <Header subheading={user.email} heading={user.name} userprofile={user.image} />
            <div className='mt-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center'>
                  <div className='mt-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center'>
                          {
                            videos?.length > 0 ? 
                            (
                              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
                                {
                                  videos.map((video)=>{
                                    return <Card key={video.video.id} id={video.video.id} duration={video.video.duration || 0} createdAt={video.video.createdAt} title={video.video.title} views={video.video.views} thumbnail={video.video.thumbnail_url} username={video.user?.name} userprofile={video.user?.image} / >
                                  })
                                }
                              </div>
                            ) :(
                              <EmptyState title="No Videos Found" description='Try adjusting your search'/>
                            )
                      }
                  </div>
                </div>
        </>
    )
}