"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from 'use-debounce';
export default function HeaderSearch(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const handleChange = useDebouncedCallback((e:ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        console.log(value);
        
        const param = new URLSearchParams(searchParams);
        const currentQuery = param.get("query")
        if(value){
            param.set("query",value);
        }else{
            param.delete("query");
        }
        if(currentQuery !==value){
            router.replace(`${pathname}?${param.toString()}`)
        }
        
    },300)
    return(
        <form className='flex-1 flex max-w-xl bg-white rounded-2xl p-2 text-gray space-x-1 text-[13px]' onSubmit={(e)=>e.preventDefault()}>
            <Search size={20}/>
            <input 
            className="w-full focus:outline-none"
            placeholder='Search for prople, tags, folders, Spaces, and Looms'
            onChange={handleChange}
            />
        </form>
    )
}