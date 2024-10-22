import { execQuery } from "../utils/db.js"

/**
 * find a payment method belonging to a user.
 * @returns a single payment method.
 */
const findById = async (paymentMethodId: string, userId: string): Promise<{ merchantId: string } | undefined> => {
    const { rows } = await execQuery<{ merchantId: string }>(
        "SELECT merchantId FROM payment_method WHERE id = $1 AND userId = $2",
        [paymentMethodId, userId]
    )

    return rows[0]
}

/**
 * list all a users payment methods.
 * @returns 
 */
const listByUserId = async (userId: string) => {
    const { rows } = await execQuery<{ id: string }>(
        "SELECT id, ending FROM payment_method WHERE userId = $1",
        [userId]
    )

    return rows
}

/**
 * create a payment method for a user
 * @returns 
 */
const create = async (userId: string, data: { ending: string, expiryDate: string, merchantId: string }) => {
    const { rows } = await execQuery(
        "INSERT INTO payment_method(userId, ending, expiryDate) VALUES ($1, $2, $3);",
        [userId, data.ending, data.expiryDate]
    )

    return rows[0]
}

/**
 * delete a payment method belonging to a user.
 * @returns 
 */
const deleteById = async (userId: string, paymentMethodId: string) => {
    const { rows } = await execQuery(
        "DELETE FROM payment_method WHERE userId = $1 AND id = $2",
        [userId, paymentMethodId]
    )

    return rows[0]
}

export const PaymentMethod = { findById, listByUserId, create, deleteById }