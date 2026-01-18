# Kidney Health Risk Checker - System Walkthrough

## Technical Architecture (ISP 543)

The system follows a modular Knowledge-Based System (KBS) architecture, separating the UI, Inference Engine, and Knowledge Base.

```mermaid
graph TD
    User((User)) -->|Inputs Data| Wizard[Wizard UI Modules]
    
    subgraph "Data Input Layer"
        Wizard -->|A: Demographics| Data[User Data Object]
        Wizard -->|B: History| Data
        Wizard -->|C: Symptoms| Data
        Wizard -->|D: Labs| Data
    end
    
    Data -->|Passed to| Engine[Inference Engine]
    
    subgraph "Knowledge Based Core"
        Engine -->|Forward Chaining| KB[Knowledge Base]
        KB -->|Base Rules| P1[Baseline Risk Points]
        KB -->|Symptom Rules| P2[Symptom Points]
        KB -->|Refinement Rules| P3[Conflict/Urgency Adj.]
    end
    
    Engine -->|Calculates| Score[Kidney Health Index]
    Engine -->|Aggregates| Expl[Triggered Rules]
    
    Score -->|Determines| Risk[Risk Level]
    
    Risk -->|Output| UI[Results & Explanation UI]
    Expl -->|Output| UI
```

## Verification Results

### Logic Verification
The inference engine was tested with 4 distinct scenarios:
1.  **Healthy**: Score 0 (Low Risk)
2.  **Base Risk**: Score 50 (Moderate Risk)
3.  **Symptomatic**: Score 75 (High Risk)
4.  **Critical**: Score 100 (Critical Risk) 
All tests passed (see `src/logic/test.ts`).

### Application Features
- **Multi-step Wizard**: Smooth navigation through Demographics, History, Symptoms, Labs.
- **Weighted Point System**: Implemented ~50 base rules and ~150 symptom permutations support via the `knowledgeBase.ts` structure.
- **Explanation Module**: "Why this result?" dropdown lists exactly which rules contributed to the score.

### Verification Screenshots
#### Step 2: Medical History
![Medical History Step](file:///Users/izwanhamdan/.gemini/antigravity/brain/f97e775d-69d3-4b86-9fd3-cb2e407dfa55/medical_history_step_1768225086977.png)

#### Empty Page Issue Resolved
The application initially failed to load (blank page) due to a module export issue (`AgeGroup` type). This has been resolved, and the app now renders correctly.
