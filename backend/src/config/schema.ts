import { pgSchema, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const  noteSchema=pgSchema("notes");
  export const NoteSchema=noteSchema.table("notes", {
    id: serial("id").primaryKey(),
    title: varchar("title").notNull(),
    content: text("content").notNull(),
    tags: text("tags").array().default([]).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });