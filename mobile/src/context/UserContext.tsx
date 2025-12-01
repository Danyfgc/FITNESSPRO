import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserLevel = 'beginner' | 'intermediate' | 'advanced';
export type Gender = 'male' | 'female' | 'other';
export type Theme = 'dark' | 'light';

export interface UserProfile {
    name: string;
    age: number;
    weight: number;
    height: number;
    gender: Gender;
    level: UserLevel;
    xp: number;
    completedWorkouts: string[];
    streak: number;
    lastWorkoutDate: string | null;
    theme: Theme;
}

interface UserContextType {
    user: UserProfile | null;
    isAuthenticated: boolean;
    theme: Theme;
    createProfile: (name: string, age: number, weight: number, height: number, gender: Gender, level: UserLevel) => void;
    updateProfile: (updates: Partial<UserProfile>) => void;
    addXP: (amount: number) => void;
    completeWorkout: (routineId: string) => void;
    toggleTheme: () => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const INITIAL_USER: UserProfile = {
    name: '',
    age: 0,
    weight: 0,
    height: 0,
    gender: 'other',
    level: 'beginner',
    xp: 0,
    completedWorkouts: [],
    streak: 0,
    lastWorkoutDate: null,
    theme: 'dark',
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (user) {
            AsyncStorage.setItem('fitness_user', JSON.stringify(user));
            setTheme(user.theme);
        } else {
            AsyncStorage.removeItem('fitness_user');
        }
    }, [user]);

    const loadUser = async () => {
        try {
            const saved = await AsyncStorage.getItem('fitness_user');
            if (saved) {
                const userData = JSON.parse(saved);
                setUser(userData);
                setTheme(userData.theme || 'dark');
            }
        } catch (error) {
            console.error('Error loading user:', error);
        }
    };

    const createProfile = (name: string, age: number, weight: number, height: number, gender: Gender, level: UserLevel) => {
        setUser({
            ...INITIAL_USER,
            name,
            age,
            weight,
            height,
            gender,
            level,
        });
    };

    const updateProfile = (updates: Partial<UserProfile>) => {
        if (!user) return;
        setUser((prev) => {
            if (!prev) return null;
            return { ...prev, ...updates };
        });
    };

    const toggleTheme = () => {
        const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        if (user) {
            setUser({ ...user, theme: newTheme });
        }
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
            theme,
            createProfile,
            updateProfile,
            addXP,
            completeWorkout,
            toggleTheme,
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
