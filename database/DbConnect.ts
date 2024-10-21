import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

export const queryDB = async (query: string, params: any[]) => {
    const client = await pool.connect();
    try {
        const result = await client.query(query, params);
        return result.rows as any;
    } finally {
        client.release();
    }
};
