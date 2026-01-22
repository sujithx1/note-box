import { Hono } from "hono"
import noteDI from "../di/notes.di"



const router = new Hono()



router.get("/notes", noteDI.findController)
router.post("/notes", noteDI.createController)
router.get("/notes/:id", noteDI.findByIdController)
router.get('/tags',noteDI.get_tags_apicontroller)
    


export default router