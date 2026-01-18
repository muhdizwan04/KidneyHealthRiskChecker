
import React from 'react';
import { type UserData } from '../../logic/inferenceEngine';
import { Plus, Minus } from 'lucide-react';

interface StepProps {
    data: UserData;
    updateData: (updates: Partial<UserData>) => void;
}

export const StepDemographics: React.FC<StepProps> = ({ data, updateData }) => {
    const minAge = 18;
    const maxAge = 100;

    const handleAgeChange = (val: string) => {
        if (val === '') {
            updateData({ age: 0 });
            return;
        }
        const parsed = parseInt(val);
        if (!isNaN(parsed)) {
            updateData({ age: Math.min(120, Math.max(0, parsed)) });
        }
    };

    const incrementAge = () => {
        updateData({ age: Math.min(maxAge, (data.age || 18) + 1) });
    };

    const decrementAge = () => {
        updateData({ age: Math.max(minAge, (data.age || 18) - 1) });
    };

    const isAgeInvalid = data.age !== 0 && (data.age < minAge || data.age > maxAge);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-800">Basic Information</h2>
                <p className="text-slate-500">Provide your basic details to help us calibrate the risk assessment.</p>
            </div>

            <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                {/* Age Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Age (Years)</label>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${isAgeInvalid ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-mid_blue'}`}>
                            {minAge}-{maxAge} years
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Minus Button */}
                        <button
                            onClick={decrementAge}
                            className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-600"
                        >
                            <Minus size={20} />
                        </button>

                        {/* Number Input */}
                        <div className="relative flex-1 group">
                            <input
                                type="number"
                                value={data.age === 0 ? '' : data.age}
                                onChange={(e) => handleAgeChange(e.target.value)}
                                placeholder="Enter age"
                                className={`w-full text-center text-2xl font-bold px-4 py-3 border rounded-2xl outline-none transition-all ${isAgeInvalid
                                        ? 'border-red-300 ring-4 ring-red-50 text-red-600'
                                        : 'border-slate-200 focus:border-mid_blue focus:ring-4 focus:ring-blue-50 text-slate-800'
                                    }`}
                            />
                        </div>

                        {/* Plus Button */}
                        <button
                            onClick={incrementAge}
                            className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-600"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    {/* Slider */}
                    <div className="px-2 pt-2">
                        <input
                            type="range"
                            min={minAge}
                            max={maxAge}
                            value={data.age || minAge}
                            onChange={(e) => updateData({ age: parseInt(e.target.value) })}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-mid_blue"
                        />
                        <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            <span>{minAge}</span>
                            <span>50</span>
                            <span>{maxAge}</span>
                        </div>
                    </div>

                    {isAgeInvalid && (
                        <p className="text-red-500 text-sm font-medium animate-shake text-center">
                            {data.age < minAge ? `Minimum age for this assessment is ${minAge}.` : `Please enter an age up to ${maxAge}.`}
                        </p>
                    )}
                </div>

                <hr className="border-slate-100" />

                {/* Gender Section */}
                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Gender</label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => updateData({ gender: 'male' })}
                            className={`flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${data.gender === 'male'
                                    ? 'bg-blue-50 border-mid_blue text-mid_blue ring-4 ring-blue-50'
                                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            <span className="text-2xl">♂️</span>
                            <span className="font-bold">Male</span>
                        </button>
                        <button
                            onClick={() => updateData({ gender: 'female' })}
                            className={`flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${data.gender === 'female'
                                    ? 'bg-pink-50 border-pink-500 text-pink-600 ring-4 ring-pink-50'
                                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            <span className="text-2xl">♀️</span>
                            <span className="font-bold">Female</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
