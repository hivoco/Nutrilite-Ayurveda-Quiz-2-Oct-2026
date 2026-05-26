import mysql from "mysql2/promise";
import fs from "node:fs";

for (const file of [".env.local", ".env"]) {
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  }
}

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const [count] = await conn.query(
  "SELECT COUNT(*) AS cnt FROM questions WHERE type = 'nfsu'"
);
console.log(`Total nfsu questions in DB: ${count[0].cnt}`);

const [rows] = await conn.query(
  "SELECT question_id, question_text, correct_option, correct_option_value FROM questions WHERE type = 'nfsu' ORDER BY question_id"
);
for (const r of rows) {
  console.log(`Q${r.question_id} [${r.correct_option}=${r.correct_option_value}] ${r.question_text}`);
}

await conn.end();
