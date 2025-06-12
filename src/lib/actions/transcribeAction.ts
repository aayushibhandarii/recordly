"use server";
import { withErrorHandling } from "../utils";
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const headers = {
            "authorization" : `${process.env.ASSEMBLYAI_API_KEY}`,
            "content-type" : "application/json"
};
export const transcribeVideo = withErrorHandling( async(videoUrl : string)=>{
    const response = await fetch(`${process.env.ASSEMBLYAI_URL}`,{
        method : "POST",
        headers : headers,
        body : JSON.stringify({
            audio_url : videoUrl
        })

    });
    const result = await response.json();
    console.log("result is " ,result.status);

    let data = await getTranscript(result.id);
    console.log(data);
    let count = 0;
    while(count < 5 && data.status=="processing"){
        await sleep(3000);
        data = await getTranscript(result.id);
        console.log(data.status);
        count++;
    }

    if(data.error){
        return {
            error : true,
            message : data.error
        }
    }
    return {
        error : false,
        text : data.text,
        words : data.words,
    }
})
const getTranscript = async (id : string)=>{
    const endpoint = `${process.env.ASSEMBLYAI_URL}/${id}`;
    const response = await fetch(endpoint,{
        method : "GET",
        headers : headers
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    if(data.status == "error"){
        return {
            error : true,
            status : data.status,
            message : data.error
        }
    }
    
    return {
        error : false,
        status : data.status,
        text : data.text ,
        words : data.words
    };
}
