
import React from 'react';
import { type UserData } from '../../logic/inferenceEngine';
import { Activity, Heart, Pill } from 'lucide-react';

interface StepProps {
    data: UserData;
    updateData: (updates: Partial<UserData>) => void;
}

export const StepHistory: React.FC<StepProps> = ({ data, updateData }) => {
    const ToggleCard = ({
        label,
        value,
        icon: Icon,
        onChange
    }: { label: string, value: boolean, icon: any, onChange: (val: boolean) => void }) => (
        <div
            onClick={() => onChange(!value)}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${value ? 'border-mid_blue bg-blue-50' : 'border-slate-100 hover:border-blue-200 bg-white'}`}
        >
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${value ? 'bg-mid_blue text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Icon size={20} />
                </div>
                <div>
                    <h3 className={`font-medium ${value ? 'text-mid_blue' : 'text-slate-700'}`}>{label}</h3>
                    <p className="text-xs text-slate-500 mt-1">{value ? 'Yes' : 'No'}</p>
                </div>
            </div>
            {value && <div className="absolute top-3 right-3 w-3 h-3 bg-mid_blue rounded-full"></div>}
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-slate-800">Medical History</h2>
            <p className="text-slate-500">Do you have a history of any of the following conditions?</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ToggleCard
                    label="Diabetes"
                    value={data.diabetes}
                    icon={Activity}
                    onChange={(val) => updateData({ diabetes: val })}
                />
                <ToggleCard
                    label="Hypertension (High BP)"
                    value={data.hypertension}
                    icon={Heart}
                    onChange={(val) => updateData({ hypertension: val })}
                />
                <ToggleCard
                    label="Family History of Kidney Disease"
                    value={data.history_kidney_disease}
                    icon={Activity}
                    onChange={(val) => updateData({ history_kidney_disease: val })}
                />
                <ToggleCard
                    label="Regular Painkiller Use (NSAIDs)"
                    value={data.painkiller_use}
                    icon={Pill}
                    onChange={(val) => updateData({ painkiller_use: val })}
                />
            </div>
        </div>
    );
};
