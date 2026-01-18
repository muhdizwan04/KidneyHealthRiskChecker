# Kidney Health Risk Checker Implementation Plan

## Goal Description
Build a web-based "Kidney Health Risk Checker" for ISP 543. The system will be a Knowledge-Based System (KBS) using a forward-chaining inference engine to assess kidney health risk based on demographics, history, symptoms, and optional lab data.

## User Review Required
> [!IMPORTANT]
> The "300 rules" requirement will be implemented using a **Weighted Point System** as suggested. This avoids writing 300 explicit if-then statements while mathematically covering the same permutation space (Rules = Baseline + Symptoms + Refinements).

## Proposed Changes

### Logic & Knowledge Base
#### [NEW] [inferenceEngine.ts](file:///Users/izwanhamdan/.gemini/antigravity/scratch/kidney-health-checker/src/logic/inferenceEngine.ts)
- Implementation of the Forward Chaining Logic.
- Functions to calculate scores from inputs.
- Types for UserData and RiskResult.

#### [NEW] [knowledgeBase.ts](file:///Users/izwanhamdan/.gemini/antigravity/scratch/kidney-health-checker/src/logic/knowledgeBase.ts)
- JSON-like structure storing:
  - Base Risk Rules (Age/History weights)
  - Symptom Rules (Symptom weights)
  - Refinement Rules (Conditionals)

### UI Components
#### [NEW] [components/Wizard](file:///Users/izwanhamdan/.gemini/antigravity/scratch/kidney-health-checker/src/components/Wizard)
- `Wizard.tsx`: Main container managing steps.
- `StepDemographics.tsx`: Module A (Age, Gender, Ethnicity).
- `StepHistory.tsx`: Module B (Diabetes, Hypertension, etc.).
- `StepSymptoms.tsx`: Module C (Foamy urine, Swelling, etc.).
- `StepLabs.tsx`: Module D (Creatinine, eGFR - Optional).

#### [NEW] [components/Results.tsx](file:///Users/izwanhamdan/.gemini/antigravity/scratch/kidney-health-checker/src/components/Results.tsx)
- Displays Risk Level, Explanation ("Why this result?"), and Advice.

### Styling
#### [MODIFY] [index.css](file:///Users/izwanhamdan/.gemini/antigravity/scratch/kidney-health-checker/src/index.css)
- Configure Tailwind directives and custom theme colors (Medical Blue/Clean White).

## Verification Plan

### Automated Tests
- **Logic Testing**: Create a script `src/logic/test.ts` to run simulated "patients" through the inference engine and print results.
    - Command: `npx tsx src/logic/test.ts` (will need to install `tsx` or just run via vite dev).
    - We will verify that:
        - Young + Healthy = Low Risk
        - Senior + Diabetic = High Baseline
        - Symptoms add correct points.

### Manual Verification
1.  **Start App**: `npm run dev`
2.  **Walkthrough**:
    - **Test Case 1 (Healthy)**: Age 25, No History, No Symptoms. -> Expect "Low Risk".
    - **Test Case 2 (High Risk)**: Age 65, Diabetes, Swelling, Foamy Urine. -> Expect "High/Critical Risk" + correct explanation.
    - **Check UI**: Verify navigation between wizard steps, responsiveness, and clarity of text.
