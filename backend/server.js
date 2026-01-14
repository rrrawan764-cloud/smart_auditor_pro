const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // مهم جداً للربط

app.post('/api/analyze', (req, res) => {
    const { facts } = req.body;
    console.log("وصلت وقائع جديدة:", facts);
    
    // رد تجريبي يوضح أن الربط تم بنجاح
    res.json({ 
        decision: "تم استلام البيانات من الخادم", 
        suggestion: "التحليل الذكي: الدعوى مكتملة الأركان، يرجى تقديمها للمحكمة الإدارية." 
    });
});

app.listen(3000, () => console.log('الخادم يعمل على منفذ 3000'));
