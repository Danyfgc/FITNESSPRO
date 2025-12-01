import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, UserLevel } from '../context/UserContext';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const LEVELS: { id: UserLevel; title: string; desc: string }[] = [
    { id: 'beginner', title: 'Beginner', desc: 'New to fitness, looking for a fresh start.' },
    { id: 'intermediate', title: 'Intermediate', desc: 'Active, but want to push limits.' },
    { id: 'advanced', title: 'Advanced', desc: 'Elite fitness, ready for high intensity.' },
];

const Onboarding = () => {
    const navigate = useNavigate();
    const { createProfile } = useUser();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [level, setLevel] = useState<UserLevel>('beginner');

    const handleFinish = () => {
        if (!name.trim()) return;
        createProfile(name, level);
        navigate('/');
    };

    return (
        <div className="min-h-screen p-6 flex flex-col justify-between">
            <div className="pt-10">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    {step === 1 ? (
                        <>
                            <h2 className="text-3xl font-bold">What should we call you?</h2>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full bg-transparent border-b-2 border-slate-700 text-2xl py-2 focus:border-blue-500 focus:outline-none transition-colors"
                                autoFocus
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold">Select your level</h2>
                            <div className="space-y-4 mt-8">
                                {LEVELS.map((lvl) => (
                                    <button
                                        key={lvl.id}
                                        onClick={() => setLevel(lvl.id)}
                                        className={clsx(
                                            'w-full p-4 rounded-2xl text-left border transition-all duration-200 relative overflow-hidden',
                                            level === lvl.id
                                                ? 'bg-blue-600/20 border-blue-500'
                                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                                        )}
                                    >
                                        <div className="relative z-10">
                                            <h3 className={clsx("font-semibold text-lg", level === lvl.id ? "text-blue-400" : "text-white")}>
                                                {lvl.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm mt-1">{lvl.desc}</p>
                                        </div>
                                        {level === lvl.id && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500">
                                                <Check size={24} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </motion.div>
            </div>

            <div className="pb-8">
                <button
                    onClick={() => {
                        if (step === 1 && name.trim()) setStep(2);
                        else if (step === 2) handleFinish();
                    }}
                    disabled={step === 1 && !name.trim()}
                    className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>{step === 1 ? 'Next' : "Let's Go"}</span>
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Onboarding;
