# ERD - مبسّط (نموذج بيانات عالي المستوى)

Entities:
- Users
  - id, name, email, role (citizen/attorney/staff/judge/admin), createdAt
- Cases
  - id, plaintiff, subject, details, attachments[], status, createdBy, createdAt
- Attachments
  - key, filename, contentType, caseId, uploadedBy, createdAt
- Memos
  - id, from, to, subject, text, caseId?, createdAt
- Sessions
  - id, subj, datetime, link, createdBy
- AIAnalyses
  - id, caseId?, inputText, output (json), createdAt, ranBy
- AuditLogs
  - id, actorId, action, resourceType, resourceId, details, createdAt

Notes:
- Use PostgreSQL for relational data; use JSONB columns for AI outputs and flexible metadata.
- Store attachments in S3 and save keys in Attachments table (don't store raw files in DB).
