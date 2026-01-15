import React, { useState } from 'react';
import { Scale, Send, Loader2, User, Activity } from 'lucide-react';
import axios from 'axios';

function App() {
  const [facts, setFacts] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!facts) return alert("يرجى إدخال الوقائع أولاً");
    setLoading(true);
    try {
      // الربط مع الخادم اللي برمجناه في backend/server.js
      const response = await axios.post('http://localhost:3000/api/analyze', { facts });
      setResult(response.data);
    } catch (error) {
      alert("خطأ: تأكدي من تشغيل الخادم في مجلد backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '2rem', textAlign: 'right', direction: 'rtl', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '1px solid #1e293b', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#38bdf8' }}>رواق العدل ⚖️ <small style={{ fontSize: '0.5em', color: '#94a3b8' }}>v2.0</small></h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>المطورة: **روان الصبحي**</span>
          <User size={24} color="#38bdf8" />
        </div>
      </header>

      <main style={{ marginTop: '2rem', maxWidth: '800px', margin: '2rem auto' }}>
        <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity color="#38bdf8" /> المدقق القانوني الذكي
          </h2>
          
          <textarea 
            value={facts}
            onChange={(e) => setFacts(e.target.value)}
            placeholder="اكتبي وقائع الدعوى هنا للتحليل..."
            style={{ width: '100%', height: '150px', borderRadius: '12px', padding: '1rem', backgroundColor: '#0f172a', color: 'white', border: '1px solid #334155', fontSize: '1.1rem', marginBottom: '1rem' }}
          />

          <button 
            onClick={handleAnalyze}
            disabled={loading}
            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> بدء التحليل الذكي</>}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: '2rem', background: '#0ea5e922', border: '1px solid #0ea5e9', padding: '1.5rem', borderRadius: '16px' }}>
            <h3 style={{ color: '#38bdf8' }}>نتائج التحليل:</h3>
            <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>{result.analysis || result.suggestion}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
