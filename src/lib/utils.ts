import { sql ,eq} from "drizzle-orm";
import { uploaded_videos, users } from "../../drizzle/schema";
import { db } from "../../drizzle/db";

export const withErrorHandling = <T,A extends unknown[]>(
    fn:(...args:A)=>Promise<T>
)=>{
    return async(...args:A):Promise<T>=>{
        try{
            const result = await fn(...args);
            return result;
        }catch (error){
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            console.log(errorMessage);
            return errorMessage as unknown as T;
        }
    }
}

export const getOrderByClause = (filter? : string)=>{
    switch (filter) {
        case "Most Viewed" :
            return sql`${uploaded_videos.views} DESC`
        case "Least Viewed" : 
            return sql`${uploaded_videos.views} ASC`
        case "Oldest First" :
            return sql`${uploaded_videos.createdAt} ASC`
        default : 
            return sql`${uploaded_videos.createdAt} DESC`
    }
}

export const buildVideoWithUserQuery = ()=>{
    return db.select({
        video : uploaded_videos,
        user : {id : users.id, name : users.name,image : users.image,email:users.email}
    })
    .from(uploaded_videos)
    .leftJoin(users,eq(uploaded_videos.userId ,users.id))

}

export const getVideoDetails = async (videoId:string)=>{
    const [video] = await buildVideoWithUserQuery()
    .where(eq(uploaded_videos.id,videoId))
    return video;
}
export const getUserVideo = async (userId:string)=>{
    const video = await buildVideoWithUserQuery()
    .where(eq(users.id,userId))
    
    return {videos : video};
}

export const createIFrameLink = (videoId : string)=>
    `https://9j5tn8viar.ufs.sh/f/${videoId}?autoplay=true&preload=true`

export type videoDetailProps = {
    id: string;
    userId: string;
    file_name: string;
    views: number;
    duration: number | null;
    video_url: string;
    thumbnail_url: string;
    title: string;
    description: string;
    transcript: unknown;
    visibility: "public" | "private";
    createdAt: Date;
    updatedAt: Date;
}
export type userProps ={
    id: string;
    name: string;
    image: string | null;

}
export const getUserDetails = async (userId : string)=>{
    const [{user}] = await buildVideoWithUserQuery()
    .where(eq(users.id,userId))
    return user;
}