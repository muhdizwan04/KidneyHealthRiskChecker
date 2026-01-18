
import React, { useState } from 'react';
import { type UserData } from '../../logic/inferenceEngine';
import { StepDemographics } from './StepDemographics';
import { StepHistory } from './StepHistory';
import { StepSymptoms } from './StepSymptoms';
import { StepLabs } from './StepLabs';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

interface WizardProps {
    initialData: UserData;
    onFinish: (data: UserData) => void;
}

export const Wizard: React.FC<WizardProps> = ({ initialData, onFinish }) => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<UserData>(initialData);

    const steps = [
        { title: "About You", component: StepDemographics },
        { title: "Medical History", component: StepHistory },
        { title: "Symptoms", component: StepSymptoms },
        { title: "Lab Results", component: StepLabs }
    ];

    const CurrentStepComponent = steps[step].component;

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onFinish(data);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const updateData = (updates: Partial<UserData>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const canGoNext = () => {
        if (step === 0) {
            return data.age >= 18 && data.age <= 100;
        }
        return true;
    };

    return (
        <div className="flex flex-col h-full space-y-8">
            {/* Progress Bar */}
            <div className="relative px-2">
                <div className="flex justify-between items-center relative z-10">
                    {steps.map((s, i) => (
                        <div key={i} className="flex flex-col items-center group">
                            <div className={clsx(
                                "w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold border-2 transition-all duration-500",
                                i < step ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" :
                                    i === step ? "bg-white border-blue-600 text-blue-600 shadow-xl scale-110" :
                                        "bg-white border-slate-200 text-slate-400"
                            )}>
                                {i < step ? <CheckCircle size={20} /> : i + 1}
                            </div>
                            <span className={clsx(
                                "text-[10px] mt-2 font-semibold uppercase tracking-wider transition-colors duration-300",
                                i <= step ? "text-blue-600" : "text-slate-400"
                            )}>{s.title}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute top-5 left-8 right-8 h-[2px] bg-slate-100 -z-0">
                    <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700 ease-out rounded-full"
                        style={{ width: `${((step) / (steps.length - 1)) * 100}%` }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 min-h-[400px] glass-panel rounded-3xl p-8 transition-all duration-500">
                <CurrentStepComponent data={data} updateData={updateData} />
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
                <button
                    onClick={handleBack}
                    disabled={step === 0}
                    className="btn-secondary disabled:opacity-30 disabled:hover:bg-white"
                >
                    <ArrowLeft size={18} /> Back
                </button>
                <button
                    onClick={handleNext}
                    disabled={!canGoNext()}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {step === steps.length - 1 ? "Get Results" : "Next Step"}
                    {step === steps.length - 1 ? <CheckCircle size={18} /> : <ArrowRight size={18} />}
                </button>
            </div>
        </div>
    );
};
