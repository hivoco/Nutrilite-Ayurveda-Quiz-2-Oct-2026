import mysql from "mysql2/promise";

export const QUESTIONS = [
  {
    question_id: 1,
    question_text: 'What does the word "Ayurveda" literally mean?',
    option_a: "Science of Herbs",
    option_b: "Science of Life",
    option_c: "Science of Medicine",
    option_d: "Science of Nature",
    correct_option: "B",
    correct_option_value: "Science of Life",
    explanation: "",
  },
  {
    question_id: 2,
    question_text: "Ancient Ayurvedic knowledge was developed through:",
    option_a: "Random experimentation",
    option_b: "Years of observation, experience, and documentation",
    option_c: "Laboratory testing alone",
    option_d: "Artificial intelligence",
    correct_option: "B",
    correct_option_value: "Years of observation, experience, and documentation",
    explanation: "",
  },
  {
    question_id: 3,
    question_text:
      "Ayurveda recognizes the healing potential of different parts of a plant, including:",
    option_a: "Leaves only",
    option_b: "Fruits only",
    option_c: "Roots, bark, leaves, flowers, and seeds",
    option_d: "Flowers only",
    correct_option: "C",
    correct_option_value: "Roots, bark, leaves, flowers, and seeds",
    explanation: "",
  },
  {
    question_id: 4,
    question_text: "Ayurveda emphasizes balance between:",
    option_a: "Work and holidays",
    option_b: "Body, mind, and lifestyle",
    option_c: "Food and exercise only",
    option_d: "Medicines and surgery",
    correct_option: "B",
    correct_option_value: "Body, mind, and lifestyle",
    explanation: "",
  },
  {
    question_id: 5,
    question_text:
      "Ayurveda organizes the body's functional energies into three doshas. What are they?",
    option_a: "Vata, Pitta, Kapha",
    option_b: "Agni, Soma, Vayu",
    option_c: "Sattva, Rajas, Tamas",
    option_d: "Prana, Apana, Udana",
    correct_option: "A",
    correct_option_value: "Vata, Pitta, Kapha",
    explanation: "",
  },
  {
    question_id: 6,
    question_text: "In Ayurveda, 'Agni' refers to:",
    option_a: "The immune system",
    option_b: "Digestive fire / metabolic energy",
    option_c: "Vital breath",
    option_d: "A type of yoga posture",
    correct_option: "B",
    correct_option_value: "Digestive fire / metabolic energy",
    explanation: "",
  },
  {
    question_id: 7,
    question_text: "Which organization regulates Ayurveda Aahar?",
    option_a: "CDSCO",
    option_b: "FSSAI",
    option_c: "Ministry of AYUSH",
    option_d: "NABL",
    correct_option: "B",
    correct_option_value: "FSSAI",
    explanation: "",
  },
  {
    question_id: 8,
    question_text:
      "Which product category is regulated by the Ministry of AYUSH?",
    option_a: "Nutraceuticals",
    option_b: "Ayurveda Aahar",
    option_c: "Ayurvedic Medicines",
    option_d: "Functional Foods",
    correct_option: "C",
    correct_option_value: "Ayurvedic Medicines",
    explanation: "",
  },
  {
    question_id: 9,
    question_text: "Which statement best differentiates Nutrilite Ayurveda?",
    option_a: "It uses only imported herbs.",
    option_b: "It combines DNA-fingerprinted herbs with scientific validation.",
    option_c:
      "It follows only classical formulations without standardization.",
    option_d: "It is positioned as a prescription medicine.",
    correct_option: "B",
    correct_option_value:
      "It combines DNA-fingerprinted herbs with scientific validation.",
    explanation: "",
  },
  {
    question_id: 10,
    question_text: "DNA fingerprinting primarily helps ensure:",
    option_a: "Better taste and appearance",
    option_b: "Lower manufacturing cost",
    option_c: "Authenticity and traceability of herbs",
    option_d: "Longer product shelf life",
    correct_option: "C",
    correct_option_value: "Authenticity and traceability of herbs",
    explanation: "",
  },
];

const INSERT_QUESTION_SQL = `
  INSERT INTO questions (question_id, question_text, option_a, option_b, option_c, option_d, correct_option, correct_option_value, explanation, image_url, lang, type)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'english', 'nfsu')
`;

async function createDatabaseIfMissing(dbName) {
  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  try {
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
  } finally {
    await conn.end();
  }
}

async function createTables(runner) {
  await runner.query(`
    CREATE TABLE IF NOT EXISTS questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question_id INT NOT NULL UNIQUE,
      question_text TEXT NOT NULL,
      option_a VARCHAR(500) NOT NULL,
      option_b VARCHAR(500) NOT NULL,
      option_c VARCHAR(500) NOT NULL,
      option_d VARCHAR(500) NOT NULL,
      correct_option CHAR(1) NOT NULL,
      correct_option_value VARCHAR(500) NOT NULL,
      explanation TEXT,
      image_url VARCHAR(500),
      lang VARCHAR(20) NOT NULL DEFAULT 'english',
      type VARCHAR(50) NOT NULL DEFAULT 'nfsu',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  const [imageCol] = await runner.query(
    `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'questions' AND COLUMN_NAME = 'image_url'`
  );
  if (imageCol[0].cnt === 0) {
    await runner.query(`ALTER TABLE questions ADD COLUMN image_url VARCHAR(500) AFTER explanation`);
  }
  await runner.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      user_id VARCHAR(255) NOT NULL UNIQUE,
      session_id VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runner.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      session_name VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runner.query(`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      user_id VARCHAR(255),
      session_id VARCHAR(255),
      score INT NOT NULL DEFAULT 0,
      total_questions INT NOT NULL DEFAULT 10,
      quiz_data JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function seedQuestions(runner) {
  for (const q of QUESTIONS) {
    await runner.execute(INSERT_QUESTION_SQL, [
      q.question_id,
      q.question_text,
      q.option_a,
      q.option_b,
      q.option_c,
      q.option_d,
      q.correct_option,
      q.correct_option_value,
      q.explanation,
      q.image_url || null,
    ]);
  }
}

export async function ensureSchema(pool) {
  await createDatabaseIfMissing(process.env.MYSQL_DATABASE);
  await createTables(pool);

  const [rows] = await pool.query(
    "SELECT COUNT(*) AS cnt FROM questions WHERE type = 'nfsu'"
  );
  if (rows[0].cnt === 0) {
    await seedQuestions(pool);
  }
}

export async function reseedAll(connection) {
  await createTables(connection);
  await connection.query("DELETE FROM questions WHERE type = 'nfsu'");
  await seedQuestions(connection);
}
