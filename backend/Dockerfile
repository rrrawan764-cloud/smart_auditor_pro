# استخدام نسخة Node.js خفيفة
FROM node:18-alpine

# تحديد مجلد العمل
WORKDIR /app

# نسخ ملفات الإعداد وتثبيت المكتبات
COPY package*.json ./
RUN npm install

# نسخ بقية الكود
COPY . .

# تشغيل الخادم
EXPOSE 3000
CMD ["node", "server.js"]
