import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { styled } from 'nativewind';
import { useUser } from '../../src/context/UserContext';
import { ROUTINES } from '../../src/data/routines';
import { Flame, Play, Calendar } from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

export default function Dashboard() {
    const { user, theme } = useUser();

    if (!user) {
        router.replace('/');
        return null;
    }

    const recommendedRoutine = ROUTINES.find(r => r.level === user.level) || ROUTINES[0];
    const xpForNextLevel = 1000;
    const progress = (user.xp % xpForNextLevel) / xpForNextLevel * 100;
    const currentLevelNum = Math.floor(user.xp / xpForNextLevel) + 1;

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
                    <StyledView className="flex-row items-center bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                        <Flame size={16} color="#f97316" fill="#f97316" />
                        <StyledText className="text-orange-500 font-bold text-sm ml-1">{user.streak}</StyledText>
                    </StyledView>
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
