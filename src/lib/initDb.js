import mysql from "mysql2/promise";

export const QUESTIONS = [
  {
    question_id: 1,
    question_text:
      "What is the primary purpose of Nutrilite Weight Management Nutritious Delicious Shake Mix?",
    option_a: "Energy drink replacement",
    option_b: "Meal replacement for weight management",
    option_c: "Sports hydration",
    option_d: "Dessert topping",
    correct_option: "B",
    correct_option_value: "Meal replacement for weight management",
    explanation: "",
  },
  {
    question_id: 2,
    question_text:
      "Nutrilite Weight Management Nutritious Delicious Shake Mix comes in which flavors?",
    option_a: "Vanilla",
    option_b: "Chocolate",
    option_c: "Coffee",
    option_d: "All of the above",
    correct_option: "D",
    correct_option_value: "All of the above",
    explanation: "",
  },
  {
    question_id: 3,
    question_text:
      "Which statement best describes the Weight Management Nutritious Delicious Shake Mix?",
    option_a: "Extreme dieting solution",
    option_b: "Smart and balanced weight management support",
    option_c: "Keeps you fuller for longer",
    option_d: "option B & C",
    correct_option: "D",
    correct_option_value: "option B & C",
    explanation: "",
  },
  {
    question_id: 4,
    question_text: "What makes the shake suitable for modern lifestyles?",
    option_a: "Requires cooking",
    option_b: "Convenient meal replacement option",
    option_c: "Needs refrigeration during consumption",
    option_d: "Requires gym equipment",
    correct_option: "B",
    correct_option_value: "Convenient meal replacement option",
    explanation: "",
  },
  {
    question_id: 5,
    question_text:
      "Which of the following fiber sources is included in the product?",
    option_a: "Rice bran",
    option_b: "Oats",
    option_c: "Potato starch",
    option_d: "Almond flour",
    correct_option: "B",
    correct_option_value: "Oats",
    explanation: "",
  },
  {
    question_id: 6,
    question_text:
      "Approximately how much dietary fiber does the shake provide?",
    option_a: "2 g",
    option_b: "4 g",
    option_c: "6 g",
    option_d: "10 g",
    correct_option: "C",
    correct_option_value: "6 g",
    explanation: "",
  },
  {
    question_id: 7,
    question_text:
      "What is the role of protein in the Weight Management Shake Mix?",
    option_a: "To add only flavor to the shake",
    option_b: "To support muscle maintenance and energy levels",
    option_c: "To increase sudden hunger cravings",
    option_d: "To replace the need for physical activity",
    correct_option: "B",
    correct_option_value: "To support muscle maintenance and energy levels",
    explanation: "",
  },
  {
    question_id: 8,
    question_text:
      "Up to how much protein per serving can be achieved with All Plant Protein Powder?",
    option_a: "12.3 g",
    option_b: "15.5 g",
    option_c: "18.7 g",
    option_d: "22.3 g",
    correct_option: "D",
    correct_option_value: "22.3 g",
    explanation: "",
  },
  {
    question_id: 9,
    question_text:
      "Which nutrient coverage benefit is highlighted in the deck?",
    option_a: "5 vitamins only",
    option_b: "10 minerals only",
    option_c: "22 vitamins and minerals",
    option_d: "Iron only",
    correct_option: "C",
    correct_option_value: "22 vitamins and minerals",
    explanation: "",
  },
  {
    question_id: 10,
    question_text: "Why are vitamins and minerals included in the shake?",
    option_a: "To improve packaging",
    option_b: "To help avoid nutritional gaps during weight management",
    option_c: "To increase sugar levels",
    option_d: "To replace water intake",
    correct_option: "B",
    correct_option_value:
      "To help avoid nutritional gaps during weight management",
    explanation: "",
  },
  {
    question_id: 11,
    question_text:
      "Which botanical ingredient is included for weight management support?",
    option_a: "Ginger",
    option_b: "Garcinia Cambogia",
    option_c: "Tulsi",
    option_d: "Cinnamon",
    correct_option: "B",
    correct_option_value: "Garcinia Cambogia",
    explanation: "",
  },
  {
    question_id: 12,
    question_text: "The product is described as having:",
    option_a: "High Glycemic Index",
    option_b: "Low Glycemic Index",
    option_c: "No carbohydrates",
    option_d: "Zero nutrients",
    correct_option: "B",
    correct_option_value: "Low Glycemic Index",
    explanation: "",
  },
  {
    question_id: 13,
    question_text: "What is a key benefit of a Low Glycemic Index product?",
    option_a: "Rapid energy crashes",
    option_b: "Stable energy release",
    option_c: "Increased cravings",
    option_d: "Faster dehydration",
    correct_option: "B",
    correct_option_value: "Stable energy release",
    explanation: "",
  },
  {
    question_id: 14,
    question_text:
      "Which of the following are benefits of a weight management shake when combined with regular exercise and a calorie deficit? (Select all that apply)",
    option_a: "Helps provide balanced nutrition",
    option_b: "Helps you feel fuller for longer",
    option_c: "Helps reduce cravings",
    option_d: "All of the above",
    correct_option: "D",
    correct_option_value:
      "Helps provide balanced nutrition, Helps you feel fuller for longer, Helps reduce cravings",
    explanation: "",
  },
  {
    question_id: 15,
    question_text: "How can the shake be consumed?",
    option_a: "Only with juice",
    option_b: "Only with milk",
    option_c: "With milk or water",
    option_d: "Only hot",
    correct_option: "C",
    correct_option_value: "With milk or water",
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
