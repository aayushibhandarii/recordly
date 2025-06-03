
import { timestamp,pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users",{
    id:text("id").primaryKey(),
    name:text("name").notNull(),
    email:text("email").notNull().unique(),
    image:text("image"),
    createdAt:timestamp().defaultNow().notNull(),
    updatedAt:timestamp()
})