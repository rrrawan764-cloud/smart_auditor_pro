import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // استبدلي هذا الرابط برابط Render الخاص بكِ
  const API_URL = "رابط_ريندر_الخاص_بك_هنا";

  const analyzeText = async () => {
    if (!text) return alert("الرجاء إدخال نص للتحليل");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ في الاتصال بالسيرفر");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', direction: 'rtl', textAlign: 'center', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2.5rem' }}>⚖️ رواق العدل</h1>
        <p style={{ color: '#7f8c8d' }}>المدقق الذكي - تطوير المبرمجة: روان الصبحي</p>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <textarea
          style={{ width: '100%', height: '200px', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1.1rem', marginBottom: '20px', outline: 'none' }}
          placeholder="أدخل نص الواقعة القانونية هنا للتحليل..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <button
          onClick={analyzeText}
          disabled={loading}
          style={{ backgroundColor: '#27ae60', color: 'white', padding: '12px 30px', fontSize: '1.2rem', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: '0.3s' }}
        >
          {loading ? "جاري التحليل..." : "بدء التحليل الذكي 🚀"}
        </button>

        {result && (
          <div style={{ marginTop: '30px', textAlign: 'right', backgroundColor: '#ecf0f1', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ color: '#2980b9' }}>📋 نتيجة التحليل:</h3>
            <p style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{result.analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
