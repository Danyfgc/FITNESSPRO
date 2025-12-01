import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950 -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center space-y-6 max-w-md"
            >
                <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-4">
                    <Activity size={40} className="text-white" />
                </div>

                <h1 className="text-4xl font-bold tracking-tight">
                    Fitness <span className="text-gradient">Pro</span>
                </h1>

                <p className="text-slate-400 text-lg leading-relaxed">
                    Your personal path to a healthier lifestyle.
                    Smart routines, progress tracking, and daily motivation.
                </p>

                <div className="pt-8 w-full">
                    <button
                        onClick={() => navigate('/onboarding')}
                        className="btn-primary w-full flex items-center justify-center space-x-2 group"
                    >
                        <span>Get Started</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Welcome;
