"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Navbar(
  {
    imageUrl,
    userId,
  }:{
    imageUrl : string,
    userId : string
  }
){
    const router = useRouter();
    return (
    <header className='flex items-center px-10 py-5 border-b border-b-shadow bg-background'>
      <div className='flex items-center justify-between max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <Link href="/" className='flex space-x-1'>
          <Image alt="logo" width={"32"} height="32" src={"/images/sample.png"} />
          <h1 className='font-extrabold text-bold'>Recordly</h1>
        </Link>
        {imageUrl && (<div className='flex items-center gap-2'>
          <figure>
            <button onClick={()=>router.push(`/profile/${userId}`)}>

            </button>
          </figure>
          <Link href={`/profile/${userId}`}>
            <Image width={"32"} height="32" alt="logo" src={imageUrl} className='rounded-full'/>
          </Link>
          <SignOutButton>
            <LogOut size={16}/>
          </SignOutButton>
        </div>)}
        
      </div>
      
    </header>
  )
}