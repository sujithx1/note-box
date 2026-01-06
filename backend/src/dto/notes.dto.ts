import { InferSelectModel } from "drizzle-orm";
import z from "zod"
import { NoteSchema } from "../config/schema";
import { NoteEntity } from "../entity/note.entity";



type pgRow= InferSelectModel<typeof NoteSchema>;

export const noteDto=(note:pgRow)=>{
    return new NoteEntity({
        id:note.id,
        title:note.title,
        content:note.content,
        tags:note.tags,
        createdAt:note.createdAt,
        updatedAt:note.updatedAt,
    });
}