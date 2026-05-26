import { readFileSync } from "fs";
import mysql from "mysql2/promise";
import { reseedAll } from "../src/lib/initDb.js";

function loadEnv(path) {
  try {
    const content = readFileSync(path, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {}
}

loadEnv(new URL("../.env.local", import.meta.url).pathname);
loadEnv(new URL("../.env", import.meta.url).pathname);

const dbName = process.env.MYSQL_DATABASE;
if (!dbName) {
  console.error("MYSQL_DATABASE not set");
  process.exit(1);
}

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

try {
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await connection.query(`USE \`${dbName}\``);
  await reseedAll(connection);
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS cnt FROM questions WHERE type = 'nfsu'"
  );
  console.log(`Reseed complete. ${rows[0].cnt} questions in ${dbName}.`);
} finally {
  await connection.end();
}
