import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { styled } from 'nativewind';
import { ROUTINES } from '../../src/data/routines';
import { Clock, Zap, ChevronRight } from 'lucide-react-native';
import clsx from 'clsx';
import { useUser } from '../../src/context/UserContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const FILTERS = [
    { id: 'all', label: 'Todas' },
    { id: 'beginner', label: 'Principiante' },
    { id: 'intermediate', label: 'Intermedio' },
    { id: 'advanced', label: 'Avanzado' },
];

export default function Routines() {
    const { theme } = useUser();
    const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

    const filteredRoutines = filter === 'all'
        ? ROUTINES
        : ROUTINES.filter(r => r.level === filter);

    const bgColor = theme === 'dark' ? 'bg-slate-950' : 'bg-white';
    const textColor = theme === 'dark' ? 'text-white' : 'text-slate-950';
    const secondaryTextColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
    const cardBg = theme === 'dark' ? 'bg-white/5' : 'bg-slate-100';
    const borderColor = theme === 'dark' ? 'border-white/10' : 'border-slate-200';
    const filterBg = theme === 'dark' ? 'bg-slate-900' : 'bg-slate-200';
    const filterActiveBg = theme === 'dark' ? 'bg-white' : 'bg-blue-600';
    const filterActiveText = theme === 'dark' ? 'text-slate-950' : 'text-white';
    const filterInactiveText = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';

    return (
        <StyledView className={`flex-1 ${bgColor}`}>
            <StyledScrollView className="p-6 pb-24">
                <StyledText className={`${textColor} text-3xl font-bold mb-6 pt-12`}>Rutinas</StyledText>

                {/* Filters */}
                <StyledScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                    {FILTERS.map((f) => (
                        <StyledTouchableOpacity
                            key={f.id}
                            onPress={() => setFilter(f.id as any)}
                            className={clsx(
                                'px-4 py-2 rounded-full mr-2',
                                filter === f.id
                                    ? filterActiveBg
                                    : filterBg
                            )}
                        >
                            <StyledText className={clsx(
                                'text-sm font-medium',
                                filter === f.id ? filterActiveText : filterInactiveText
                            )}>
                                {f.label}
                            </StyledText>
                        </StyledTouchableOpacity>
                    ))}
                </StyledScrollView>

                {/* List */}
                <StyledView className="space-y-4">
                    {filteredRoutines.map((routine) => (
                        <StyledTouchableOpacity
                            key={routine.id}
                            onPress={() => router.push(`/workout/${routine.id}`)}
                            className={`${cardBg} p-4 rounded-2xl flex-row items-center justify-between border ${borderColor} mb-4`}
                        >
                            <StyledView className="flex-1">
                                <StyledText className={`${textColor} font-bold text-lg mb-1`}>{routine.title}</StyledText>
                                <StyledView className="flex-row items-center space-x-4">
                                    <StyledView className="flex-row items-center mr-4">
                                        <Clock size={14} color={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                                        <StyledText className={`${secondaryTextColor} text-sm ml-1`}>{routine.duration} min</StyledText>
                                    </StyledView>
                                    <StyledView className="flex-row items-center">
                                        <Zap size={14} color={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                                        <StyledText className={`${secondaryTextColor} text-sm ml-1`}>{routine.xpReward} XP</StyledText>
                                    </StyledView>
                                </StyledView>
                            </StyledView>
                            <StyledView className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'} p-2 rounded-full`}>
                                <ChevronRight size={20} color={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                            </StyledView>
                        </StyledTouchableOpacity>
                    ))}
                </StyledView>
            </StyledScrollView>
        </StyledView>
    );
}
