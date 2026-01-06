import { INoteRepo } from "../../repository/INoterepo";





class Note_FindByIdUsecase {
  constructor(
    private noteRepository: INoteRepo
  ) {
    
  }
  async execute(id: string) {
    const note = await this.noteRepository.getNoteById(Number(id));
    return note;
  }
}


export default Note_FindByIdUsecase;