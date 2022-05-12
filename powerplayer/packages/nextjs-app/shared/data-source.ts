import { Pool } from 'pg';

// TODO NEVER ever ever build with credentials in your env vars. This is a throwaway sample with a
// simple docker db...  Instead use your secrets management platform on your deployment system...
// for this sample, we use Node from the command line expecting a dev .env file so it doesn't make
// it into any transpiled JS - as we run with dotenv and ts-node
export const pool = new Pool({
  host: process.env.POSTGRES_SERVER,
  user: process.env.POSTGRES_USER,
  port: Number.parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  password: process.env.POSTGRES_PASSWORD,
  max: Number.parseInt(process.env.MAX_DB_CONNECTIONS, 10) || 25,
  idleTimeoutMillis: Number.parseInt(process.env.IDLE_DB_TIMEOUT_MS, 10) || 50000,
  connectionTimeoutMillis: Number.parseInt(process.env.CONNECTION_DB_TIMEOUT_MS, 10) || 5000
});

export async function queryForResults<T>(query: string, args?: string[]): Promise<T[]> {
  let client;
  try {
    client = await pool.connect();
    let result;
    if (args) {
      result = await client.query(query, [...args]);
    } else {
      result = await client.query(query);
    }
    return result.rows as T[];
  } catch (e) {
    throw e;
  } finally {
    if (client) client.release();
  }
}

export async function queryForOne<T>(query: string, args?: string[]): Promise<T> {
  let client;
  try {
    client = await pool.connect();
    let result;
    if (args) {
      result = await client.query(query, [...args]);
    } else {
      result = await client.query(query);
    }
    if (result.rows.length === 1) {
      return result.rows[0] as T;
    } else {
      throw `Single result query returned ${result.rows.length} rows`;
    }
  } catch (e) {
    throw e;
  } finally {
    if (client) client.release();
  }
}

