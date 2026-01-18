import { useState } from 'react';
import { type UserData, calculateRisk, type RiskResult } from './logic/inferenceEngine';
import { Wizard } from './components/Wizard/Wizard';
import { Results } from './components/Results';

const initialData: UserData = {
  age: 45,
  gender: 'male',
  diabetes: false,
  hypertension: false,
  history_kidney_disease: false,
  painkiller_use: false,
  symptoms: {
    foamy_urine: false,
    swelling: false,
    fatigue: false,
    breathless: false,
    itchy: false,
    night_urination: false
  }
};

function App() {
  const [userData, setUserData] = useState<UserData>(initialData);
  const [result, setResult] = useState<RiskResult | null>(null);

  const handleFinish = (data: UserData) => {
    const riskResult = calculateRisk(data);
    setResult(riskResult);
  };

  const handleRestart = () => {
    setResult(null);
    setUserData(initialData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-4xl w-full glass-card rounded-[3rem] overflow-hidden flex flex-col transition-all duration-500">
        {/* Content */}
        <main className="flex-1 p-8 md:p-12 flex flex-col">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <span className="bg-blue-600 text-white p-2 rounded-2xl shadow-lg shadow-blue-200">🩺</span>
              Kidney Health Risk Checker
            </h1>
            <p className="text-slate-400 font-medium ml-14 mt-1 italic">Knowledge-Based Clinical Assistant</p>
          </div>

          {!result ? (
            <Wizard
              initialData={userData}
              onFinish={handleFinish}
            />
          ) : (
            <Results
              result={result}
              onRestart={handleRestart}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
