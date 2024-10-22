import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { products } from "./routes/products.js"

const app = new Hono()

app.route("/product", products)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
