import app from "./app";
import { db } from "./config/db";
import { NoteSchema } from "./config/schema";

// process.on("SIGINT", async () => {
//   await pool.end();
//   process.exit(0);
// });

// process.on("SIGTERM", async () => {
//   await pool.end();
//   process.exit(0);
// });


db.select().from(NoteSchema).execute().then(res=>console.log(res)).catch(err=>console.log(err));  



const port=process.env.PORT || 4000;
Bun.serve({
  port,
  fetch: app.fetch,
});



console.log(`Server is running on http://localhost:${port}`);