import json

def run_sadeem_audit(v_drop, string_v_max, mppt_max, labels_missing):
    """
    Sadeem AI Core: Auditing PV designs based on SEC/SBC standards.
    """
    ncr_log = []

    # 1. التحقق من هبوط الجهد (Voltage Drop Check) - معيار SEC/SBC 401
    if v_drop > 3.0:
        ncr_log.append({
            "Issue_ID": "NCR-01",
            "Severity": "Critical",
            "Requirement": "SEC Standards / SBC 401",
            "Description": f"Voltage drop {v_drop}% exceeds the 3% limit."
        })

    # 2. التحقق من توافق السلاسل (String Sizing) - معيار IEC 62548-1
    if string_v_max > mppt_max:
        ncr_log.append({
            "Issue_ID": "NCR-02",
            "Severity": "Major",
            "Requirement": "IEC 62548-1 / MPPT Limits",
            "Description": f"String Voc ({string_v_max}V) exceeds Inverter MPPT limit ({mppt_max}V)."
        })

    # 3. التحقق من ملصقات السلامة (Safety Signage) - معيار SBC 801
    if labels_missing:
        ncr_log.append({
            "Issue_ID": "NCR-03",
            "Severity": "Minor",
            "Requirement": "SBC 801 (Fire Protection)",
            "Description": "Missing safety labeling and fire pathways signage on layout."
        })

    return ncr_log

# محاكاة لبيانات تصميم مستخرجة عبر الـ AI Vision
test_design = {
    "v_drop": 4.2, 
    "string_v_max": 1100, 
    "mppt_max": 1000, 
    "labels_missing": True
}

final_report = run_sadeem_audit(**test_design)

print("\n--- Sadeem AI: Official Design Review Log ---")
print(json.dumps(final_report, indent=4))
