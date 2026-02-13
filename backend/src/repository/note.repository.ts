import { and, desc, eq, ilike, inArray, or, SQL, sql, SQLWrapper } from "drizzle-orm";
import { db } from "../config/db";
import { NoteSchema } from "../config/schema";
import { noteDto } from "../dto/notes.dto";
import { NoteEntity } from "../entity/note.entity";
import { INoteRepo, NoteFilter } from "./INoterepo";





class NoteRepository implements INoteRepo {
  
async getNoteById(id: number): Promise<NoteEntity | null> {
  
    const note=await db.query.NoteSchema.findFirst({
      where: (noteTable, { eq }) => eq(noteTable.id, Number(id)),
    });

    if (!note) {
      return null;
    }

  return noteDto(note);
}

  async createNote(noteData: { title: string; content: string; tags?: string[] }): Promise<NoteEntity> {
    console.log(noteData);
    const [row] = await db.insert(NoteSchema).values({
      title: noteData.title,
      content: noteData.content,
      tags: noteData.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning()


    return noteDto(row);
  }


async deleteNote(id: number): Promise<boolean> {
  const deleted = await db.delete(NoteSchema).where(eq(NoteSchema.id, id));
  if(!deleted)return false;
  return true;
  
}

async getNotes(filter: NoteFilter): Promise<{count: number; notes: NoteEntity[]}> {


const conditions: SQL[] = [];

const page = Number(filter.page) || 1;
const limit = Number(filter.limit) || 1000;
const offset = (page - 1) * limit;

// Filter by tags
if (filter.tags?.length) {
  conditions.push(
    sql`${NoteSchema.tags} && ${filter.tags}`
  );
}

// Search filter
if (filter.searchQuery) {
  const search = `%${filter.searchQuery.trim()}%`;

  conditions.push(
    or(
      ilike(NoteSchema.title, search),
      ilike(NoteSchema.content, search)
    )as SQL
  );
}

const query = await db.query.NoteSchema.findMany({
  where: conditions.length ? and(...conditions) : undefined,
  orderBy:[desc(NoteSchema.createdAt)],
  limit,
  offset,
})

const count =await
 db.select({count:sql<number>`count(*)`})
 .from(NoteSchema).where(conditions.length ? and(...conditions) : undefined);

return {
  count: count[0].count,
  notes: query.map(noteDto),
}

}

updateNote(id: number, noteData: { title?: string; content?: string; tags?: string[]; }): Promise<NoteEntity | null> {

  const updatedAt = new Date();

  return db.transaction(async (tx) => {
    const existingNote = await tx.query.NoteSchema.findFirst({
      where: (noteTable, { eq }) => eq(noteTable.id, Number(id)),
    });

    if (!existingNote) {
      return null;
    }

    const updatedNote = await tx.update(NoteSchema)
      .set({
        title: noteData.title ?? existingNote.title,
        content: noteData.content ?? existingNote.content,
        tags: noteData.tags ?? existingNote.tags,
        updatedAt,
      })
      .where(eq(NoteSchema.id, id))
      .returning();

    return noteDto(updatedNote[0]);
  });
  
}


  // Other methods...
}




export default NoteRepository;