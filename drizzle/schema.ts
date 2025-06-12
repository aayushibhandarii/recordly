import { timestamp,pgTable, text, uuid,integer, json } from "drizzle-orm/pg-core";

export const users = pgTable("users",{
    id:text("id").primaryKey(),
    name:text("name").notNull(),
    email:text("email").notNull().unique(),
    image:text("image"),
    createdAt:timestamp().defaultNow().notNull(),
    updatedAt:timestamp().defaultNow()
})
export const uploaded_videos = pgTable("uploaded_videos",{
    id: uuid("id").primaryKey().defaultRandom().unique(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id,{onDelete : "cascade"}),
    file_name:text("file_name").notNull(),
    views : integer("views").notNull().default(0),
    duration : integer("duration"),
    video_url : text("video_url").notNull(),
    thumbnail_url : text("thumbnail_url").notNull(),
    title : text("title").notNull(),
    description : text("description").notNull(),
    transcript : json(),
    visibility : text("visibility").$type<"public" | "private">().notNull(),
    videoId : text("videoId").notNull(),
    createdAt:timestamp().defaultNow().notNull(),
    updatedAt:timestamp().defaultNow().notNull()
})
 
//[     {
//       "text": "My",
//       "start": 400,
//       "end": 560,
//       "confidence": 0.99560547,
//       "speaker": null
//     },
//     {
//       "text": "first",
//       "start": 560,
//       "end": 880,
//       "confidence": 0.9995117,
//       "speaker": null
//     },]