import { useState } from 'react';
import { type UserData, calculateRisk, type RiskResult } from './logic/inferenceEngine';
import { Wizard } from './components/Wizard/Wizard';
import { Results } from './components/Results';
import { Login } from './components/Login';
import { Landing } from './components/Landing';

type ViewState = 'login' | 'landing' | 'assessment' | 'results';

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
  const [view, setView] = useState<ViewState>('login');
  const [userData, setUserData] = useState<UserData>(initialData);
  const [result, setResult] = useState<RiskResult | null>(null);

  const handleFinish = (data: UserData) => {
    const riskResult = calculateRisk(data);
    setResult(riskResult);
    setView('results');
  };

  const handleRestart = () => {
    setResult(null);
    setUserData(initialData);
    setView('landing');
  };

  const renderContent = () => {
    switch (view) {
      case 'login':
        return <Login onLogin={() => setView('landing')} />;
      case 'landing':
        return <Landing onStart={() => setView('assessment')} />;
      case 'assessment':
        return (
          <Wizard
            initialData={userData}
            onFinish={handleFinish}
          />
        );
      case 'results':
        return result ? (
          <Results
            result={result}
            onRestart={handleRestart}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-0 md:p-4 transition-all duration-700">
      {view === 'login' ? (
        <Login onLogin={() => setView('landing')} />
      ) : (
        <div className="max-w-4xl w-full glass-card rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col transition-all duration-500 min-h-[600px] shadow-2xl">
          {/* Content */}
          <main className="flex-1 p-6 md:p-12 flex flex-col">
            <div className="mb-10 animate-fade-in">
              <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <span className="bg-blue-600 text-white p-2 rounded-2xl shadow-lg shadow-blue-200">🩺</span>
                Kidney Health Risk Checker
              </h1>
              <p className="text-slate-400 font-medium ml-14 mt-1 italic uppercase text-[10px] tracking-widest">
                Knowledge-Based Clinical Assistant
              </p>
            </div>

            <div className="flex-1">
              {renderContent()}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
