const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const apiKey = process.env.OPENAI_API_KEY || "dummy_key";
const openai = new OpenAI({ apiKey: apiKey });

app.post("/api/analyze", async (req, res) => {
  try {
    if (apiKey === "dummy_key") {
      return res.json({ analysis: "⚠️ نمط التجربة: النظام شغال تقنياً، أضف مفتاح OpenAI لتفعيل الذكاء الفعلي." });
    }
    const { facts } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "مساعد قانوني سعودي" }, { role: "user", content: facts }],
    });
    res.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    res.json({ analysis: "تم استلام البيانات بنجاح، لكن المفتاح غير صالح." });
  }
});

app.listen(3000, () => console.log("🚀 Server Ready on Port 3000"));
