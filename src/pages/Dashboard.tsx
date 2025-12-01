import React from 'react';
import { useUser } from '../context/UserContext';
import { ROUTINES } from '../data/routines';
import { useNavigate } from 'react-router-dom';
import { Flame, Trophy, Play, Calendar } from 'lucide-react';

const Dashboard = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    if (!user) return null;

    // Find a recommended routine based on level
    const recommendedRoutine = ROUTINES.find(r => r.level === user.level) || ROUTINES[0];

    // Calculate progress to next level (mock logic: 1000 XP per level)
    const xpForNextLevel = 1000;
    const progress = (user.xp % xpForNextLevel) / xpForNextLevel * 100;
    const currentLevelNum = Math.floor(user.xp / xpForNextLevel) + 1;

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-400 text-sm">Welcome back,</p>
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                </div>
                <div className="flex items-center space-x-1 bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full border border-orange-500/20">
                    <Flame size={16} fill="currentColor" />
                    <span className="font-bold text-sm">{user.streak}</span>
                </div>
            </div>

            {/* Level Card */}
            <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Trophy size={100} />
                </div>

                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <p className="text-slate-400 text-sm font-medium">Current Level</p>
                            <h2 className="text-2xl font-bold text-white">Lvl {currentLevelNum} • {user.level}</h2>
                        </div>
                        <span className="text-sm font-mono text-blue-400">{user.xp} XP</span>
                    </div>

                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-right">
                        {Math.round(xpForNextLevel - (user.xp % xpForNextLevel))} XP to next level
                    </p>
                </div>
            </div>

            {/* Daily Pick */}
            <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-blue-400" />
                    Today's Pick
                </h3>

                <div
                    onClick={() => navigate(`/workout/${recommendedRoutine.id}`)}
                    className="glass-panel p-5 rounded-2xl card-hover cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wider">
                            {recommendedRoutine.level}
                        </span>
                        <span className="text-slate-400 text-sm">{recommendedRoutine.duration} min</span>
                    </div>

                    <h4 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">
                        {recommendedRoutine.title}
                    </h4>
                    <p className="text-slate-400 text-sm mb-4">
                        {recommendedRoutine.exercises.length} exercises • +{recommendedRoutine.xpReward} XP
                    </p>

                    <div className="flex items-center text-sm font-semibold text-white group-hover:translate-x-2 transition-transform duration-200">
                        Start Workout <Play size={16} className="ml-2 fill-current" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
