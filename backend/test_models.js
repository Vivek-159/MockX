require('dotenv').config();
const axios = require('axios');

const key = process.env.GEMINI_API_KEY;

async function test(model) {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {
        contents: [{ parts: [{ text: "Hello" }] }],
        generationConfig: { maxOutputTokens: 10 }
      }
    );
    console.log(`SUCCESS [${model}]`);
  } catch (err) {
    console.error(`ERROR [${model}]:`, err.response?.status, err.response?.data?.error?.message || err.message);
  }
}

async function run() {
  await test('gemini-2.0-flash');
  await test('gemini-1.5-flash');
}
run();
