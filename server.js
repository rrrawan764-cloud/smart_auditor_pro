const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();
// Simple Express demo server (in-memory) with presign stub and AI analyze stub.
// For production: secure env, replace in-memory with DB, protect endpoints with auth (OIDC/SAML).
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// In-memory stores (demo)
const CASES = [];
const MEMOS = [];
const SESSIONS = [];

/**
 * Helper: generate random key for storage
 */
function genKey(filename){
  const id = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
  return `${id}-${filename.replace(/\s+/g, '_')}`;
}

/**
 * POST /api/upload/presign
 * Body: { filename, contentType }
 * Returns: { url, key }
 *
 * NOTE: in prod you must use AWS SDK's getSignedUrl or equivalent.
 */
app.post('/api/upload/presign', (req, res) => {
  const { filename, contentType } = req.body;
  if(!filename || !contentType) return res.status(400).json({ error: 'filename & contentType required' });
  const key = genKey(filename);
  // Demo: return a fake URL where frontend should PUT the file (in prod: presigned S3 URL)
  const url = `https://storage.example.local/upload/${encodeURIComponent(key)}`;
  return res.json({ url, key });
});

/**
 * POST /api/ai/analyze
 * Demo AI analysis; replace implementation with server-side OpenAI/Azure calls.
 */
app.post('/api/ai/analyze', async (req, res) => {
  const { text, caseId } = req.body;
  // Basic validation
  if(!text && !caseId) return res.status(400).json({ error: 'text or caseId required' });
  // TODO: call OpenAI/Azure on server (use API key from env). Example (pseudo):
  // const aiResponse = await callOpenAI(text);
  // For demo, return synthetic response:
  const result = {
    verdict: 'تظلم إداري — احتمالية قبول مبدئية: 75%',
    issues: ['غياب إثبات التبليغ', 'نقص التفويض'],
    recommendations: ['إرفاق إيصال تبليغ', 'رفع تفويض موقّع', 'طلب مهلة مؤقتة إن لزم']
  };
  // In real impl: persist analysis linked to caseId
  res.json(result);
});

/**
 * POST /api/cases
 */
app.post('/api/cases', (req, res) => {
  const { plaintiff, subject, details, attachments } = req.body;
  if(!plaintiff || !subject || !details) return res.status(400).json({ error: 'missing fields' });
  const id = 'case-' + (CASES.length + 1);
  const c = { id, plaintiff, subject, details, attachments: attachments || [], createdAt: new Date().toISOString() };
  CASES.push(c);
  return res.status(201).json(c);
});

/**
 * GET /api/cases/:id
 */
app.get('/api/cases/:id', (req, res) => {
  const c = CASES.find(x => x.id === req.params.id);
  if(!c) return res.sendStatus(404);
  res.json(c);
});

/**
 * MEMOS
 */
app.get('/api/memos', (req, res) => res.json(MEMOS));
app.post('/api/memos', (req, res) => {
  const { text, from } = req.body;
  if(!text) return res.status(400).json({ error: 'text required' });
  const m = { id: 'memo-' + (MEMOS.length+1), from: from || 'anonymous', text, time: new Date().toISOString() };
  MEMOS.unshift(m);
  return res.status(201).json(m);
});

/**
 * SESSIONS
 */
app.post('/api/sessions', (req, res) => {
  const { subj, datetime } = req.body;
  if(!subj || !datetime) return res.status(400).json({ error: 'missing fields' });
  const session = { id: 's-' + (SESSIONS.length+1), subj, datetime, link: 'https://meet.example/' + crypto.randomBytes(6).toString('hex') };
  SESSIONS.unshift(session);
  return res.status(201).json(session);
});

/**
 * Health
 */
app.get('/api/health', (req, res) => res.json({ ok: true, now: new Date().toISOString() }));

/**
 * Start server
 */
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Demo API server listening on ${port}`));

/**
 * Notes:
 * - For presigned upload: use @aws-sdk/client-s3 and @aws-sdk/s3-request-presigner
 * - For AI: use OpenAI official SDK or Azure SDK; call from backend to keep secrets safe.
 * - Add authentication (OIDC/SAML) and RBAC, logging (winston/pino), rate-limiting, validation.
 */
