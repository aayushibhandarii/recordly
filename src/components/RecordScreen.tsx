"use client";
import { useScreenRecording } from "@/lib/hooks";
import { Home, Upload, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Image from "next/image";

export default function RecordScreen(){
    const router = useRouter();
    const [isOpen,setIsOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const {
        isRecording ,
        recordedBlob ,
        recordedVideoUrl,
        recordingDuration,
        startRecording,
        stopRecording,
        resetRecording
    }  = useScreenRecording();

    const closeModel = ()=>{
        setIsOpen(false);
        resetRecording()
    }
    const handleStart = async ()=>{
        await startRecording();
    }
    const recordAgain = async ()=>{
        resetRecording();
        await startRecording();
        if(recordedVideoUrl && videoRef.current){
            videoRef.current.src = recordedVideoUrl
        }
    }
    const goToUpload = ()=>{
        if(!recordedBlob) return;
        const url = URL.createObjectURL(recordedBlob);
        sessionStorage.setItem("recordedVideo",
            JSON.stringify({
                url,
                name : "screen-recording.webm",
                type : recordedBlob.type,
                size : recordedBlob.size,
                duration : recordingDuration || 0
            })
        )
        router.push("/upload");
        closeModel();
    }
    return(
        <div>
            <button className='flex items-center text-[13px] space-x-1 rounded-2xl py-1.5 px-4 text-white bg-brown' onClick={()=>setIsOpen(true)}>
                <Video size={15} />
                <span>Record a video</span>
            </button>

            {isOpen && (
                <section className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-40 backdrop-blur-xs shadow-20" onClick={closeModel} />
                        <div className="relative bg-white rounded-2xl p-6 shadow-2xl w-full max-w-lg z-10">
                            <div className="flex justify-between items-center mb-4">
                                <div className='flex items-center space-x-2'>
                                    <Image alt="logo" width={"32"} height="32" src={"/images/sample.png"} />
                                    <h1 className='font-extrabold text-bold'>Recordly</h1>
                                </div>
                                <button className="p-2 rounded-full hover:bg-gray-20" onClick={closeModel}>
                                    <Home size={20}/>
                                </button>
                            </div>
                                
                            <section className="w-full rounded-18 flex items-center justify-center overflow-hidden">
                                {isRecording ? (
                                    <article className="flex flex-col items-center gap-2">
                                        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"/>
                                        <span className="text-textcolor text-base font-medium">Recording in progress</span>
                                    </article>
                                ):recordedVideoUrl ? (
                                   <video className="w-full h-full object-contain" ref={videoRef} src={recordedVideoUrl} controls/>
                                ) : (
                                    <p className="text-base font-medium text-gray">Click record to start capturing your screen</p>
                                )}
                            </section>
                            <div className="flex justify-center gap-4 mt-4">
                                {!isRecording && !recordedVideoUrl && (
                                    <button className="py-2.5 px-6 bg-brown text-white rounded-4xl font-medium flex items-center gap-2
          }" onClick={handleStart}>
                                        <Video size={16}/>
                                        Start Recording
                                    </button>
                                )}
                                {isRecording && (
                                    <button onClick={stopRecording} className=" py-2.5 px-6 bg-red-500 text-white rounded-4xl font-medium flex items-center gap-2">
                                        <Video size={16}/>
                                        Stop Recording
                                    </button>
                                )}
                                {
                                    recordedVideoUrl && (
                                        <>
                                            <button className="py-2.5 px-6 bg-gray text-white rounded-4xl font-medium" onClick={recordAgain}>
                                                Record Again
                                            </button>
                                            <button className="py-2.5 px-6 bg-brown text-white rounded-4xl font-medium flex items-center gap-2" onClick={goToUpload}>
                                                <Upload className="brightness-0 invert" size={16}/>
                                               Continue to upload
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                </section>
            )}
        </div>
    )
}