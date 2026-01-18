import { BASE_RISK_RULES, SYMPTOM_RULES, REFINEMENT_RULES, type AgeGroup } from './knowledgeBase';

export interface UserData {
    age: number;
    gender: 'male' | 'female';
    ethnicity?: string;
    diabetes: boolean;
    hypertension: boolean;
    history_kidney_disease: boolean;
    painkiller_use: boolean;
    symptoms: {
        foamy_urine: boolean;
        swelling: boolean;
        fatigue: boolean;
        breathless: boolean;
        itchy: boolean;
        night_urination: boolean;
    };
    labs?: {
        creatinine?: number;
        gfr?: number;
    };
}

export interface RiskResult {
    score: number;
    riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
    triggeredRules: string[];
    advice: string; // Keep for backward compatibility
    structuredAdvice: {
        lifestyle: string[];
        medical: string[];
        avoid: string[];
        rationale: string;
    };
}

function getAgeGroup(age: number): AgeGroup {
    if (age < 40) return 'young';
    if (age < 60) return 'middle';
    return 'senior';
}

export function calculateRisk(data: UserData): RiskResult {
    let score = 0;
    const triggeredRules: string[] = [];
    const ageGroup = getAgeGroup(data.age);

    // 1. Forward Chaining: Apply Base Risk Rules
    for (const rule of BASE_RISK_RULES) {
        let match = true;
        if (rule.conditions.age_group && rule.conditions.age_group !== ageGroup) match = false;
        if (rule.conditions.diabetes !== undefined && rule.conditions.diabetes !== data.diabetes) match = false;
        if (rule.conditions.hypertension !== undefined && rule.conditions.hypertension !== data.hypertension) match = false;
        if (rule.conditions.history_kidney_disease !== undefined && rule.conditions.history_kidney_disease !== data.history_kidney_disease) match = false;
        if (rule.conditions.painkiller_use !== undefined && rule.conditions.painkiller_use !== data.painkiller_use) match = false;

        if (match) {
            score += rule.points;
            triggeredRules.push(rule.description);
        }
    }

    // 2. Symptom Rules
    for (const rule of SYMPTOM_RULES) {
        let match = true;
        if (rule.conditions.symptom_foamy_urine && !data.symptoms.foamy_urine) match = false;
        if (rule.conditions.symptom_swelling && !data.symptoms.swelling) match = false;
        if (rule.conditions.symptom_fatigue && !data.symptoms.fatigue) match = false;
        if (rule.conditions.symptom_breathless && !data.symptoms.breathless) match = false;
        if (rule.conditions.symptom_itchy && !data.symptoms.itchy) match = false;
        if (rule.conditions.symptom_night_urination && !data.symptoms.night_urination) match = false;

        if (match) {
            score += rule.points;
            triggeredRules.push(rule.description);
        }
    }

    // 3. Inference Refinement
    for (const rule of REFINEMENT_RULES) {
        if (rule.condition_logic(data, score)) {
            score += rule.points_adjustment;
            triggeredRules.push(rule.description);
        }
    }

    // Cap score at 100
    score = Math.max(0, Math.min(100, score));

    // Determine Level and Advice
    let riskLevel: RiskResult['riskLevel'] = 'Low';
    const sAdvice: RiskResult['structuredAdvice'] = {
        lifestyle: ["Maintain healthy hydration (water is best).", "Regular physical activity (30 mins daily)."],
        medical: ["Continue regular health screenings.", "Check blood pressure annually."],
        avoid: ["Avoid excessive salt intake.", "Limit high-sugar sodas and processed foods."],
        rationale: "Your kidney health indicators appear to be within a normal range."
    };

    if (score >= 30) {
        riskLevel = 'Moderate';
        sAdvice.lifestyle.push("Reduce salt intake to less than 2,300mg per day.", "Monitor weight and waist circumference.");
        sAdvice.medical.push("Schedule a non-emergency check-up soon.", "Ask your doctor for a urinalysis.");
        sAdvice.avoid.push("Limit use of NSAIDs (Ibuprofen, Naproxen).", "Stop smoking if applicable.");
        sAdvice.rationale = "You have some risk factors or symptoms that warrant attention. Monitoring and minor lifestyle changes are recommended.";
    }

    if (score >= 60) {
        riskLevel = 'High';
        sAdvice.lifestyle = [
            "Strict Low-Sodium Diet (DASH or Mediterranean recommended).",
            "Monitor daily fluid intake.",
            "Weight management is now a priority."
        ];
        sAdvice.medical = [
            "Book an appointment with a General Practitioner or Nephrologist.",
            "Request a Serum Creatinine blood test.",
            "Get an eGFR (Estimated Glomerular Filtration Rate) calculation.",
            "Review all current medications with a doctor."
        ];
        sAdvice.avoid = [
            "IMMEDIATELY stop all non-prescribed NSAIDs.",
            "Avoid high-protein supplements without medical advice.",
            "Limit phosphorus-rich foods (dark sodas, processed meats)."
        ];
        sAdvice.rationale = "Your profile indicates a significant risk. Professional medical evaluation is necessary to assess kidney function accurately.";
    }

    if (score >= 90) {
        riskLevel = 'Critical';
        sAdvice.lifestyle = ["Strict adherence to renal-dietary guidelines provided by a professional."];
        sAdvice.medical = [
            "URGENT: Visit a healthcare provider or hospital within 24-48 hours.",
            "Emergency evaluation if experiencing extreme fatigue or confusion.",
            "Complete renal profile (Blood & Urine) is mandatory."
        ];
        sAdvice.avoid = [
            "DO NOT take any new supplements or herbal remedies.",
            "Strictly avoid any OTC pain medications except as directed.",
            "Eliminate all processed high-sodium foods immediately."
        ];
        sAdvice.rationale = "CRITICAL ALERT: Your symptoms and history suggest a high likelihood of kidney distress or disease. Immediate medical intervention is required.";
    }

    // Generate Narrative Explanation (the "Why")
    const narrativeParts: string[] = [];

    // Group triggered descriptions for a better flow
    const historyFactors = triggeredRules.filter(r =>
        r.includes("Senior") || r.includes("Middle-aged") || r.includes("Diabetes") ||
        r.includes("Hypertension") || r.includes("Family History") || r.includes("Painkiller")
    );
    const symptomFactors = triggeredRules.filter(r =>
        r.includes("Reported") || r.includes("Combination") || r.includes("Severe")
    );
    const labFactors = triggeredRules.filter(r => r.includes("Lab Result"));

    if (historyFactors.length > 0) narrativeParts.push(`Based on your medical profile (${historyFactors.join(", ")}), there is an established baseline risk.`);
    if (symptomFactors.length > 0) narrativeParts.push(`The symptoms you described—specifically ${symptomFactors.map(s => s.replace("Reported ", "").replace("Combination: ", "")).join(" and ")}—are significant indicators often associated with kidney stress.`);
    if (labFactors.length > 0) narrativeParts.push(`Most critically, your ${labFactors.join(" and ")} provides direct evidence of your current kidney function level.`);

    const finalNarrative = narrativeParts.length > 0
        ? narrativeParts.join(" ")
        : "Your indicators are currently within a normal range based on the information provided.";

    return {
        score,
        riskLevel,
        triggeredRules,
        advice: finalNarrative, // Use the synthesized narrative
        structuredAdvice: {
            ...sAdvice,
            rationale: finalNarrative
        }
    };
}
