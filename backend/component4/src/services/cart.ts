import { execQuery } from "../utils/db.js"

/**
 * check if a product is in a users cart
 * @returns the cart item id.
 */
const findByProductId = async (productId: string, userId: string): Promise<{ id: string } | undefined> => {
    const { rows } = await execQuery<{ id: string }>(
        "SELECT id FROM cart_item WHERE productId = $1 AND userId = $2",
        [productId, userId]
    )

    return rows[0]
}

/**
 * clear a users cart
 * @returns the number rows deleted
 */
const clear = async (userId: string) => {
    const { rowCount } = await execQuery("DELETE FROM cart_item WHERE userId = $1", [userId])
    return rowCount
}

/**
 * list all the products in a users cart
 * @returns the list of products and the total sum.
 */
const listProducts = async (userId: string) => {
    const { rows } = await execQuery<{ total: number, productId: string }>(
        "SELECT sum(amount), productId AS total FROM cart_item RIGHT OUTER JOIN product ON product.productId = cart_item.productId WHERE cart_item.userId = $1",
        [userId]
    )

    return {
        products: rows.map((r) => r.productId),
        total: rows[0].total
    }
}

export const Cart = {
    findByProductId,
    clear,
    listProducts
}