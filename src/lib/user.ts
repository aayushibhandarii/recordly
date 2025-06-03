import { UserJSON } from "@clerk/nextjs/server";
import { db } from "../../drizzle/db";
import { eq } from "drizzle-orm";
import { users } from "../../drizzle/schema";

export default async function userCreated(data: UserJSON){
    const id = data.id;
    const first_name = data.first_name;
    const last_name = data.last_name;
    const email = data.email_addresses[0].email_address;
    const image = data.image_url;
    await createOrUpdateUser({id,first_name,last_name,email,image});
}
async function createOrUpdateUser({id,first_name,last_name,email,image}:{
    id:string,
    first_name:string|null,
    last_name:string|null,
    email:string,
    image:string
}) {
    try{
        const user = await db.select().from(users).where(eq(users.email,email)) ; //checking if user exists or not
        let name ="";
        if(first_name){
            name+=first_name;
        }
        if(last_name){
            name+=" "+last_name;
        }
        if(user.length ===0){ //if user doesn't exist then only add it to the database
            await db.insert(users).values({id:id,
                name:name,
                email:email,
                image:image
            })
        }
    }catch(error){
        console.log("Error creating or updating user",error);
    }
}