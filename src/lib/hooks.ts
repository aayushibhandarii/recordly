import {ChangeEvent, useEffect, useRef, useState } from "react"
import { calculateRecordingDuration, cleanupRecording, createAudioMixer, createRecordingBlob, getMediaStreams, setupRecording } from "./record";

export const useFileInput = (maxSize : number)=>{
    const [file,setFile] = useState<null | File>(null);
    const [previewUrl,setPreviewUrl] = useState("");
    const [duration,setDuration] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null); 
    const handleFileChange = (e : ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files?.[0]){
            const selectedFile = e.target.files[0]
            
            if(selectedFile.size>maxSize){
                return;
            }
            if(previewUrl) URL.revokeObjectURL(previewUrl)
            setFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
            if(selectedFile.type.startsWith("video")){
                const video = document.createElement("video")
                video.preload = "metadata"
                video.onloadedmetadata = ()=>{
                    if(isFinite(video.duration) && video.duration >0){
                        setDuration(Math.round(video.duration))
                    }else{
                        setDuration(0)
                    }
                    URL.revokeObjectURL(video.src)
                }
                video.src = objectUrl;
            }
        }
    }
    const resetFile = ()=>{
        if(previewUrl) URL.revokeObjectURL(previewUrl);

        setFile(null);
        setPreviewUrl("");
        setDuration(0);
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }
    return{
        file,
        inputRef,
        handleFileChange,resetFile,
        duration,
        previewUrl
    }
}
interface ExtendedMediaStream extends MediaStream {
  _originalStreams: MediaStream[];
}
export const useScreenRecording = ()=>{
    const [state,setState] = useState<{isRecording : boolean,recordedBlob : null|Blob,recordedVideoUrl : string,recordingDuration : number}>({
        isRecording : false,
        recordedBlob : null,
        recordedVideoUrl : "",
        recordingDuration : 0,
    })

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<ExtendedMediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(()=>{
        return ()=>{
            stopRecording();
            if(state.recordedVideoUrl) URL.revokeObjectURL(state.recordedVideoUrl);
            if(audioContextRef.current?.state !=="closed"){
                audioContextRef.current?.close().catch(console.error);
            }
            audioContextRef.current = null;
            
        }
    },[state.recordedVideoUrl]);
    
    const handleRecordingStop = ()=>{
        const {blob,url} = createRecordingBlob(chunksRef.current);
        const duration = calculateRecordingDuration(startTimeRef.current);
        setState((prev)=>(
            {
                ...prev,
                recordedVideoUrl:url,
                recordingDuration : duration,
                isRecording : false,
                recordedBlob : blob
            }
        ))
    }

    const startRecording = async(withMic = true)=>{
        try{
            stopRecording();

            const {displayStream,micStream,hasDisplayAudio} = await getMediaStreams(withMic);
            const combinedStream = new MediaStream() as ExtendedMediaStream;

            displayStream.getVideoTracks().forEach((track : MediaStreamTrack)=>combinedStream.addTrack(track));

            audioContextRef.current = new AudioContext();
            const audioDestination = createAudioMixer(
                audioContextRef.current,
                displayStream,
                micStream,
                hasDisplayAudio
            )

            audioDestination?.stream.getAudioTracks().forEach((track : MediaStreamTrack)=>combinedStream.addTrack(track));

            combinedStream._originalStreams = [
                displayStream,
                ...(micStream?[micStream]:[]),
            ]
            streamRef.current = combinedStream;

            mediaRecorderRef.current = setupRecording(combinedStream,{
                onDataAvailable : (e: { data: Blob; })=>e.data.size && chunksRef.current.push(e.data),
                onStop : handleRecordingStop
            })

            chunksRef.current = [];
            startTimeRef.current = Date.now();
            mediaRecorderRef.current?.start(1000)
            setState((prev)=>({...prev,isRecording:true}));
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    }
    const stopRecording = ()=>{
        cleanupRecording(
            mediaRecorderRef.current,
            streamRef.current,
            streamRef.current?._originalStreams
        );
        streamRef.current = null;
        setState((prev)=>({...prev,isRecording:false}))
    }

    const resetRecording = ()=>{
        stopRecording();
        if(state.recordedVideoUrl) URL.revokeObjectURL(state.recordedVideoUrl);
        setState({
            isRecording:false,
            recordedBlob:null,
            recordedVideoUrl:"",
            recordingDuration:0
        });
        startTimeRef.current = null;
    }

    return {
        ...state,
        startRecording,
        stopRecording,
        resetRecording
    }
}

