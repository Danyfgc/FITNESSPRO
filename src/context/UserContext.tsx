import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
    name: string;
    level: UserLevel;
    xp: number;
    completedWorkouts: string[]; // IDs of completed routines
    streak: number;
    lastWorkoutDate: string | null;
}

interface UserContextType {
    user: UserProfile | null;
    isAuthenticated: boolean;
    createProfile: (name: string, level: UserLevel) => void;
    addXP: (amount: number) => void;
    completeWorkout: (routineId: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const INITIAL_USER: UserProfile = {
    name: '',
    level: 'beginner',
    xp: 0,
    completedWorkouts: [],
    streak: 0,
    lastWorkoutDate: null,
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(() => {
        const saved = localStorage.getItem('fitness_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('fitness_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('fitness_user');
        }
    }, [user]);

    const createProfile = (name: string, level: UserLevel) => {
        setUser({
            ...INITIAL_USER,
            name,
            level,
        });
    };

    const addXP = (amount: number) => {
        if (!user) return;
        setUser((prev) => {
            if (!prev) return null;
            return { ...prev, xp: prev.xp + amount };
        });
    };

    const completeWorkout = (routineId: string) => {
        if (!user) return;
        const today = new Date().toISOString().split('T')[0];

        setUser((prev) => {
            if (!prev) return null;

            const isNewDay = prev.lastWorkoutDate !== today;
            const newStreak = isNewDay ? prev.streak + 1 : prev.streak;

            return {
                ...prev,
                completedWorkouts: [...prev.completedWorkouts, routineId],
                lastWorkoutDate: today,
                streak: newStreak,
            };
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{
            user,
            isAuthenticated: !!user,
            createProfile,
            addXP,
            completeWorkout,
            logout
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
