import mysql from "mysql2/promise";
import { ensureSchema } from "./initDb";

let pool;
let initPromise;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

async function init() {
  if (!initPromise) {
    initPromise = ensureSchema(getPool()).catch((err) => {
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

export async function query(sql, params) {
  await init();
  const [rows] = await getPool().execute(sql, params);
  return rows;
}
