import { Plus, Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, MouseEventHandler, RefObject } from "react";

export default function FileInput({
    name,label,accept,file,previewUrl,inputRef,onChange,onReset,type
}:{
    name:string,
    label:string,
    accept:string,
    inputRef: RefObject<HTMLInputElement |null>,
    file:File | null,
    previewUrl : string,
    onChange : (e:ChangeEvent<HTMLInputElement>)=>void
    onReset : MouseEventHandler
    type:string
}){
    return(
        <div className="form-field">
            <label htmlFor={name}>{label}</label>
            <div className={`flex justify-center items-center bg-white w-full ${previewUrl?"h-64" : "h-[100px]"}  rounded-2xl`}>
                
                <input 
                type="file" 
                name={name} 
                accept={accept}
                ref = {inputRef}
                onChange={onChange}
                hidden
                />
                {!previewUrl?
                (
                <div className="flex items-center gap-2.5 cursor-pointer" onClick={()=>inputRef.current?.click()}>
                    <Upload size={16}/>
                    <span className="text-gray text-[12px]">
                        Upload a {name}
                    </span>
                </div>
                ) :(
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black">
                        {
                            type==="video" ?
                            <video className="w-full h-full object-contain " src={previewUrl} controls /> : <Image className="object-contain" src={previewUrl} alt="thumnail" 
                            fill
                            />
                        }
                        <button type="button" onClick={onReset} className="absolute top-2 right-2 bg-gray-20 text-white p-2 rounded-full opacity-90 hover:opacity-100 cursor-pointer">
                            <Plus  size={16} className="rotate-45"/>
                        </button>
                        <p className="absolute bottom-0 left-0 right-0 bg-dark-100 text-white px-3 py-1 text-sm truncate">{file?.name}</p>
                    </div>
                ) 
    }
            </div>
        </div>
    )
}