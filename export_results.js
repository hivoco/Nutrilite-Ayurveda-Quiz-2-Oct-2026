// Run with: node export_results.js
// Output: results-<timestamp>.csv with columns: username, score, pass

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, "utf8");
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

loadEnv(path.join(__dirname, ".env.local"));
loadEnv(path.join(__dirname, ".env"));

const PASS_THRESHOLD = 0.75;

function csvEscape(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  const [rows] = await conn.execute(
    `SELECT name, score, total_questions, created_at
       FROM quiz_results
   ORDER BY created_at DESC`
  );
  await conn.end();

  const pad = (n) => String(n).padStart(2, "0");
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
  const fmt = (d) => {
    if (!d) return "";
    const dt = d instanceof Date ? d : new Date(d);
    const ist = new Date(dt.getTime() + IST_OFFSET_MS);
    return `${ist.getUTCFullYear()}-${pad(ist.getUTCMonth() + 1)}-${pad(ist.getUTCDate())} ${pad(ist.getUTCHours())}:${pad(ist.getUTCMinutes())}:${pad(ist.getUTCSeconds())} +05:30`;
  };

  const lines = ["username,score,pass,created_at_ist"];
  for (const r of rows) {
    const total = Number(r.total_questions) || 0;
    const score = Number(r.score) || 0;
    const pct = total > 0 ? score / total : 0;
    const pass = pct >= PASS_THRESHOLD ? "pass" : "fail";
    lines.push(`${csvEscape(r.name)},${score},${pass},${csvEscape(fmt(r.created_at))}`);
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outPath = path.join(__dirname, `results-${stamp}.csv`);
  fs.writeFileSync(outPath, lines.join("\n") + "\n", "utf8");

  console.log(`Wrote ${rows.length} rows to ${outPath}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
