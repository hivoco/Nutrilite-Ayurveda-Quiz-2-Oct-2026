import mysql from "mysql2/promise";

export const QUESTIONS = [
  {
    question_id: 1,
    question_text:
      "Nutrilite™ Ayurveda Tulsi is positioned around which more specific need spaces compared with the Traditional Herbs version?",
    option_a: "Energy and vitality",
    option_b: "Cough & cold and chest congestion",
    option_c: "Digestion and metabolism",
    option_d: "Concentration and alertness",
    correct_option: "B",
    correct_option_value: "Cough & cold and chest congestion",
    explanation: "",
  },
  {
    question_id: 2,
    question_text: "What is the dosage of Nutrilite™ Ayurveda Tulsi?",
    option_a: "2 tablets per day",
    option_b: "3 tablets per day",
    option_c: "1 tablet per day",
    option_d: "1 tablet twice a week",
    correct_option: "C",
    correct_option_value: "1 tablet per day",
    explanation: "",
  },
  {
    question_id: 3,
    question_text:
      "Nutrilite™ Ayurveda Tulsi contains how much leaf extract per tablet?",
    option_a: "190 mg",
    option_b: "230 mg",
    option_c: "400 mg",
    option_d: "500 mg",
    correct_option: "C",
    correct_option_value: "400 mg",
    explanation: "",
  },
  {
    question_id: 4,
    question_text: "Nutrilite™ Ayurveda Brahmi is grown in which region?",
    option_a: "Pristine fields of Manasa, M.P.",
    option_b: "Alluvial soils of Rath region, M.P.",
    option_c: "Fertile plains of Lucknow, U.P.",
    option_d: "Black cotton soils of Neemuch, M.P.",
    correct_option: "C",
    correct_option_value: "Fertile plains of Lucknow, U.P.",
    explanation: "",
  },
  {
    question_id: 5,
    question_text: "Brahmi is also known as:",
    option_a: "Herb of wisdom",
    option_b: "Rejuvenating herb",
    option_c: "Sacred herb",
    option_d: "None of the above",
    correct_option: "A",
    correct_option_value: "Herb of wisdom",
    explanation: "",
  },
  {
    question_id: 6,
    question_text: "Nutrilite™ Ayurveda Tulsi is grown in which region?",
    option_a: "Pristine fields of Manasa, M.P.",
    option_b: "Alluvial soils of Rath region, M.P.",
    option_c: "Fertile plains of Lucknow, U.P.",
    option_d: "Black cotton soils of Neemuch, M.P.",
    correct_option: "B",
    correct_option_value: "Alluvial soils of Rath region, M.P.",
    explanation: "",
  },
  {
    question_id: 7,
    question_text:
      "Each Nutrilite™ Ayurveda Brahmi tablet delivers how much Bacosides?",
    option_a: "3.8 mg",
    option_b: "13.7 mg",
    option_c: "20 mg",
    option_d: "24 mg",
    correct_option: "D",
    correct_option_value: "24 mg",
    explanation: "",
  },
  {
    question_id: 8,
    question_text:
      "Which statement correctly describes Nutrilite™ Ayurveda Ashwagandha?",
    option_a: "2 tablets per day and 230 mg root extract",
    option_b: "1 tablet per day and 273.5 mg root extract",
    option_c: "1 tablet per day and 120 mg root extract",
    option_d: "2 tablets per day and 273.5 mg leaf extract",
    correct_option: "B",
    correct_option_value: "1 tablet per day and 273.5 mg root extract",
    explanation: "",
  },
  {
    question_id: 9,
    question_text:
      "Nutrilite™ Ayurveda Brahmi is made from which part of the plant?",
    option_a: "Whole plant extract",
    option_b: "Plant powder along with extract",
    option_c: "Only leaf extract",
    option_d: "Only root extract",
    correct_option: "A",
    correct_option_value: "Whole plant extract",
    explanation: "",
  },
  {
    question_id: 10,
    question_text:
      "Nutrilite™ Ayurveda Ashwagandha is made from which part of the plant?",
    option_a: "Leaves",
    option_b: "Fruit",
    option_c: "Root",
    option_d: "Stem",
    correct_option: "C",
    correct_option_value: "Root",
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
