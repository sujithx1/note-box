import { INoteRepo } from "../../repository/INoterepo";






class Note_CreateUseCase {
    constructor(private noteRepository: INoteRepo) {}
  
    async execute(data: { title: string; content: string; tags?: string[] }) {
      // Business logic can be added here (e.g., validations)
      const newNote = await this.noteRepository.createNote(data);
      return newNote;
    }
  }
  
  export default Note_CreateUseCase;