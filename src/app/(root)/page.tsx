import Card from '@/components/Card'
import EmptyState from '@/components/EmptyState'
import Header from '@/components/Header'
import { getAllVideos } from '@/lib/actions/video'
import React from 'react'

const page = async(
  {searchParams}: 
   {searchParams : Promise<{filter : string|undefined,query:string|undefined,page : string|null}>}
  ) => {
  const {filter,query,page} = await searchParams;
  const {videos,pagination } = await getAllVideos(query,filter,Number(page) || 1);
  return (
    <>
    <Header subheading="Public library" heading="All Videos"/>
    <div className='mt-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center'>
        {
          videos?.length > 10 ? 
          (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
              {
                videos[0].video.title
              }
            </div>
          ) :(
            <EmptyState title="No Videos Found" description='Try adjusting your search'/>
          )
        }
        {/* <Card id={1} duration={126} createdAt={new Date("2025-02-24")} title="SnapChat Message" views={75} thumbnail={"hey"} username={"Aayushi"} userprofile={"yoo"} / > */}
    </div>
    </>
  )
}

export default page
