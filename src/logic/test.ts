
import { calculateRisk, type UserData } from './inferenceEngine';

const testCases: { name: string, data: UserData }[] = [
    {
        name: "Healthy Young Male",
        data: {
            age: 25,
            gender: 'male',
            diabetes: false,
            hypertension: false,
            history_kidney_disease: false,
            painkiller_use: false,
            symptoms: { foamy_urine: false, swelling: false, fatigue: false, breathless: false, itchy: false, night_urination: false }
        }
    },
    {
        name: "Senior with Diabetes (Base Risk)",
        data: {
            age: 70,
            gender: 'female',
            diabetes: true,
            hypertension: false,
            history_kidney_disease: false,
            painkiller_use: false,
            symptoms: { foamy_urine: false, swelling: false, fatigue: false, breathless: false, itchy: false, night_urination: false }
        }
    },
    {
        name: "Middle Aged with Swelling and Foamy Urine",
        data: {
            age: 50,
            gender: 'male',
            diabetes: false,
            hypertension: false,
            history_kidney_disease: false,
            painkiller_use: false,
            symptoms: { foamy_urine: true, swelling: true, fatigue: false, breathless: false, itchy: false, night_urination: false }
        }
    },
    {
        name: "Critical Case: Senior + History + High Symptoms",
        data: {
            age: 70,
            gender: 'male',
            diabetes: true,
            hypertension: true,
            history_kidney_disease: true,
            painkiller_use: true,
            symptoms: { foamy_urine: true, swelling: true, fatigue: true, breathless: true, itchy: false, night_urination: true }
        }
    }
];

console.log("=== Kidney Risk Inference Engine Tests ===\n");

testCases.forEach(test => {
    const result = calculateRisk(test.data);
    console.log(`CASE: ${test.name}`);
    console.log(`Risk Score: ${result.score}`);
    console.log(`Level: ${result.riskLevel}`);
    console.log(`Triggers: ${result.triggeredRules.length} rules triggered`);
    // console.log(`Advice: ${result.advice}`);
    console.log("------------------------------------------");
});
