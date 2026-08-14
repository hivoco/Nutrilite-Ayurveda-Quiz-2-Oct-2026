import mysql from "mysql2/promise";

export const QUESTIONS = [
  {
    question_id: 1,
    question_text:
      "Botanically, Moringa oleifera belongs to a tree family often grown in which type of climate?",
    option_a: "Alpine/high-altitude cold climate",
    option_b: "Hot, semi-arid tropical and subtropical climate",
    option_c: "Deep rainforest only",
    option_d: "Cold coastal regions",
    correct_option: "B",
    correct_option_value: "Hot, semi-arid tropical and subtropical climate",
    explanation: "",
  },
  {
    question_id: 2,
    question_text:
      "Moringa's pods, commonly used as a vegetable in Indian cooking, are popularly known as:",
    option_a: "Drumsticks",
    option_b: "Ladyfingers",
    option_c: "Bitter gourd",
    option_d: "Snake beans",
    correct_option: "A",
    correct_option_value: "Drumsticks",
    explanation: "",
  },
  {
    question_id: 3,
    question_text:
      "Moringa (Shigru) is often called a 'miracle tree' primarily because of its:",
    option_a: "Rare growing conditions",
    option_b:
      "Dense concentration of vitamins, minerals & protein across leaves, pods and seeds",
    option_c: "Use only in perfumes",
    option_d: "Slow growth rate",
    correct_option: "B",
    correct_option_value:
      "Dense concentration of vitamins, minerals & protein across leaves, pods and seeds",
    explanation: "",
  },
  {
    question_id: 4,
    question_text:
      "In traditional use, which part(s) of the Moringa plant are most commonly used for nutrition?",
    option_a: "Only the bark",
    option_b: "Leaves and pods",
    option_c: "Only the flowers",
    option_d: "Roots exclusively",
    correct_option: "B",
    correct_option_value: "Leaves and pods",
    explanation: "",
  },
  {
    question_id: 5,
    question_text:
      "Shigru (Moringa) is best known for supporting:",
    option_a: "Overall nourishment and daily vitality",
    option_b: "Only weight loss",
    option_c: "Only hair growth",
    option_d: "A replacement for all vitamins",
    correct_option: "A",
    correct_option_value: "Overall nourishment and daily vitality",
    explanation: "",
  },
  {
    question_id: 6,
    question_text: "What is the botanical name of Garcinia (Vrikshamla)?",
    option_a: "Andrographis paniculata",
    option_b: "Garcinia cambogia",
    option_c: "Moringa oleifera",
    option_d: "Curcuma longa",
    correct_option: "B",
    correct_option_value: "Garcinia cambogia",
    explanation: "",
  },
  {
    question_id: 7,
    question_text:
      "Which compound is the key bioactive associated with Garcinia?",
    option_a: "Andrographolides",
    option_b: "Polyphenols",
    option_c: "Hydroxycitric Acid (HCA)",
    option_d: "Flavonoids",
    correct_option: "C",
    correct_option_value: "Hydroxycitric Acid (HCA)",
    explanation: "",
  },
  {
    question_id: 8,
    question_text:
      "Nutrilite Ayurveda Garcinia fruit extract is standardized to NLT:",
    option_a: "40% total polyphenols",
    option_b: "3.85% total andrographolides",
    option_c: "60% total HCA",
    option_d: "25% total HCA",
    correct_option: "C",
    correct_option_value: "60% total HCA",
    explanation: "",
  },
  {
    question_id: 9,
    question_text: "What does each Garcinia tablet deliver?",
    option_a: "279.5 mg HCA",
    option_b: "300 mg HCA",
    option_c: "60 mg HCA",
    option_d: "13.7 mg HCA",
    correct_option: "A",
    correct_option_value: "279.5 mg HCA",
    explanation: "",
  },
  {
    question_id: 10,
    question_text:
      "Which of the following best describes the positioning of Garcinia in the handbook?",
    option_a: "Supports liver health",
    option_b: "Supports metabolism and satiety",
    option_c: "Supports immunity and respiratory health",
    option_d: "Supports bone health",
    correct_option: "B",
    correct_option_value: "Supports metabolism and satiety",
    explanation: "",
  },
  {
    question_id: 11,
    question_text: "Garcinia is also known as:",
    option_a: "King of Bitters",
    option_b: "Malabar Tamarind",
    option_c: "Indian Ginseng",
    option_d: "Miracle Herb",
    correct_option: "B",
    correct_option_value: "Malabar Tamarind",
    explanation: "",
  },
  {
    question_id: 12,
    question_text:
      "Where are the Garcinia fruits used by Nutrilite Ayurveda wild-harvested from?",
    option_a: "Black cotton soils of Madhya Pradesh",
    option_b: "Western Ghats of Karnataka",
    option_c: "Himalayan foothills",
    option_d: "Rath region",
    correct_option: "B",
    correct_option_value: "Western Ghats of Karnataka",
    explanation: "",
  },
  {
    question_id: 13,
    question_text:
      "What is the recommended usage instruction for Nutrilite Ayurveda Garcinia?",
    option_a: "1 tablet twice a day",
    option_b: "2 tablets once a day",
    option_c: "1 tablet a day",
    option_d: "1 tablet once a week",
    correct_option: "C",
    correct_option_value: "1 tablet a day",
    explanation: "",
  },
  {
    question_id: 14,
    question_text: "What is the botanical name of Kalamegha?",
    option_a: "Garcinia cambogia",
    option_b: "Moringa oleifera",
    option_c: "Andrographis paniculata",
    option_d: "Ocimum sanctum",
    correct_option: "C",
    correct_option_value: "Andrographis paniculata",
    explanation: "",
  },
  {
    question_id: 15,
    question_text: "Kalamegha is popularly known as:",
    option_a: "Miracle Herb",
    option_b: "King of Bitters",
    option_c: "Malabar Tamarind",
    option_d: "Queen of Herbs",
    correct_option: "B",
    correct_option_value: "King of Bitters",
    explanation: "",
  },
  {
    question_id: 16,
    question_text:
      'Which bioactive compound is considered the "Hero" of Kalamegha?',
    option_a: "HCA",
    option_b: "Polyphenols",
    option_c: "Andrographolides",
    option_d: "Curcumin",
    correct_option: "C",
    correct_option_value: "Andrographolides",
    explanation: "",
  },
  {
    question_id: 17,
    question_text: "Kalamegh leaves extract is standardized to NLT:",
    option_a: "60% total HCA",
    option_b: "3.85% total andrographolides",
    option_c: "40% total polyphenols",
    option_d: "6.6% total polyphenols",
    correct_option: "B",
    correct_option_value: "3.85% total andrographolides",
    explanation: "",
  },
  {
    question_id: 18,
    question_text: "What is the key wellness positioning of Kalamegha?",
    option_a: "Supports liver health",
    option_b: "Supports satiety",
    option_c: "Supports bone strength",
    option_d: "Supports protein synthesis",
    correct_option: "A",
    correct_option_value: "Supports liver health",
    explanation: "",
  },
  {
    question_id: 19,
    question_text:
      "Each Kalamegha tablet is equivalent to how much Kalamegha leaf powder?",
    option_a: "1.5 g",
    option_b: "2.05 g",
    option_c: "3 g",
    option_d: "1 g",
    correct_option: "A",
    correct_option_value: "1.5 g",
    explanation: "",
  },
  {
    question_id: 20,
    question_text: "Each Kalamegha tablet delivers:",
    option_a: "279.5 mg HCA",
    option_b: "13.7 mg andrographolide",
    option_c: "12.5 mg polyphenols",
    option_d: "60 mg andrographolide",
    correct_option: "B",
    correct_option_value: "13.7 mg andrographolide",
    explanation: "",
  },
  {
    question_id: 21,
    question_text:
      "What is the recommended usage instruction for Nutrilite Ayurveda Kalamegha?",
    option_a: "1 tablet twice a day",
    option_b: "2 tablets a day",
    option_c: "1 tablet a day",
    option_d: "1 tablet every alternate day",
    correct_option: "C",
    correct_option_value: "1 tablet a day",
    explanation: "",
  },
  {
    question_id: 22,
    question_text:
      "A customer is primarily interested in supporting metabolism and satiety. Which Nutrilite Ayurveda herb would be most relevant to discuss?",
    option_a: "Kalamegha",
    option_b: "Garcinia",
    option_c: "Moringa",
    option_d: "None of these",
    correct_option: "B",
    correct_option_value: "Garcinia",
    explanation: "",
  },
  {
    question_id: 23,
    question_text:
      "A customer is looking for a product positioned around liver health. Which herb would be most relevant?",
    option_a: "Garcinia",
    option_b: "Kalamegha",
    option_c: "Moringa",
    option_d: "Shigru",
    correct_option: "B",
    correct_option_value: "Kalamegha",
    explanation: "",
  },
  {
    question_id: 24,
    question_text:
      'A customer asks, "How do I know the Garcinia extract has consistent bioactive potency?" What is the strongest answer based on the handbook?',
    option_a: "It has a natural bitter taste",
    option_b: "It is standardized to NLT 60% total HCA",
    option_c: "It is sourced from India",
    option_d: "It is available in tablet form",
    correct_option: "B",
    correct_option_value: "It is standardized to NLT 60% total HCA",
    explanation: "",
  },
  {
    question_id: 25,
    question_text: "Which pairing is correct?",
    option_a: "Garcinia → Andrographolides",
    option_b: "Kalamegha → HCA",
    option_c: "Garcinia → HCA",
    option_d: "Kalamegha → Polyphenols",
    correct_option: "C",
    correct_option_value: "Garcinia → HCA",
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
