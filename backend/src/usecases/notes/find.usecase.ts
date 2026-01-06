import { INoteRepo } from "../../repository/INoterepo";





class Note_FindUsecase {
  constructor(
    private noteRepository: INoteRepo
  ) {
    

  }


  async execute(filter: { tag?: string; searchQuery?: string }) {
    const notes = await this.noteRepository.getNotes(filter);
    return notes;
  }
}

export default Note_FindUsecase;