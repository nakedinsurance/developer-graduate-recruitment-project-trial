import { Hono } from "hono"

import { z } from "zod"

import { authMiddleware, validateJSON } from "../utils/index.js"

import { paymentProviderAPI } from "../providers/pay.js"

import { PaymentMethod } from "../services/payment-method.js"
import { Cart } from "../services/cart.js"
import { CustomerProduct } from "../services/customer-product.js"

const app = new Hono()

app.post("/", validateJSON(z.object({ paymentMethodId: z.string(), cvv: z.string() })), authMiddleware, async (ctx) => {
    const { paymentMethodId, cvv } = await ctx.req.valid("json")
    const { userId } = ctx.var

    const paymentMethod = await PaymentMethod.findById(paymentMethodId, userId)
    if (!paymentMethod) {
        return ctx.json({ code: "PAYMENT_METHOD_NOT_FOUND" }, 400)
    }

    const { total, products } = await Cart.listProducts(userId)

    const paymentResult = await paymentProviderAPI.fetch("/create-payment", {
        amount: total,
        merchantId: paymentMethod.merchantId,
        cvv
    })

    if (paymentResult.status === "SUCCESS") {
        // save all the products to the users history
        await CustomerProduct.createMany(userId, products)
        await Cart.clear(userId)

        return ctx.status(200)
    } else {
        return ctx.json({ code: "PAYMENT_FAILED" }, 400)
    }
})

app.get("/methods", authMiddleware, async (ctx) => {
    const { userId } = ctx.var

    const paymentMethods = await PaymentMethod.listByUserId(userId)

    return ctx.json(paymentMethods)
})

app.post(
    "/methods",
    validateJSON(z.object({ cardNumber: z.string().refine(() => { }), expiryDate: z.string() })),
    authMiddleware,
    async (ctx) => {
        const { userId } = ctx.var
        const { cardNumber, expiryDate } = ctx.req.valid("json")

        const { merchantId } = await paymentProviderAPI.fetch("/create-merchant", { cardNumber, expiryDate })

        await PaymentMethod.create(userId, {
            ending: cardNumber.slice(cardNumber.length - 4),
            expiryDate,
            merchantId
        })

        return ctx.json({ merchantId }, 200)
    })

app.delete(
    "/methods",
    validateJSON(z.object({ paymentMethodId: z.string() })),
    authMiddleware,
    async (ctx) => {
        const { userId } = ctx.var
        const { paymentMethodId } = ctx.req.valid("json")

        await PaymentMethod.deleteById(userId, paymentMethodId)

        return ctx.status(200)
    })