import React from 'react';
import { Activity, ShieldCheck, ClipboardList, ArrowRight } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
    return (
        <div className="flex flex-col space-y-12 animate-fade-in py-6">
            <div className="space-y-4">
                <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest border border-blue-100">
                    KBS-Driven Diagnostics
                </span>
                <h2 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">
                    Welcome back, <br />
                    <span className="text-blue-600">Clinical Professional</span>
                </h2>
                <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
                    Begin a new kidney health risk assessment using our advanced inference engine.
                    Ensure all patient data is accurate for the most precise clinical advice.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-blue-200 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">Secure Audit</h4>
                        <p className="text-sm text-slate-400">All data is processed strictly for clinical guidance.</p>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-blue-200 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">Real-time Index</h4>
                        <p className="text-sm text-slate-400">Dynamic risk calculation based on 300+ expert rules.</p>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl space-y-4 hover:border-blue-200 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ClipboardList size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">Action Plans</h4>
                        <p className="text-sm text-slate-400">Categorized lifestyle and medical recommendations.</p>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <button
                    onClick={onStart}
                    className="btn-primary px-8 py-5 text-xl group shadow-2xl shadow-blue-200"
                >
                    Start New Assessment
                    <ArrowRight className="group-hover:translate-x-2 transition-transform h-6 w-6" />
                </button>
            </div>
        </div>
    );
};
