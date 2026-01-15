# ERD - High Level Data Model

## Entities:
- **Users**: id, name, email, role, createdAt
- **Cases**: id, plaintiff, subject, details, attachments[], status, createdBy, createdAt
- **Attachments**: key, filename, contentType, caseId, uploadedBy, createdAt
- **Memos**: id, from, to, subject, text, caseId?, createdAt
- **Sessions**: id, subj, datetime, link, createdBy
- **AIAnalyses**: id, caseId?, inputText, output (json), createdAt, ranBy
- **AuditLogs**: id, actorId, action, resourceType, resourceId, details, createdAt

## Notes:
- Use PostgreSQL for relational data.
- Store attachments in S3.