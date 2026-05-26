import { query } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const lang = req.query.lang || "english";
    const type = req.query.type || "nfsu";

    const rows = await query(
      "SELECT question_id, question_text, option_a, option_b, option_c, option_d, image_url FROM questions WHERE lang = ? AND type = ? ORDER BY question_id",
      [lang.toLowerCase(), type]
    );

    const quiz = rows.map((row) => ({
      question_id: row.question_id,
      question: row.question_text,
      options: [row.option_a, row.option_b, row.option_c, row.option_d],
      image_url: row.image_url || null,
      audio_path: null,
    }));

    return res.status(200).json({ quiz });
  } catch (error) {
    console.error("Error fetching questions:", error);
    // Surface DB error code/message in the response so failures
    // (e.g. ER_BAD_DB_ERROR from a wrong MYSQL_DATABASE) are visible
    // in the network tab instead of being hidden behind a generic 500.
    return res.status(500).json({
      error: "Failed to fetch questions",
      code: error.code,
      message: error.message,
    });
  }
}
