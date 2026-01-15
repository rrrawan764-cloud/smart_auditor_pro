// Frontend helper functions (use in your existing index.html)
// Example usage: const presign = await presignUpload(filename, mime);
// uploadFileToUrl(presign.url, file);
// const analysis = await analyze({ text: '...' });

export async function presignUpload(filename, contentType){
  const res = await fetch('/api/upload/presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, contentType })
  });
  if(!res.ok) throw new Error('presign failed');
  return res.json();
}

export async function uploadFileToUrl(url, file){
  // Use PUT to presigned S3 URL; adjust Content-Type
  const res = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type }
  });
  if(!res.ok) throw new Error('upload failed');
  return true;
}

export async function analyze(payload){
  const res = await fetch('/api/ai/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error('analysis failed');
  return res.json();
}

export async function createCase(payload){
  const res = await fetch('/api/cases', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error('create case failed');
  return res.json();
}
