import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import router from './routes/note.router'
const app = new Hono()



app.use(logger())
app.use('*', cors())



app.route('/api/v1', router)



export default app
