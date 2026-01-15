```markdown
# رواق العدل — Demo Backend & Integration (MVP)

هذه الحزمة تحتوي على:
- مواصفات OpenAPI (openapi.yaml)
- مثال خادم Node.js (server.js) يقدّم endpoints أساسية:
  - POST /api/upload/presign  -> إنشاء presigned URL (محاكاة)
  - POST /api/ai/analyze      -> تحليل AI (stub)
  - POST /api/cases           -> إنشاء قيد دعوى
  - GET /api/cases/:id
  - GET/POST /api/memos
  - POST /api/sessions

تشغيل محلي:
1. نفّذي:
   npm install
2. شغّلي الخادم:
   npm run dev
   أو:
   node server.js
3. الخادم يعمل على http://localhost:4000

ملاحظات أمنيّة:
- لا تضعي مفاتيح S3 أو OpenAI في الواجهة؛ احفظيها في متغيرات البيئة على الخادم.
- استخدمي OIDC/SAML وMFA وRBAC قبل الانتقال للإنتاج.
- استبدلي presign stub بمنطق AWS S3 presigned URL باستخدام مكتبة @aws-sdk.

تكامل AI:
- استبدلي الجزء داخل /api/ai/analyze باستدعاء لمزودك (OpenAI/Azure) server-side.
- خذِ بعين الاعتبار حدود الاستهلاك والمقالات الحساسة (PII) — قد تودين فلترة/تحويل البيانات قبل الإرسال.

الخطوة القادمة المقترحة:
- أقدّم لك ملف OpenAPI مفصل (JSON/YAML) أو مثال ربط OpenAI/Azure server-side (node) إذا أردتِ، بالإضافة إلى مثال الواجهة الأمامية (fetch) جاهز للدمج.
```
