import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { styled } from 'nativewind';
import { useUser } from '../../src/context/UserContext';
import { ROUTINES } from '../../src/data/routines';
import { getStreakPhase } from '../../src/utils/streakUtils';
import { calculateIdealWeight } from '../../src/utils/nutritionUtils';
import { registerForPushNotificationsAsync, scheduleWaterReminders } from '../../src/utils/notificationUtils';
import WaterBottle from '../../src/components/WaterBottle';
import { Flame, Play, Calendar, Plus, Droplets } from 'lucide-react-native';
import { useEffect } from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

export default function Dashboard() {
    const { user, theme, addWater } = useUser();

    useEffect(() => {
        registerForPushNotificationsAsync();
        scheduleWaterReminders();
    }, []);

    if (!user) {
        router.replace('/');
        return null;
    }

    const streakPhase = getStreakPhase(user.streak);
    const today = new Date().toISOString().split('T')[0];
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomValue = Math.sin(seed) * 10000;
    const deterministicRandom = randomValue - Math.floor(randomValue);

    const levelRoutines = ROUTINES.filter(r => r.level === user.level);
    const recommendedRoutine = levelRoutines[Math.floor(deterministicRandom * levelRoutines.length)] || ROUTINES[0];
    const xpForNextLevel = 1000;
    const progress = (user.xp % xpForNextLevel) / xpForNextLevel * 100;
    const currentLevelNum = Math.floor(user.xp / xpForNextLevel) + 1;

    // Weight Logic
    const idealWeight = calculateIdealWeight(user.height, user.gender);
    const isWeightLoss = user.weight > idealWeight.max;
    const targetWeight = isWeightLoss ? idealWeight.max : idealWeight.min;
    const weightDiff = Math.abs(user.weight - targetWeight);
    const weightProgress = Math.min(100, Math.max(0, ((user.weight - idealWeight.max) / (user.weight - idealWeight.min)) * 100));

    const bgColor = theme === 'dark' ? 'bg-slate-950' : 'bg-white';
    const textColor = theme === 'dark' ? 'text-white' : 'text-slate-950';
    const secondaryTextColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
    const cardBg = theme === 'dark' ? 'bg-white/5' : 'bg-slate-100';
    const borderColor = theme === 'dark' ? 'border-white/10' : 'border-slate-200';

    return (
        <StyledScrollView className={`flex-1 ${bgColor}`}>
            <StyledView className="p-6 space-y-8 pb-24">
                {/* Header */}
                <StyledView className="flex-row justify-between items-start pt-12">
                    <StyledView>
                        <StyledText className={`${secondaryTextColor} text-sm`}>Bienvenido de nuevo,</StyledText>
                        <StyledText className={`${textColor} text-3xl font-bold`}>{user.name}</StyledText>
                    </StyledView>
                    <StyledTouchableOpacity
                        onPress={() => router.push('/streak')}
                        className={`flex-row items-center ${streakPhase.bgColor} px-3 py-1 rounded-full border ${streakPhase.borderColor}`}
                    >
                        <Flame size={16} color={streakPhase.color} fill={streakPhase.color} />
                        <StyledText className={`${streakPhase.textColor} font-bold text-sm ml-1`}>{user.streak}</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>

                {/* Level Card */}
                <StyledView className={`${cardBg} p-6 rounded-3xl border ${borderColor}`}>
                    <StyledView className="flex-row justify-between items-end mb-2">
                        <StyledView>
                            <StyledText className={`${secondaryTextColor} text-sm font-medium`}>Nivel Actual</StyledText>
                            <StyledText className={`${textColor} text-2xl font-bold`}>Nivel {currentLevelNum} • {user.level}</StyledText>
                        </StyledView>
                        <StyledText className="text-blue-400 text-sm font-mono">{user.xp} XP</StyledText>
                    </StyledView>

                    <StyledView className={`h-2 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'} rounded-full overflow-hidden`}>
                        <StyledView className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
                    </StyledView>
                    <StyledText className={`${secondaryTextColor} text-xs mt-2 text-right`}>
                        {Math.round(xpForNextLevel - (user.xp % xpForNextLevel))} XP para el siguiente nivel
                    </StyledText>
                </StyledView>

                {/* Weight & Water Row */}
                <StyledView className="flex-row space-x-4">
                    {/* Weight Card */}
                    <StyledView className={`flex-1 ${cardBg} p-4 rounded-3xl border ${borderColor} justify-between`}>
                        <StyledView>
                            <StyledText className={`${secondaryTextColor} text-xs font-bold uppercase mb-2`}>Peso Ideal</StyledText>
                            <StyledText className={`${textColor} text-xl font-bold`}>{user.weight} kg</StyledText>
                            <StyledText className="text-slate-500 text-xs mb-3">Meta: {targetWeight} kg</StyledText>
                        </StyledView>

                        <StyledView>
                            <StyledView className="h-2 bg-slate-800 rounded-full overflow-hidden mb-1">
                                <StyledView
                                    className="h-full bg-emerald-500"
                                    style={{ width: `${isWeightLoss ? 60 : 40}%` }} // Simplified visual
                                />
                            </StyledView>
                            <StyledText className="text-emerald-500 text-xs font-bold">
                                {isWeightLoss ? `-${weightDiff.toFixed(1)} kg` : 'En rango'}
                            </StyledText>
                        </StyledView>
                    </StyledView>

                    {/* Water Tracker */}
                    <StyledView className={`flex-1 ${cardBg} p-4 rounded-3xl border ${borderColor} items-center`}>
                        <StyledView className="flex-row items-center mb-2 w-full justify-between">
                            <StyledText className={`${secondaryTextColor} text-xs font-bold uppercase`}>Agua</StyledText>
                            <Droplets size={14} color="#3b82f6" />
                        </StyledView>

                        <WaterBottle current={user.waterIntake || 0} goal={2500} />

                        <StyledTouchableOpacity
                            onPress={() => addWater(250)}
                            className="mt-3 bg-blue-500/20 px-3 py-2 rounded-full flex-row items-center w-full justify-center"
                        >
                            <Plus size={14} color="#3b82f6" />
                            <StyledText className="text-blue-400 text-xs font-bold ml-1">+250ml</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>

                {/* Daily Pick */}
                <StyledView>
                    <StyledView className="flex-row items-center mb-4">
                        <Calendar size={20} color="#60a5fa" />
                        <StyledText className={`${textColor} text-lg font-semibold ml-2`}>Recomendado Hoy</StyledText>
                    </StyledView>

                    <StyledTouchableOpacity
                        onPress={() => router.push(`/workout/${recommendedRoutine.id}`)}
                        className={`${cardBg} p-5 rounded-2xl border ${borderColor}`}
                    >
                        <StyledView className="flex-row justify-between items-start mb-4">
                            <StyledView className="bg-blue-500/20 px-2 py-1 rounded-lg">
                                <StyledText className="text-blue-400 text-xs font-bold uppercase">
                                    {recommendedRoutine.level}
                                </StyledText>
                            </StyledView>
                            <StyledText className="text-slate-400 text-sm">{recommendedRoutine.duration} min</StyledText>
                        </StyledView>

                        <StyledText className={`${textColor} text-xl font-bold mb-1`}>
                            {recommendedRoutine.title}
                        </StyledText>
                        <StyledText className={`${secondaryTextColor} text-sm mb-4`}>
                            {recommendedRoutine.exercises.length} ejercicios • +{recommendedRoutine.xpReward} XP
                        </StyledText>

                        <StyledView className="flex-row items-center">
                            <StyledText className={`${textColor} text-sm font-semibold`}>Iniciar Rutina</StyledText>
                            <Play size={16} color={theme === 'dark' ? 'white' : '#020617'} fill={theme === 'dark' ? 'white' : '#020617'} style={{ marginLeft: 8 }} />
                        </StyledView>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </StyledScrollView>
    );
}
