import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { useUser } from '../context/UserContext';

export const Layout = () => {
    const { isAuthenticated } = useUser();
    const location = useLocation();

    // Hide nav on workout player or welcome screens
    const hideNav = ['/welcome', '/onboarding'].includes(location.pathname) || location.pathname.includes('/workout/');

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-white">
            <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
                <Outlet />
            </main>
            {isAuthenticated && !hideNav && <Navigation />}
        </div>
    );
};
