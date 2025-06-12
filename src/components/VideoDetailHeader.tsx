"use client"
import { Check, Eye, Link2 } from "lucide-react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function VideoDetailHeader(
    {title,ownerId,ownerProfile,ownerName,createdAt,id

    }:
    {
        title : string,
        ownerId? : string,
        ownerProfile? : string | null,
        ownerName? : string ,
        createdAt : Date,
        id : string
    }
){
    const [copied,setCopied] = useState(false);
    const handleCopyLink = ()=>{
        navigator.clipboard.writeText(`${window.location.origin}/video/${id}`)
        setCopied(true);
    }
    useEffect(()=>{
        const changeChecked = setTimeout(()=>{
            if(copied){
                setCopied(false);
            }
            
        },2000);
        return ()=> clearTimeout(changeChecked)
    },[copied])
    const router = useRouter();
    return(
        <header >

            <div className="flex justify-between items-center">
                <aside>
                    <h1 className="text-2xl font-bold">
                        {title}
                    </h1>
                    <div className="flex items-center mt-2 mb-2 space-x-2"> 
                        <figure>
                            <button onClick={()=>router.push(`/profile/${ownerId}`)}>
                                <Image 
                                    src={ownerProfile || ""} 
                                    alt={"Owner profile"} 
                                    width="24" height="24" className='rounded-full'
                                />
                            </button>
                        </figure>
                        
                        <div className="text-gray space-x-2 text-sm">
                            <span>
                                {ownerName}
                            </span>
                            <span>
                                &#8226;
                            </span>
                            <span> 
                                {createdAt.getDate()} {createdAt.toLocaleDateString("en-US",{month : "short",})} {createdAt.getFullYear()}
                            </span>
                        </div>
                        
                    </div>
                </aside>
                

                <div className="flex gap-3 items-center">
                    <button className={copied ? "" : "link"} onClick={handleCopyLink}>
                        {
                           copied?<Check strokeWidth={3} size={20} /> : <Link2 strokeWidth={3} size={20}/>
                        }
                        
                    </button>
                    <button className='flex items-center text-[13px] space-x-1 rounded-2xl py-1.5 px-4  bg-white text-orange border border-shadow'>
                        Delete video
                    </button>
                    <button className='flex items-center text-[13px] space-x-1 rounded-2xl py-1.5 px-4 bg-white border border-shadow'>
                        <Eye size={15} />
                        <span>Public</span>
                    </button>
                </div>
            </div>
                
                
            </header>
    )
}