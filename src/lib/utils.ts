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
        user : {id : users.id, name : users.name,image : users.image}
    })
    .from(uploaded_videos)
    .leftJoin(users,eq(uploaded_videos.userId ,users.id))

}