import { execQuery, type Product as ProductType } from "../utils/db.js"

/**
 * list all the available products in the store
 * @returns productId, category, name, description, price, stock
 */
const list = async () => {
    const { rows } = await execQuery<ProductType>("SELECT * FROM product ORDER BY name;")
    return rows
}

export const Product = { list }