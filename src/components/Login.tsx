import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck, Activity, Mail, UserPlus, LogIn } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (isRegister) {
                setIsRegister(false); // Switch to login after registration success
                // In a real app, we might auto-login or show a success message
            } else {
                onLogin();
            }
        }, 1200);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50">
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-100/50 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-teal-50/50 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-50/40 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 z-1 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}
            />

            <div className="relative z-10 w-full max-w-lg mx-4">
                {/* Header Branding */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex p-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl mb-4 animate-float">
                        <span className="text-3xl">🩺</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tighter">
                        HealthCheck <span className="text-blue-600">Pro</span>
                    </h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
                        {isRegister ? 'New Member Enrollment' : 'Clinical Portal Access'}
                    </p>
                </div>

                {/* Ultra-Glass Card */}
                <div className="glass-card bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/80 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] animate-scale-up">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-800 mb-1">
                            {isRegister ? 'Create Account' : 'Internal Access'}
                        </h2>
                        <p className="text-slate-500 font-medium text-sm">
                            {isRegister ? 'Join our clinical decision support network.' : 'Authorized medical personnel only.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-3">
                            {isRegister && (
                                <div className="group relative animate-fade-in">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-500 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Clinical Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 bg-white/40 border-2 border-slate-100 rounded-[1.25rem] focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-600/5 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                                        required
                                    />
                                </div>
                            )}

                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-500 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Staff ID / Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-white/40 border-2 border-slate-100 rounded-[1.25rem] focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-600/5 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                                    required
                                />
                            </div>

                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-500 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-white/40 border-2 border-slate-100 rounded-[1.25rem] focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-600/5 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-[1.25rem] font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl shadow-slate-200 group disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isRegister ? 'Enroll Staff' : 'Authorize Access'}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle Section */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors"
                        >
                            {isRegister ? (
                                <><LogIn size={14} /> Back to Clinician Sign In</>
                            ) : (
                                <><UserPlus size={14} /> New Practitioner? Create Account</>
                            )}
                        </button>

                        <div className="flex items-center gap-6 text-slate-300">
                            <Activity size={14} />
                            <div className="w-px h-3 bg-slate-100" />
                            <ShieldCheck size={14} />
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
                    Department of Clinical Decision Support
                </p>
            </div>
        </div>
    );
};
