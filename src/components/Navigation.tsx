import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, User, Trophy } from 'lucide-react';
import clsx from 'clsx';

export const Navigation = () => {
    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Dumbbell, label: 'Workouts', path: '/routines' },
        { icon: Trophy, label: 'Awards', path: '/achievements' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav pb-safe">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                'flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200',
                                isActive ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
                            )
                        }
                    >
                        <item.icon size={24} strokeWidth={2} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};
