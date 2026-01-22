import { Context } from "hono";
import Note_CreateUseCase from "../usecases/notes/create.usecase";
import Note_FindUsecase from "../usecases/notes/find.usecase";
import Note_FindByIdUsecase from "../usecases/notes/findbyId";
import { db } from "../config/db";
import { NoteSchema } from "../config/schema";









class Note_Controller {
    constructor(
        private createUseCase: Note_CreateUseCase,
        private findUseCase: Note_FindUsecase,
        private findByIdUseCase: Note_FindByIdUsecase
    ) {}

    // Controller methods would go here


    // async  createController(c:Context){
    //   const body=await c.req.json();
    //   const newNote=await this.createUseCase.execute(body);
    //   return c.json(newNote,201);
    // }

    // async findController(c:Context){
    //   const tag=c.req.query("tag");
    //   const searchQuery=c.req.query("searchQuery");
    //   const notes=await this.findUseCase.execute({tag,searchQuery});
    //   return c.json(notes,200);
    // }

    // async findByIdController(c:Context){
    //   const id=c.req.param("id");
    //   const note=await this.findByIdUseCase.execute(id);
    //   return c.json(note,200);
    // }




  createController=async(c:Context)=>{
    const body=await c.req.json();
    console.log(body);
    const newNote=await this.createUseCase.execute(body);
    return c.json(newNote,201);
  }

  findController=async(c:Context)=>{
    const tag=c.req.query("tag");
    const searchQuery=c.req.query("search");
    const notes=await this.findUseCase.execute({tag,searchQuery});
    return c.json({data:notes.notes ,count:notes.count},200); 
  }

  findByIdController=async(c:Context)=>{
    const id=c.req.param("id");
    const note=await this.findByIdUseCase.execute(id);
    return c.json(note,200);
  }


  get_tags_apicontroller=async(c:Context)=>{

    const alltags=await db.select(
      {
        tags:NoteSchema.tags,
        
      }
    ).from(NoteSchema)



const tags=Array.from(new Set(alltags.map((tag) => tag.tags).flat()));



    return c.json({data:tags},200);
  }
}

export default Note_Controller;