import { Hono } from 'hono'
import { z, ZodObject } from "zod"

import { validator } from 'hono/validator'
import { createMiddleware } from 'hono/factory'

/**
 * returns a validator based on a passed
 * in zod schema.
 */
export const validateJSON = <T extends ZodObject<any>>(schema: T) => {
    return validator("json", (val, ctx) => {
        const parsed = schema.safeParse(val)

        if (!parsed.success) {
            return ctx.text("Invalid", 401)
        }

        return parsed.data as z.infer<T>
    })
}

/**
 * gets a token from the request header
 * and then verifies the user.
 */
export const authMiddleware = createMiddleware<{
    Variables: {
        userId: string
    }
}>((ctx, next) => {
    // read user id from a token
    // check if user exists
    ctx.set("userId", "xxx")
    return next()
})