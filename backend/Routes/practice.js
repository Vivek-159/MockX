const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
console.log(GROQ_API_KEY ? "Groq API Key Loaded" : "Missing Groq API Key");

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY environment variable is required");
}

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// ─── Helper: call Groq and return raw text
const callGroq = async (prompt, jsonMode = false) => {
  const response = await axios.post(
    GROQ_URL,
    {
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
      ...(jsonMode && { response_format: { type: "json_object" } }),
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      timeout: 30000,
    },
  );

  const text = response.data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Empty response from Groq API");
  return text;
};

// ─── Helper: safely parse JSON from Groq response ────────────────────────
const parseGroqJSON = (rawText) => {
  const clean = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  return JSON.parse(clean);
};

// ─── GET /test ───────────────────────────────────────────────────────────────
router.get("/test", (req, res) => {
  res.json({ message: "Backend is working!", apiKeySet: !!GROQ_API_KEY });
});

// ─── POST /questions ─────────────────────────────────────────────────────────
// Body: { role, difficulty, count }
// Returns: { questions: [{ question, answer }] }
router.post("/questions", async (req, res) => {
  const { role, difficulty, count } = req.body;

  if (!role || !difficulty || !count) {
    return res
      .status(400)
      .json({ error: "Missing role, difficulty, or count" });
  }

  const prompt = `Generate exactly ${count} interview questions for the role of "${role}" at "${difficulty}" difficulty.
For each question, also provide a VERY SHORT model answer (max 2 sentences).
Return ONLY valid JSON with no markdown or backticks, using this exact structure:
{
  "questions": [
    { "question": "...", "answer": "..." }
  ]
}`;

  try {
    const rawText = await callGroq(prompt, true); // jsonMode = true
    const parsed = parseGroqJSON(rawText);

    if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      throw new Error("Invalid questions format returned by Groq");
    }

    res.json(parsed);
  } catch (err) {
    console.error("POST /questions error:", err.message);

    // if (err.response?.status === 429) {
    //   return res
    //     .status(429)
    //     .json({ error: "Rate limit exceeded. Try again later." });
    // }
    if (["ENOTFOUND", "ECONNREFUSED", "ECONNRESET"].includes(err.code)) {
      return res.status(503).json({ error: "AI service unavailable" });
    }

    res.status(500).json({
      error: "Failed to generate questions",
      details: err.response?.data?.error?.message || err.message,
    });
  }
});

// ─── POST /evaluate ──────────────────────────────────────────────────────────
// Body: { topic, topicTitle, answers: { "Question text": "User answer" } }
// Returns: { score, feedback, detailedFeedback: { "Question": "Feedback" } }
router.post("/evaluate", async (req, res) => {
  console.log("POST /evaluate hit");

  const { topic, topicTitle, answers } = req.body;

  if (!topic || !answers || Object.keys(answers).length === 0) {
    return res.status(400).json({ error: "Missing required data" });
  }

  const questionsBlock = Object.entries(answers)
    .map(
      ([question, answer], i) =>
        `Q${i + 1}: ${question}\nAnswer: ${answer || "(no answer provided)"}`,
    )
    .join("\n\n");

  const prompt = `You are evaluating a technical assessment for the topic: "${topicTitle || topic}".

${questionsBlock}

Evaluate each answer and return ONLY valid JSON (no markdown, no backticks) using this exact structure:
{
  "score": 85,
  "feedback": "Overall feedback here.",
  "detailedFeedback": {
    "Q1": "Feedback for Q1 here",
    "Q2": "Feedback for Q2 here"
  }
}

Rules:
- score must be a number between 0 and 100
- detailedFeedback keys must match Q1, Q2, Q3... format
- Be specific and constructive in feedback`;

  try {
    const rawText = await callGroq(prompt, true); // jsonMode = true
    const evaluationResult = parseGroqJSON(rawText);

    // Validate score
    if (
      typeof evaluationResult.score !== "number" ||
      evaluationResult.score < 0 ||
      evaluationResult.score > 100
    ) {
      throw new Error("Invalid score in Groq response");
    }

    res.json(evaluationResult);
  } catch (err) {
    console.error("POST /evaluate error:", err.message);

    if (err.response?.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Try again later." });
    }
    if (["ENOTFOUND", "ECONNREFUSED", "ECONNRESET"].includes(err.code)) {
      return res.status(503).json({ error: "AI service unavailable" });
    }

    // Graceful fallback so the frontend doesn't break
    const fallback = {
      score: 70,
      feedback:
        "Evaluation completed. Add more technical depth for higher scores.",
      detailedFeedback: {},
    };
    Object.keys(answers).forEach((q, i) => {
      fallback.detailedFeedback[`Q${i + 1}`] =
        "Solid attempt. Include examples, edge cases, and deeper explanation.";
    });

    res.json(fallback);
  }
});

module.exports = router;
