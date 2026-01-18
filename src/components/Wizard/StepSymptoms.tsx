
import React from 'react';
import { type UserData } from '../../logic/inferenceEngine';

interface StepProps {
    data: UserData;
    updateData: (updates: Partial<UserData>) => void;
}

export const StepSymptoms: React.FC<StepProps> = ({ data, updateData }) => {
    const updateSymptom = (key: keyof UserData['symptoms'], value: boolean) => {
        updateData({
            symptoms: {
                ...data.symptoms,
                [key]: value
            }
        });
    };

    const SymptomItem = ({
        label,
        propKey,
        desc
    }: { label: string, propKey: keyof UserData['symptoms'], desc: string }) => (
        <label className="flex items-center p-4 border rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-mid_blue checked:bg-mid_blue"
                    checked={data.symptoms[propKey]}
                    onChange={(e) => updateSymptom(propKey, e.target.checked)}
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="ml-4">
                <span className="block font-medium text-slate-700 group-hover:text-mid_blue transition-colors">{label}</span>
                <span className="block text-xs text-slate-400">{desc}</span>
            </div>
        </label>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-slate-800">Symptoms</h2>
            <p className="text-slate-500">Have you experienced any of the following symptoms recently?</p>

            <div className="space-y-3">
                <SymptomItem
                    label="Foamy Urine"
                    propKey="foamy_urine"
                    desc="Urine that looks bubbly or foamy consistently"
                />
                <SymptomItem
                    label="Swelling (Edema)"
                    propKey="swelling"
                    desc="Swelling in legs, ankles, feet, or face"
                />
                <SymptomItem
                    label="Extreme Fatigue"
                    propKey="fatigue"
                    desc="Feeling tired or weak all the time"
                />
                <SymptomItem
                    label="Shortness of Breath"
                    propKey="breathless"
                    desc="Difficulty breathing even with mild exertion"
                />
                <SymptomItem
                    label="Itchy Skin"
                    propKey="itchy"
                    desc="Dry and itchy skin that doesn't go away"
                />
                <SymptomItem
                    label="Frequent Night Urination"
                    propKey="night_urination"
                    desc="Waking up multiple times at night to urinate"
                />
            </div>
        </div>
    );
};
