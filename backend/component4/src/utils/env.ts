import 'dotenv/config'

import { z } from "zod"

const schema = z.object({
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_USER: z.string()
})

export const env = schema.parse(process.env)