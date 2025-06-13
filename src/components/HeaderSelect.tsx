"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export default function HeaderSelect (){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const handleSelect = (e:ChangeEvent<HTMLSelectElement>)=>{
        const {value} = e.target;
        
        const param = new URLSearchParams(searchParams);
        const currentFilter = param.get("filter");
        param.set("filter",value);
        if(currentFilter !== value){
            router.replace(`${pathname}?${param.toString()}`)
        }
    }
    return(
        <select 
        name="viewtime" 
        id="viewtime" 
        className='text-[13px]' 
        onChange={handleSelect}
        defaultValue={searchParams.get("filter")?.toString()}
        >
            <option value={"Most Viewed"}>Most viewed</option>
            <option value={"Most Recent"}>Most recent</option>
            <option value={"Oldest First"}>Oldest first</option>
            <option value={"Least Viewed"}>Least viewed</option>
        </select>
    )
}