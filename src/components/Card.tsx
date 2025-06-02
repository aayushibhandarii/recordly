import { ChevronDown, Ellipsis, Eye, Link2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
export default function Card(
    {id,duration,createdAt,title,views,thumbnail,username,userprofile

    }:{
        id:number,
        duration: number,
        createdAt : Date,
        title : string,
        views : number,
        thumbnail : string,
        username? : string,
        userprofile? : string
}){
    return(
        <Link href={`/video/${id}`} className='flex flex-col rounded-2xl border border-gray-20 shadow-card w-full aspect-[16/9] bg-cardcolor'>
            <div className="bg-amber-300 relative w-full rounded-t-2xl object-cover h-[190px]">
                Image
                <div className='absolute top-0 right-0 flex flex-col gap-2'>
                    <button  className='link bg-white rounded-full p-1.5'>
                        <Link2 size={20}/>
                    </button>
                    <button className=' bg-white rounded-full p-1'>
                        <Ellipsis />
                    </button>
                </div>
                
                <div className='bg-[#212121] inline text-white rounded-2xl px-3 py-0.5 absolute bottom-1 right-0 text-sm'>
                   {Math.ceil(duration/60)} min
                </div>
            </div>
            <div className='flex flex-col px-3 py-4 gap-2'>
                <div className='flex justify-between '>
                    <div className='flex justify-center items-center space-x-2'>
                        <div className='rounded-full'>
                            <Image alt="logo" width={"30"} height="30" src={"/images/sample.png"}/>
                        </div>
                        
                        <div className='text-[13px]'>
                            <span className='font-bold'>{username} </span>
                            <div className='flex items-center'>
                                <span className='text-gray'>Not Shared</span>
                                <ChevronDown size={15}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex text-[13px] text-gray space-x-1'>
                        <Eye size={18}/ >
                        <span>{views}</span>
                    </div>
                </div>
                <div className='font-[600] text-[14px]'>
                    {title} - {createdAt.getDate()} {createdAt.toLocaleDateString("en-US",{month : "short",})} {createdAt.getFullYear()}
                </div>
            </div>
        </Link>
    )
}