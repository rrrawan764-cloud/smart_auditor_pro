/**
 * MockAIService
 * Simulates backend AI responses for the Justice Platform.
 */
export class MockAIService {
    constructor() {
        this.delay = 2000; // Simulated network delay
    }

    /**
     * Simulates processing a request with a delay.
     * @param {Function} callback - The function to execute after delay.
     * @returns {Promise<any>}
     */
    async simulateProcessing(callback) {
        return new Promise(resolve => {
            setTimeout(() => {
                const result = callback();
                resolve(result);
            }, this.delay);
        });
    }

    /**
     * Generates analysis for Citizen queries.
     * @param {string} question
     * @returns {Promise<string>} HTML content of the analysis.
     */
    async generateCitizenAnalysis(question) {
        return this.simulateProcessing(() => {
            const responses = [
                {
                    title: "تحليل المساعد الذكي",
                    content: `
                        <p>بناءً على سؤالك، يُنصح بالتالي:</p>
                        <ul>
                            <li>التوجه إلى أقرب محكمة مختصة حسب نوع القضية</li>
                            <li>إعداد كافة المستندات المطلوبة (الهوية، المستندات المؤيدة)</li>
                            <li>الاستعانة بمحامٍ معتمد إذا كانت القضية معقدة</li>
                            <li>تقديم الطلب عبر المنصة الإلكترونية لتسريع الإجراءات</li>
                        </ul>
                    `,
                    recommendation: "يمكنك استخدام خدمة 'رفع دعوى جديدة' في المنصة للمساعدة في إعداد المستندات المطلوبة."
                },
                {
                    title: "توجيهات قانونية أولية",
                    content: `
                        <p>بالنسبة لحالتك، هذه أهم النقاط:</p>
                        <ul>
                            <li>تأكد من توثيق جميع الأدلة والمستندات</li>
                            <li>احتفظ بنسخ من جميع المراسلات</li>
                            <li>التزم بالمواعيد القانونية المحددة</li>
                            <li>اطلب المشورة القانونية قبل أي إجراء رسمي</li>
                        </ul>
                    `,
                    recommendation: "ننصح بزيارة قسم 'الاستشارة القانونية' للحصول على مزيد من التفاصيل."
                }
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            return this.formatResponse(randomResponse.title, randomResponse.content, randomResponse.recommendation, 'citizenAiResult');
        });
    }

    /**
     * Generates analysis for Judge queries.
     * @param {string} text
     * @returns {Promise<string>} HTML content of the analysis.
     */
    async generateJudgeAnalysis(text) {
        return this.simulateProcessing(() => {
            const analyses = [
                {
                    gaps: ["عدم وضوح تواريخ التبليغ", "نقص في بعض المستندات الأساسية", "عدم تحديد الاختصاص القضائي بوضوح"],
                    recommendations: ["طلب استكمال المستندات الناقصة", "تحديد جلسة للمرافعة", "الاستعانة بخبير فني إذا لزم الأمر"],
                    timeline: "المدة المتوقعة: 2-3 أشهر"
                },
                {
                    gaps: ["تناقض في الروايات", "عدم تقديم أدلة كافية", "إشكالية في تحديد المسؤولية"],
                    recommendations: ["طلب إيضاحات إضافية", "تحديد جلسة استماع للأطراف", "الاستعانة بمحكم إذا لزم الأمر"],
                    timeline: "المدة المتوقعة: 3-4 أشهر"
                }
            ];

            const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];

            return `
                <div class="result-header">
                    <h4><i class="fas fa-chart-bar"></i> نتائج التحليل المتقدم</h4>
                    <div class="result-actions">
                        <button class="icon-btn" onclick="window.platform.speakText(this)" style="width: auto; padding: 0.5rem;" aria-label="قراءة النص">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button class="icon-btn" onclick="window.platform.copyResult('judgeAiResult')" style="width: auto; padding: 0.5rem;" aria-label="نسخ النص">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                <div class="result-content">
                    <div style="display: grid; gap: var(--space-6);">
                        <div style="background: rgba(0, 0, 0, 0.1); padding: var(--space-6); border-radius: var(--radius);">
                            <h5 style="margin-bottom: var(--space-4); color: var(--judge-light);">النواقص الملحوظة</h5>
                            <ul>
                                ${randomAnalysis.gaps.map(gap => `<li>${gap}</li>`).join('')}
                            </ul>
                        </div>
                        <div style="background: rgba(0, 0, 0, 0.1); padding: var(--space-6); border-radius: var(--radius);">
                            <h5 style="margin-bottom: var(--space-4); color: var(--judge-light);">التوصيات</h5>
                            <ul>
                                ${randomAnalysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                            </ul>
                        </div>
                        <div style="background: rgba(0, 0, 0, 0.1); padding: var(--space-6); border-radius: var(--radius);">
                            <h5 style="margin-bottom: var(--space-4); color: var(--judge-light);">المدة المتوقعة</h5>
                            <p>${randomAnalysis.timeline}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    /**
     * Generates analysis for Lawyer queries.
     * @param {string} question
     * @returns {Promise<string>} HTML content of the analysis.
     */
    async generateLawyerAnalysis(question) {
        return this.simulateProcessing(() => {
            const templates = [
                {
                    advice: "بناءً على الاستفسار، أنصح بالتالي:",
                    points: [
                        "مراجعة السوابق القضائية المشابهة",
                        "إعداد مذكرة دفاعية شاملة",
                        "تقديم الطلبات الاحتياطية",
                        "الاستعداد للجلسات القادمة"
                    ],
                    note: "تأكد من مراجعة جميع المستندات مع العميل قبل تقديمها."
                },
                {
                    advice: "للتعامل مع هذه القضية:",
                    points: [
                        "تحليل نقاط القوة والضعف في القضية",
                        "إعداد قائمة بالأدلة المطلوبة",
                        "تحديد الاستراتيجية الدفاعية المناسبة",
                        "التواصل مع الشهود والخبراء"
                    ],
                    note: "ننصح بتوثيق جميع الإجراءات والمراسلات."
                }
            ];

            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

            return `
                <div class="result-header">
                    <h4><i class="fas fa-gavel"></i> استشارة قانونية متخصصة</h4>
                    <div class="result-actions">
                        <button class="icon-btn" onclick="window.platform.speakText(this)" style="width: auto; padding: 0.5rem;" aria-label="قراءة النص">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button class="icon-btn" onclick="window.platform.copyResult('lawyerAiResult')" style="width: auto; padding: 0.5rem;" aria-label="نسخ النص">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                <div class="result-content">
                    <p><strong>${randomTemplate.advice}</strong></p>
                    <ul>
                        ${randomTemplate.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                    <div class="info-box">
                        <p><i class="fas fa-lightbulb"></i> ${randomTemplate.note}</p>
                    </div>
                </div>
            `;
        });
    }

    /**
     * Generates response for Blind Interface queries.
     * @param {string} input
     * @returns {Promise<string>} HTML content of the response.
     */
    async generateBlindResponse(input) {
        return this.simulateProcessing(() => {
            const responses = [
                "تم استلام طلبك بنجاح. سيقوم المساعد الذكي بمساعدتك في الخدمات القضائية. يمكنك استخدام الأوامر الصوتية للتنقل بين الخدمات.",
                "مرحباً بك في منصة رواق العدل للمكفوفين. أنا المساعد الصوتي الذكي، كيف يمكنني مساعدتك اليوم؟",
                "تم تسجيل طلبك. يمكنك الآن استخدام الأوامر التالية: 'فتح الخدمات'، 'متابعة قضية'، 'حجز موعد'، أو 'استشارة قانونية'."
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            return `
                <div class="result-header">
                    <h4><i class="fas fa-comment-alt"></i> رد المساعد الصوتي</h4>
                    <div class="result-actions">
                        <button class="icon-btn" onclick="window.platform.speakText(this)" style="width: auto; padding: 0.5rem;" aria-label="قراءة النص">
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                </div>
                <div class="result-content">
                    <p>${randomResponse}</p>
                    <div class="info-box">
                        <p><i class="fas fa-info-circle"></i> يمكنك دائماً استخدام الأمر الصوتي "مساعدة" للحصول على قائمة بالأوامر المتاحة.</p>
                    </div>
                </div>
            `;
        });
    }

    /**
     * Helper to format generic responses.
     */
    formatResponse(title, content, recommendation, resultId) {
        return `
            <div class="result-header">
                <h4><i class="fas fa-lightbulb"></i> ${title}</h4>
                <div class="result-actions">
                    <button class="icon-btn" onclick="window.platform.speakText(this)" style="width: auto; padding: 0.5rem;" aria-label="قراءة النص">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <button class="icon-btn" onclick="window.platform.copyResult('${resultId}')" style="width: auto; padding: 0.5rem;" aria-label="نسخ النص">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
            <div class="result-content">
                ${content}
                <div class="info-box">
                    <p><i class="fas fa-info-circle"></i> ${recommendation}</p>
                </div>
            </div>
        `;
    }
}
