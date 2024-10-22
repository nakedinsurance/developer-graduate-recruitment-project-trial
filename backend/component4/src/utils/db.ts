import pg from "pg"

import { env } from "./env.js"

const getDbCient = async () => {
    const db = new pg.Client({
        password: env.POSTGRES_PASSWORD,
        user: env.POSTGRES_USER,
    })

    await db.connect();

    return db
}

export const execQuery = async <T extends pg.QueryResultRow>(query: string, vals?: any[]) => {
    let client: pg.Client | undefined;

    try {
        client = await getDbCient();
        return await client.query<T>(query, vals)
    } finally {
        await client?.end()
    }
}

export type Product = {
    productId: string,
    category: string,
    name: string,
    description: string,
    price: number
    stock: number
}
