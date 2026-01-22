import pandas as pd

# تحديد الأعمدة المطلوبة وفقاً لمستند التحدي (Required Deliverables)
ncr_columns = [
    "Issue ID", 
    "Location/Reference Drawing", 
    "Description of Issue", 
    "Risk Level (Critical/Major/Minor)", 
    "Violated Requirement (SBC/SEC/IEC)", 
    "Recommended Correction", 
    "Verification Method"
]

# إنشاء بيانات تجريبية (Placeholder)
data = [
    ["NCR-001", "SLD - Page 1", "Example: Voltage drop exceeds 3%", "Critical", "SEC Standards", "Increase cable size", "Recalculation"],
    ["NCR-002", "Roof Plan", "Example: Obstacle clearance not respected", "Major", "MOMRA Requirements", "Adjust module layout", "Redline markup"]
]

# تحويلها إلى ملف Excel/CSV
df = pd.DataFrame(data, columns=ncr_columns)
df.to_csv("Sadeem_NCR_Log_Template.csv", index=False, encoding='utf-8-sig')

print("✅ NCR Template created successfully: Sadeem_NCR_Log_Template.csv")
