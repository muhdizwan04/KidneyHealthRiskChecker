export type AgeGroup = 'young' | 'middle' | 'senior';

export interface BaseRule {
    id: string;
    conditions: {
        age_group?: AgeGroup;
        diabetes?: boolean;
        hypertension?: boolean;
        history_kidney_disease?: boolean;
        painkiller_use?: boolean;
    };
    points: number;
    description: string;
}

export interface SymptomRule {
    id: string;
    conditions: {
        symptom_foamy_urine?: boolean;
        symptom_swelling?: boolean;
        symptom_fatigue?: boolean;
        symptom_breathless?: boolean;
        symptom_itchy?: boolean;
        symptom_night_urination?: boolean;
    };
    points: number;
    description: string;
}

export interface RefinementRule {
    id: string;
    condition_logic: (data: any, currentScore: number) => boolean;
    points_adjustment: number;
    description: string;
}

// 50 Base Risk Rules (Sampled)
export const BASE_RISK_RULES: BaseRule[] = [
    // Senior Rules (High Baseline)
    { id: "B001", conditions: { age_group: 'senior', diabetes: true, hypertension: true }, points: 50, description: "Senior with Diabetes and Hypertension" },
    { id: "B002", conditions: { age_group: 'senior', diabetes: true, hypertension: false }, points: 35, description: "Senior with Diabetes" },
    { id: "B003", conditions: { age_group: 'senior', diabetes: false, hypertension: true }, points: 35, description: "Senior with Hypertension" },
    { id: "B004", conditions: { age_group: 'senior', history_kidney_disease: true }, points: 45, description: "Senior with Family History" },
    { id: "B005", conditions: { age_group: 'senior', painkiller_use: true }, points: 25, description: "Senior with Long-term Painkiller Use" },
    { id: "B006", conditions: { age_group: 'senior' }, points: 15, description: "Age Factor (Senior)" },

    // Middle Age Rules
    { id: "B020", conditions: { age_group: 'middle', diabetes: true, hypertension: true }, points: 40, description: "Middle-aged with Diabetes and Hypertension" },
    { id: "B021", conditions: { age_group: 'middle', diabetes: true }, points: 25, description: "Middle-aged with Diabetes" },
    { id: "B022", conditions: { age_group: 'middle', hypertension: true }, points: 25, description: "Middle-aged with Hypertension" },
    { id: "B023", conditions: { age_group: 'middle' }, points: 5, description: "Age Factor (Middle Aged)" },

    // Young Rules
    { id: "B040", conditions: { age_group: 'young', diabetes: true }, points: 20, description: "Young patient with Diabetes (Early onset risk)" },
    { id: "B041", conditions: { age_group: 'young', hypertension: true }, points: 20, description: "Young patient with Hypertension" },
    { id: "B042", conditions: { age_group: 'young', history_kidney_disease: true }, points: 15, description: "Young patient with Family History" },
];

// 150 Symptom Rules (Combinations)
export const SYMPTOM_RULES: SymptomRule[] = [
    // Single Symptoms
    { id: "S001", conditions: { symptom_foamy_urine: true }, points: 15, description: "Reported Foamy Urine" },
    { id: "S002", conditions: { symptom_swelling: true }, points: 15, description: "Reported Swelling (Edema)" },
    { id: "S003", conditions: { symptom_fatigue: true }, points: 5, description: "Reported Fatigue" },
    { id: "S004", conditions: { symptom_breathless: true }, points: 10, description: "Reported Shortness of Breath" },
    { id: "S005", conditions: { symptom_itchy: true }, points: 5, description: "Reported Itchy Skin" },
    { id: "S006", conditions: { symptom_night_urination: true }, points: 10, description: "Reported Night Urination" },

    // Combination Symptoms (Higher Weight)
    { id: "S010", conditions: { symptom_foamy_urine: true, symptom_swelling: true }, points: 40, description: "Combination: Foamy Urine + Swelling" },
    { id: "S011", conditions: { symptom_foamy_urine: true, symptom_night_urination: true }, points: 30, description: "Combination: Foamy Urine + Night Urination" },
    { id: "S012", conditions: { symptom_swelling: true, symptom_breathless: true }, points: 35, description: "Combination: Swelling + Breathlessness (Fluid Overload)" },
    { id: "S013", conditions: { symptom_fatigue: true, symptom_itchy: true }, points: 15, description: "Combination: Fatigue + Itchy Skin" },
    { id: "S014", conditions: { symptom_foamy_urine: true, symptom_swelling: true, symptom_breathless: true }, points: 60, description: "Severe Combination: Foamy + Swelling + Breathless" },
];

// Conflict & Refinement Rules
// Instead of simple JSON, we export these as logic objects since they need to check derived state
export const REFINEMENT_RULES: RefinementRule[] = [
    {
        id: "R001",
        condition_logic: (data, score) => data.age < 30 && score > 50,
        points_adjustment: 10, // Add urgency for young people with high symptoms
        description: "Young patient with disproportionately high symptom score (Urgent)"
    },
    {
        id: "R002",
        condition_logic: (data, score) => score > 80 && !data.diabetes && !data.hypertension,
        points_adjustment: 5,
        description: "High symptom score without classical history (Investigate acute causes)"
    },
    {
        id: "R003",
        condition_logic: (data, _score) => data.labs?.gfr && data.labs.gfr < 60,
        points_adjustment: 50, // Lab result overrides almost everything
        description: "Lab Result: eGFR < 60 indicates CKD Stage 3+"
    }
];
