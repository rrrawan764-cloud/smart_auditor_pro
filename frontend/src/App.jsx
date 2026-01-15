import React from 'react';
import { Shield, Scale, Activity, User } from 'lucide-react';

function App() {
  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '2rem', textAlign: 'right', direction: 'rtl', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '1px solid #1e293b', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#38bdf8', margin: 0 }}>رواق العدل ⚖️</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>المطورة: **روان الصبحي**</span>
          <User size={24} color="#38bdf8" />
        </div>
      </header>
      
      <main style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>مرحباً بكِ في مستقبل القضاء الرقمي</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '16px', border: '1px solid #334155' }}>
            <Activity size={40} color="#38bdf8" style={{ marginBottom: '1rem' }} />
            <h3>المدقق الذكي</h3>
            <p style={{ color: '#94a3b8' }}>تحليل الوقائع القانونية باستخدام GPT-4.</p>
          </div>

          <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '16px', border: '1px solid #334155' }}>
            <Scale size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h3>منصة القضاة</h3>
            <p style={{ color: '#94a3b8' }}>إدارة الجلسات والأحكام إلكترونياً.</p>
          </div>

          <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '16px', border: '1px solid #334155' }}>
            <Shield size={40} color="#f59e0b" style={{ marginBottom: '1rem' }} />
            <h3>أمن البيانات</h3>
            <p style={{ color: '#94a3b8' }}>تشفير وحماية ملفات القضايا عبر S3.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
