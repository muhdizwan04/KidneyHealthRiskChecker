
import React from 'react';
import { type UserData } from '../../logic/inferenceEngine';

interface StepProps {
    data: UserData;
    updateData: (updates: Partial<UserData>) => void;
}

export const StepLabs: React.FC<StepProps> = ({ data, updateData }) => {
    const updateLab = (key: 'gfr' | 'creatinine', value: string) => {
        const numVal = parseFloat(value);
        const labs = data.labs || {};
        updateData({
            labs: {
                ...labs,
                [key]: isNaN(numVal) ? undefined : numVal
            }
        });
    };

    return (
        <div className="space-y-6 animate-fade-in text-left">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Lab Results (Optional)</h2>
                <p className="text-slate-500 leading-relaxed">If you have recent lab results, entering them will improve the accuracy significantly. If not, you can skip this step.</p>
            </div>

            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex gap-3 items-center">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="font-bold text-lg">i</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                    <strong>Note:</strong> These values are usually found in a <span className="text-blue-600 font-semibold">Basic Metabolic Panel (BMP)</span> blood test.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">eGFR</label>
                    <p className="text-[10px] text-slate-400 mb-2 ml-1">Estimated Glomerular Filtration Rate</p>
                    <div className="relative group">
                        <input
                            type="number"
                            placeholder="e.g., 90"
                            value={data.labs?.gfr || ''}
                            onChange={(e) => updateLab('gfr', e.target.value)}
                            className="w-full pl-5 pr-20 py-4 bg-white border-2 border-slate-100 rounded-2xl 
                                     focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none 
                                     transition-all group-hover:border-slate-200 text-lg font-medium"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 pointer-events-none">
                            <span className="text-slate-500 text-xs font-bold uppercase">mL/min</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Serum Creatinine</label>
                    <p className="text-[10px] text-slate-400 mb-2 ml-1">Measured in milligrams per deciliter</p>
                    <div className="relative group">
                        <input
                            type="number"
                            step="0.1"
                            placeholder="e.g., 1.1"
                            value={data.labs?.creatinine || ''}
                            onChange={(e) => updateLab('creatinine', e.target.value)}
                            className="w-full pl-5 pr-20 py-4 bg-white border-2 border-slate-100 rounded-2xl 
                                     focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none 
                                     transition-all group-hover:border-slate-200 text-lg font-medium"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 pointer-events-none">
                            <span className="text-slate-500 text-xs font-bold uppercase">mg/dL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
