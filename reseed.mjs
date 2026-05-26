import mysql from "mysql2/promise";
import { reseedAll } from "./src/lib/initDb.js";
import fs from "node:fs";

for (const file of [".env.local", ".env"]) {
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      if (/^\s*#/.test(line)) continue;
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  }
}

const dbName = process.env.MYSQL_DATABASE;

const bootstrap = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});
await bootstrap.query(
  `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
);
await bootstrap.end();

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: dbName,
});

try {
  await reseedAll(conn);
  const [rows] = await conn.query(
    "SELECT question_id, LEFT(question_text, 60) AS q FROM questions WHERE type = 'nfsu' ORDER BY question_id"
  );
  console.log(`Database: ${dbName}`);
  console.log(`Reseeded. ${rows.length} questions now in DB:`);
  for (const r of rows) console.log(`  ${r.question_id}. ${r.q}`);
} finally {
  await conn.end();
}
