import Card from '@/components/Card';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header'
import { getAllVideos } from '@/lib/actions/video'
import React from 'react'

const page = async(
  {searchParams}: 
   {searchParams : Promise<{filter : string|undefined,query:string|undefined,page : string|null}>}
  ) => {
  const {filter,query,page} = await searchParams;
  const {videos } = await getAllVideos(query,filter,Number(page) || 1);
  return (
    <>
    <Header subheading="Public library" heading="All Videos" userprofile={null}/>
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
    </>
  )
}

export default page
