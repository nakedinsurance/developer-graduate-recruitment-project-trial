import { Hono } from "hono"
import { z } from "zod"

import { authMiddleware, validateJSON } from "../../../component3/src/utils/index.js"

import { Cart } from "../../../component3/src/services/cart.js"
import { Product } from "../services/product.js"

const app = new Hono();

app.get('/', async (ctx) => {
    const products = await Product.list();
    return ctx.json(products);
})

app.post(
    "/cart",
    validateJSON(z.object({ productId: z.string(), action: z.enum(["ADD", "REMOVE"]) })),
    authMiddleware,
    async (ctx) => {
        const { action, productId } = ctx.req.valid("json")

        const { userId } = ctx.var

        if (action === "ADD") {
            await Cart.addProductById(productId, userId)
        } else {
            await Cart.removeProductById(productId, userId)
        }

        return ctx.status(200)
    })

app.delete(
    "/cart",
    authMiddleware,
    async (ctx) => {
        const { userId } = ctx.var
        await Cart.clear(userId)

        return ctx.status(200)
    }
)

export const products = app