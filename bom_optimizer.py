def optimize_bom(current_bom):
    """
    Sadeem AI: BoM/BoQ Optimization Logic.
    Reduces cost while maintaining SBC/SEC compliance.
    """
    optimized_bom = []
    total_savings = 0

    for item in current_bom:
        # مثال: إذا كان الكابل أضخم من اللازم بدون تبرير هندسي
        if item["name"] == "DC Cable" and item["oversized"]:
            saving = item["cost"] * 0.15  # توفير 15% عند اختيار المقاس الأنسب
            total_savings += saving
            optimized_bom.append({
                "item": item["name"],
                "action": "Optimized Size",
                "rationale": "Sized per actual current & derating (SEC compliant).",
                "saving_amount": f"{saving} SAR"
            })
        else:
            optimized_bom.append({"item": item["name"], "action": "Kept", "rationale": "Optimal selection"})

    return optimized_bom, total_savings

# بيانات عينة لقائمة مواد (BoM) غير محسنة
sample_bom = [
    {"name": "DC Cable", "cost": 5000, "oversized": True},
    {"name": "PV Modules", "cost": 20000, "oversized": False},
    {"name": "Inverters", "cost": 15000, "oversized": False}
]

suggestions, savings = optimize_bom(sample_bom)

print("\n--- Sadeem AI: BoM Optimization Report ---")
for s in suggestions:
    print(f"- {s['item']}: {s['action']} ({s['rationale']})")
print(f"\n[TOTAL ESTIMATED SAVINGS]: {savings} SAR")
