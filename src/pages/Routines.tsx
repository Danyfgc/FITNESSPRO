import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTINES } from '../data/routines';
import { Clock, Zap, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const Routines = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

    const filteredRoutines = filter === 'all'
        ? ROUTINES
        : ROUTINES.filter(r => r.level === filter);

    return (
        <div className="p-6 pb-24">
            <h1 className="text-3xl font-bold mb-6">Workouts</h1>

            {/* Filters */}
            <div className="flex space-x-2 overflow-x-auto no-scrollbar mb-8 pb-2">
                {['all', 'beginner', 'intermediate', 'advanced'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={clsx(
                            'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                            filter === f
                                ? 'bg-white text-slate-950'
                                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                        )}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredRoutines.map((routine) => (
                    <div
                        key={routine.id}
                        onClick={() => navigate(`/workout/${routine.id}`)}
                        className="glass-panel p-4 rounded-2xl flex items-center justify-between cursor-pointer card-hover"
                    >
                        <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">{routine.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-slate-400">
                                <span className="flex items-center">
                                    <Clock size={14} className="mr-1" /> {routine.duration} min
                                </span>
                                <span className="flex items-center">
                                    <Zap size={14} className="mr-1" /> {routine.xpReward} XP
                                </span>
                            </div>
                        </div>
                        <div className="bg-slate-800 p-2 rounded-full text-slate-400">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Routines;
