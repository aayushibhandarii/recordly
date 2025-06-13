"use client"
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { transcribeVideo } from "@/lib/actions/transcribeAction";
import { saveVideoDetails, validateWithArcjet } from "@/lib/actions/video";
import { useFileInput } from "@/lib/hooks";
import { MAX_IMAGE_SIZE, MAX_VIDEO_SIZE } from "@/utils/constants";
import { useUploadThing } from "@/utils/uploadthing";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState} from "react";

export default function Upload(){
    const router = useRouter();
    const [isSubmitting ,setIsSubmitting] = useState(false);
    const [formData,setFormData] = useState<{title : string,description : string,visibility : "public"|"private"}>({
        title: "",
        description : "",
        visibility : "public"
    }) 
    const [videoDuration ,setVideoDuration] = useState(0);
    const [error,setError] = useState<string>("");

    const video = useFileInput(MAX_VIDEO_SIZE); //to store the video
    const thumbnail = useFileInput(MAX_IMAGE_SIZE);

    useEffect(()=>{
        if(video.duration !== null || video.duration!==0){
            setVideoDuration(video.duration);
        }
    },[video.duration]);
    useEffect(()=>{
        const checkForRecordedVideo = async()=>{
                try{
                    const stored = sessionStorage.getItem("recordedVideo");
                    if(!stored) return;

                    const {url,name,type,duration} = JSON.parse(stored);
                    const blob = await fetch(url).then((res)=>res.blob());
                    const file = new File([blob],name,{type,lastModified : Date.now()})

                    if(video.inputRef.current){
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(file);
                        video.inputRef.current.files = dataTransfer.files;

                        const event = new Event("change",{bubbles : true});
                        video.inputRef.current.dispatchEvent(event);

                        video.handleFileChange({
                            target : {files : dataTransfer.files}
                        } as ChangeEvent<HTMLInputElement>);
                    }
                    if(duration){
                        setVideoDuration(duration);
                    }
                    sessionStorage.removeItem("recordedVideo");
                    URL.revokeObjectURL(url);
                }catch (e){
                        console.error(e,"Error loading recorded video");
                }
        }
        checkForRecordedVideo()
    },[video])
    const { startUpload } = useUploadThing("mediaUploader", {
        onClientUploadComplete: () => {
        alert("uploaded successfully!");
        },
        onUploadError: () => {
        alert("error occurred while uploading");
        },
        onUploadBegin: (data) => {
        console.log("upload has begun for", data);
        },
    });
    const {user} = useUser();
    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault();
        setIsSubmitting(true);
        
        if(!user){
            redirect("/404");
        }
        try{
            
            if(!video.file || !thumbnail.file){
                setError("Please upload video and thumbnail");
                return;
            }
            if(!formData.title || !formData.description){
                setError("Please fill in the details");
                return;
            }
            //validating the request so user can only make 1 request per minute
            await validateWithArcjet(user.id);
            
            //upload video and thumbnail to uploadthing
            const resp = await startUpload([video.file,thumbnail.file]);
            if(!resp){
                return;
            }
            const videoId = resp[0].serverData.key;
            const video_upload_url = resp[0].serverData.fileUrl;
            const thumbnail_upload_url = resp[1].serverData.fileUrl;
            if(!video_upload_url || !thumbnail_upload_url ){
                throw new Error("failed to upload the video and thumbnail")
            }
            const transcript = await transcribeVideo(video_upload_url);
            if(transcript.error){
                throw new Error("Error in transcribing the video");
            }
            const result = await saveVideoDetails({
                videoUrl : video_upload_url,
                videoName : resp[1].name,
                thumbnailUrl : thumbnail_upload_url,
                ...formData,
                duration : videoDuration,
                videoId,
                visibility : formData.visibility
            }) 
            if(!result.success){
                throw new Error("Error ocurred while savving to database");
            }
            console.log(result);
            router.push(`/video/${result.videoId}`);
            
            
        }catch(error){
            console.log("Error submitting the form: ",error);
        }finally{
            setIsSubmitting(false);
        }
    }
    
    const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        const {name,value} = e.target; //name is the one that is get modified like title or description or visibility and value is the new value
        setFormData((prevFormData)=>{
            return{
                ...prevFormData,
                [name]:value
            }
        })
    }
    
    return(
        <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-7.5 pt-12.5 pb-20">
            <div>
                <h1 className="font-bold text-2xl mb-2">
                    Upload a video
                </h1>
                {error && (
                    <div className="">
                        {error}
                    </div>
                )} 
                    <form className="shadow-form rounded-2xl flex flex-col gap-6 bg-cardcolor px-5 py-7.5">
                        <FormField 
                        label={"Title"} 
                        placeholder={"Enter a clear and concise video title"} 
                        id={"title"} 
                        value={formData.title}
                        onChange={handleInputChange}
                        />
                        <FormField 
                            label={"Description"}
                            as={"textarea"}
                            placeholder={"Briefly describe what this video is about"}
                            id={"description"}
                            value={formData.description}
                            onChange={handleInputChange}     
                        />
                        <FileInput 
                        inputRef={video.inputRef}
                        label="Video" 
                        name="video" 
                        accept="video/*" 
                        file={video.file}
                        previewUrl={video.previewUrl}
                        onChange={video.handleFileChange}
                        onReset={video.resetFile}
                        type="video"
                        />
                        <FileInput 
                        inputRef={thumbnail.inputRef}
                        label="Thumnail" 
                        name="thumnail" 
                        accept="image/*" 
                        file={thumbnail.file}
                        previewUrl={thumbnail.previewUrl}
                        onChange={thumbnail.handleFileChange}
                        onReset={thumbnail.resetFile}
                        type="image"
                        />
                        <FormField 
                        label={"Visibility"} 
                        as={"select"} 
                        id={"visibility"} 
                        value={formData.description}
                        options={
                            [
                                {
                                    label:"public",
                                    value:"Public"
                                },
                                {
                                    label:"private",
                                    value:"Private"
                                },
                            ]
                        }
                        onChange={handleInputChange}
                        />
                        <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full bg-brown  rounded-2xl p-2 text-white hover:bg-brown-dark ${isSubmitting?"opacity-80" : null}`}
                        onClick={handleSubmit}
                        >
                            {isSubmitting?"Uploading..." :"Upload video"
                            }
                        </button>
                    </form>
                </div>
            </div>   
    )
}