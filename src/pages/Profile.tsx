import React from 'react';
import { useUser } from '../context/UserContext';
import { LogOut, Award, Calendar, Activity } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useUser();

    if (!user) return null;

    const stats = [
        { label: 'Workouts', value: user.completedWorkouts.length, icon: Activity },
        { label: 'Streak', value: `${user.streak} days`, icon: Calendar },
        { label: 'Total XP', value: user.xp, icon: Award },
    ];

    return (
        <div className="p-6 pb-24">
            <h1 className="text-3xl font-bold mb-8">Profile</h1>

            <div className="flex items-center space-x-4 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-blue-400 font-medium capitalize">{user.level}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="glass-panel p-4 rounded-2xl text-center">
                        <stat.icon size={20} className="mx-auto mb-2 text-slate-400" />
                        <div className="font-bold text-lg">{stat.value}</div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-400">Settings</h3>

                <button
                    onClick={logout}
                    className="w-full p-4 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-between hover:bg-red-500/20 transition-colors"
                >
                    <span className="font-medium">Sign Out</span>
                    <LogOut size={20} />
                </button>
            </div>
        </div>
    );
};

export default Profile;
