import Note_Controller from "../controller/note.controller";
import NoteRepository from "../repository/note.repository";
import Note_CreateUseCase from "../usecases/notes/create.usecase";
import Note_FindUsecase from "../usecases/notes/find.usecase";
import Note_FindByIdUsecase from "../usecases/notes/findbyId";







//db repository instance

const noterepo=new NoteRepository();


//usecase instances
const cerateuseCase=new Note_CreateUseCase(noterepo);
const noteFindUsecase=new Note_FindUsecase(noterepo);
const noteFindByIdUsecase=new Note_FindByIdUsecase(noterepo);


//controller instance

const noteDI=new Note_Controller(
    cerateuseCase,
    noteFindUsecase,
    noteFindByIdUsecase
);

export default noteDI;