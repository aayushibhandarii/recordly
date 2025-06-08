import { Upload } from "lucide-react";
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
        <div className="form-field flex flex-col ">
            <label htmlFor={name}>{label}</label>
            <div className="flex justify-center items-center bg-white w-full h-[80px] rounded-2xl">
                
                <input 
                type="file" 
                name={name} 
                accept={accept}
                ref = {inputRef}
                onChange={onChange}
                hidden
                />
                {!previewUrl?
                (<div className="flex" onClick={()=>inputRef.current?.click()}>
                    <Upload size={16}/>
                    <span className="text-gray text-[12px]">
                        Upload a {name}
                    </span>
                </div>) :(
                    <div>
                        {
                            type==="video" ?
                            <video src={previewUrl} controls /> : <Image src={previewUrl} alt="thumnail" fill />
                        }
                        <button onClick={onReset}>
                            
                        </button>
                        <p>{file?.name}</p>
                    </div>
                ) 
    }
            </div>
        </div>
    )
}