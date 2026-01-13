/* محرك "رواق العدل" الذكي - برمجة روان الصبحي */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. تعريف العناصر الأساسية
    const runAuditBtn = document.getElementById('runAudit');
    const factsInput = document.getElementById('facts');
    const auditResult = document.getElementById('auditResult');
    const blindMicBtn = document.getElementById('blindMic');

    // 2. وظيفة التحليل الذكي للوقائع (AI Auditor)
    if (runAuditBtn) {
        runAuditBtn.addEventListener('click', () => {
            const text = factsInput.value.trim();

            if (text === "") {
                speakText("من فضلك أدخل وقائع الدعوى أولاً ليتم فحصها.");
                showResult("يرجى إدخال نص لتحليله.", "error");
                return;
            }

            // محاكاة عملية التحليل الذكي
            showResult("جاري فحص الاختصاص والمرفقات إجرائياً...", "loading");

            setTimeout(() => {
                let report = "";
                if (text.includes("عقد") || text.includes("إيجار")) {
                    report = "تحليل AI: تم رصد دعوى تعاقدية. يرجى التأكد من إرفاق نسخة العقد وبيان تاريخ النزاع لضمان القبول.";
                } else if (text.includes("فصل") || text.includes("قرار")) {
                    report = "تحليل AI: دعوى إلغاء قرار إداري. تم التحقق من المرفقات، يرجى إثبات تاريخ التظلم قبل فوات الموعد النظامي.";
                } else {
                    report = "تحليل AI: تم استلام الوقائع. النظام يوصي بالتحقق من الاختصاص النوعي للمحكمة قبل القيد.";
                }
                
                showResult(report, "success");
                speakText("اكتمل التدقيق الذكي، يمكنك قراءة التقرير الآن.");
            }, 2000);
        });
    }

    // 3. وظيفة المساعد الصوتي للمكفوفين (النطق)
    if (blindMicBtn) {
        blindMicBtn.addEventListener('click', () => {
            const introMessage = "مرحباً بك في مساعد المكفوفين بـرواق العدل. أنا هنا لمساعدتك في قيد دعواك وتدقيق مذكراتك. هل تود أن أقرأ لك حالة طلبك الحالي؟";
            speakText(introMessage);
            
            // إضافة تأثير نبضي للزر عند التحدث
            blindMicBtn.classList.add('pulsate');
            setTimeout(() => blindMicBtn.classList.remove('pulsate'), 5000);
        });
    }

    // 4. دالة تحويل النص إلى صوت (Text-to-Speech)
    function speakText(message) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = message;
        speech.lang = 'ar-SA'; // اللغة العربية - السعودية
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
    }

    // 5. دالة عرض النتائج بشكل جمالي
    function showResult(message, type) {
        if (auditResult) {
            auditResult.style.display = 'block';
            auditResult.className = `audit-result ${type}`;
            auditResult.innerHTML = `<strong>نظام التدقيق الإجرائي:</strong> ${message}`;
            
            // إضافة تأثير انزلاق
            auditResult.style.animation = "fadeInUp 0.5s ease";
        }
    }
});
