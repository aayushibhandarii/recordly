"use client"
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { useFileInput } from "@/lib/hooks";
import { MAX_IMAGE_SIZE, MAX_VIDEO_SIZE } from "@/utils/constants";
import { ChangeEvent, FormEvent, useState} from "react";

export default function Upload(){
    const [isSubmitting ,setIsSubmitting] = useState(false);
    const [formData,setFormData] = useState({
        title: "",
        description : "",
        visibility : "public"
    }) 
    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault();
        setIsSubmitting(false);
        try{
            if(!video.file || !thumbnail.file){
                setError("Please upload video and thumbnail");
                return;
            }
            if(!formData.title || !formData.description){
                setError("Please fill in the details");
                return;
            }
        }catch(error){
            console.log("Error submitting the form: ",error);
        }finally{
            setIsSubmitting(false);
        }
    }
    const [error,setError] = useState<string>("");
    const video = useFileInput(MAX_VIDEO_SIZE); //to store the video
    const thumbnail = useFileInput(MAX_IMAGE_SIZE);
    const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value} = e.target; //name is the one that is get modified like title or description or visibility and value is the new value
        setFormData((prevFormData)=>{
            return{
                ...prevFormData,
                [name]:value
            }
        })
    }
    return(
        <div className="w-full mt-4 flex flex-col items-center">
            <div>
                <h1 className="font-bold text-2xl mb-2">
                    Upload a video
                </h1>
                {error && (
                    <div>
                        {error}
                    </div>
                )}
                <div className="bg-cardcolor p-6 rounded-2xl shadow-form">  
                    <form className="flex flex-col upload-form gap-4 ">
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
                        className="w-full bg-brown rounded-2xl p-2 text-white hover:bg-brown-dark"
                        onClick={handleSubmit}
                        >
                            {isSubmitting?"Uploading..." :"Upload video"
                            }
                        </button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}