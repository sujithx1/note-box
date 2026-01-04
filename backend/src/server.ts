import { env } from "bun";
import app from "./app";





const port=env.PORT || 4000;
Bun.serve({
  port,
  fetch: app.fetch,
});



console.log(`Server is running on http://localhost:${port}`);