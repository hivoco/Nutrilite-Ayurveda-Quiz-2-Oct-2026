import mysql from "mysql2/promise";
import { reseedAll } from "@/lib/initDb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const dbName = process.env.MYSQL_DATABASE;
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await connection.query(`USE \`${dbName}\``);

    await reseedAll(connection);
    await connection.end();

    return res.status(200).json({
      success: true,
      message:
        "Database setup complete. Created tables: questions, users, sessions, quiz_results. Seeded questions.",
    });
  } catch (error) {
    if (connection) await connection.end();
    console.error("Setup error:", error);
    return res.status(500).json({ error: error.message });
  }
}
