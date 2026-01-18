import { type RiskResult } from '../logic/inferenceEngine';
import { Info, RefreshCw } from 'lucide-react';

interface ResultsProps {
    result: RiskResult;
    onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, onRestart }) => {

    const getStatusColor = (level: string) => {
        switch (level) {
            case 'Low': return 'from-green-500 to-emerald-600 shadow-green-100';
            case 'Moderate': return 'from-yellow-400 to-orange-500 shadow-orange-100';
            case 'High': return 'from-orange-500 to-red-600 shadow-red-100';
            case 'Critical': return 'from-red-600 to-rose-800 shadow-rose-200';
            default: return 'from-slate-400 to-slate-600';
        }
    };

    const advice = result.structuredAdvice;

    return (
        <div className="animate-fade-in flex flex-col h-full space-y-8 text-left">
            {/* Hero Result Section */}
            <div className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${getStatusColor(result.riskLevel)} text-white shadow-2xl relative overflow-hidden group`}>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <p className="text-white/80 uppercase tracking-widest text-xs font-bold mb-1">Current Assessment</p>
                        <h2 className="text-5xl font-extrabold tracking-tight">
                            {result.riskLevel} <span className="text-white/60 font-medium">Risk</span>
                        </h2>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/20" />
                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * result.score) / 100} className="text-white transition-all duration-1000 ease-out" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black">{result.score}</span>
                                <span className="text-[10px] uppercase font-bold text-white/70">Index</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Structured Advice Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lifestyle Section */}
                <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-emerald-500">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <span className="text-xl">🥗</span>
                        </div>
                        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Lifestyle & Diet</h3>
                    </div>
                    <ul className="space-y-3">
                        {advice.lifestyle.map((item, i) => (
                            <li key={i} className="flex gap-2 text-sm text-slate-600 leading-snug">
                                <span className="text-emerald-500 font-bold">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Medical Section */}
                <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-blue-500">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                            <span className="text-xl">👨‍⚕️</span>
                        </div>
                        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Medical Action</h3>
                    </div>
                    <ul className="space-y-3">
                        {advice.medical.map((item, i) => (
                            <li key={i} className="flex gap-2 text-sm text-slate-600 leading-snug">
                                <span className="text-blue-500 font-bold">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Things to Avoid Section */}
                <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-rose-500 md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                            <span className="text-xl">⚠️</span>
                        </div>
                        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Avoid Immediately</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                        {advice.avoid.map((item, i) => (
                            <li key={i} className="flex gap-2 text-sm text-slate-600 leading-snug list-none">
                                <span className="text-rose-500 font-bold">✕</span> {item}
                            </li>
                        ))}
                    </div>
                </div>
            </div>

            {/* Explanation / Rationale */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                        <Info size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-lg mb-2">Why this result?</h3>
                        <p className="text-slate-600 leading-relaxed italic">
                            "{advice.rationale}"
                        </p>
                    </div>
                </div>
            </div>

            <div className="pt-4 flex justify-center">
                <button
                    onClick={onRestart}
                    className="btn-secondary"
                >
                    <RefreshCw size={18} /> New Assessment
                </button>
            </div>
        </div>
    );
};
