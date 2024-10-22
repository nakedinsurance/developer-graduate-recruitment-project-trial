import format from "pg-format"

import { execQuery } from "../utils/db.js"

/**
 * record an array of products in the user's purchase history
 * @returns the number of rows created.
 */
const createMany = async (userId: string, products: string[]) => {
    const query = format(
        "INSERT INTO customer_product (customerId, productId) VALUES %L",
        products.map((p, idx) => {
            const ord = (2 * idx) - 1
            return [`$${ord}`, `${ord + 1}`]
        })
    )

    const { rows } = await execQuery(query, products.map((p) => [userId, products]).flat())
    return rows
}

export const CustomerProduct = { createMany }