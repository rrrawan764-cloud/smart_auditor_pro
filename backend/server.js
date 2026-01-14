const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// نقطة فحص النظام
app.get('/status', (req, res) => {
    res.json({ status: "منظومة رواق العدل تعمل بنجاح", version: "1.5.0" });
});

// تحليل الذكاء الاصطناعي (AI Auditor)
app.post('/api/analyze', (req, res) => {
    const { facts } = req.body;
    // هنا يتم الربط مع OpenAI مستقبلاً
    res.json({ 
        decision: "قيد المراجعة", 
        suggestion: "يرجى التأكد من إرفاق القرار الإداري المطعون فيه." 
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
