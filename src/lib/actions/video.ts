"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { buildVideoWithUserQuery, getOrderByClause, withErrorHandling } from "../utils";
import { transcribeVideo } from "./transcribeAction";
import { uploaded_videos} from "../../../drizzle/schema";
import { db } from "../../../drizzle/db";
import { revalidatePath } from "next/cache";
import { aj } from "@/app/api/arcjet/route";
import { fixedWindow, request } from "@arcjet/next";
import { and, eq, ilike, or, sql } from "drizzle-orm";

const revalidatePaths = (paths : string[])=>{
    paths.forEach((path)=>revalidatePath(path));
}

export const validateWithArcjet = async (fingerprint : string) =>{
    const rateLimit = aj.withRule(
        //can make 1 request per minute
        fixedWindow({
            mode : "LIVE",
            window : "1m",
            max : 1,
            characteristics : ["fingerprint"]
        })
    )
    const req = await request();
    const decision = await rateLimit.protect(req,{fingerprint});
    if(decision.isDenied()){
        throw new Error("Rate Limit exceeded");
    }
}

export const saveVideoDetails = withErrorHandling(async (
    {
        videoUrl,
        thumbnailUrl,
        title,
        description,
        visibility ,
        duration,
        videoName
    }
    :
    {
        videoUrl : string,
        thumbnailUrl : string,
        title : string,
        description : string,
        visibility : "public" | "private",
        duration? : number | null,
        videoName : string
    })=>{
        const {userId} = await auth(); //getting userid from clerk
        
        if(!userId){ //if user not exist
            return{
                success : false,
                message : "User not found",
                data :  null 
            }
        }
        await validateWithArcjet(userId);
        const data = await transcribeVideo(videoUrl);
        console.log(data.words);
        const result = await db.insert(uploaded_videos).values({
            userId:userId,
            video_url:videoUrl,
            file_name : videoName,
            thumbnail_url : thumbnailUrl,
            title : title,
            description : description,
            duration : duration ? duration : 0,
            visibility : visibility,
            transcript : data.error ? null:JSON.stringify(data.words),
            createdAt : new Date(),
            updatedAt : new Date()
        }).returning({id : uploaded_videos.id});
        console.log(result);
        revalidatePaths(['/']);
        return{
                success : true, 
                videoUrl : videoUrl,
                videoId : result[0].id
        }
    
})



export const getAllVideos = withErrorHandling(async(
    searchQuery : string="",
    sortFilter? : string,
    pageNumber : number = 1,
    pageSize : number =8,
)=>{
    const user = await currentUser();
    const userId = user?.id;

    //videos that are set to public or the videos that are created by the user .... these are the only videos that can be seen by the current user
    const videoToShownToUser = or(
        eq(uploaded_videos.visibility,"public"),
        eq(uploaded_videos.userId,userId!)
    )
    const whereCondition = searchQuery.trim()
        ? and(
            videoToShownToUser,
            ilike(uploaded_videos.title,`%${searchQuery}%`),
        ):videoToShownToUser;
    
    const [{totalCount}] = await db
        .select({totalCount : sql<number>`count(*)`})
        .from(uploaded_videos)
        .where(whereCondition);

    const totalVideos = Number(totalCount || 0);
    const totalPages = Math.ceil(totalVideos/pageSize);

    const videoRecords = await buildVideoWithUserQuery()
        .where(whereCondition)
        .orderBy(
            sortFilter?
            getOrderByClause(sortFilter) :
            sql`${uploaded_videos.createdAt} DESC`
        ).limit(pageSize)
        .offset((pageNumber-1)*pageSize)
    
    return {
        videos : videoRecords,
        pagination : {
            currentPage  : pageNumber,
            totalPages,
            totalVideos,
            pageSize
        }
    }
}) 