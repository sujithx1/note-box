import { NoteEntity } from "../entity/note.entity";






export interface INoteRepo {
  getNoteById(id: number): Promise<NoteEntity | null>;
  getNotes(filter: NoteFilter): Promise<{count: number; notes: NoteEntity[]}>;
  createNote(noteData: { title: string; content: string; tags?: string[] }): Promise<NoteEntity>;
  updateNote(id: number, noteData: { title?: string; content?: string; tags?: string[] }): Promise<NoteEntity | null>;
  deleteNote(id: number): Promise<boolean>;
}






export interface NoteFilter {
  tags?: string[];
  searchQuery?: string;
  page?: number;
  limit?: number;
} 