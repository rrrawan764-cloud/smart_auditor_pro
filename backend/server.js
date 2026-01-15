const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/analyze", async (req, res) => {
  try {
    const { facts } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "أنت مساعد قانوني خبير في الأنظمة السعودية وديوان المظالم. قم بتحليل الوقائع وتقديم المشورة الإجرائية." },
        { role: "user", content: facts }
      ],
    });
    res.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "فشل التحليل الذكي" });
  }
});

app.listen(3000, () => console.log("AI Server Ready"));
