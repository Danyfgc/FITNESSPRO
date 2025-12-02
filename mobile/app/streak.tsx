import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { useUser } from '../src/context/UserContext';
import { getStreakPhase } from '../src/utils/streakUtils';
import { Flame, X, Trophy } from 'lucide-react-native';
import { useEffect, useRef } from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledAnimatedView = styled(Animated.View);

export default function StreakScreen() {
    const router = useRouter();
    const { user } = useUser();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    if (!user) return null;

    const phase = getStreakPhase(user.streak);
    const nextPhaseDays = phase.nextPhaseDays;
    const progress = nextPhaseDays
        ? ((user.streak - phase.minDays) / (nextPhaseDays - phase.minDays)) * 100
        : 100;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1 + (phase.intensity * 0.05),
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();

        return () => pulse.stop();
    }, [phase.intensity]);

    return (
        <StyledView className="flex-1 bg-black/80 justify-center items-center p-6">
            <StyledView className="w-full bg-slate-900 rounded-3xl p-8 items-center border border-white/10 relative overflow-hidden">
                {/* Close Button */}
                <StyledTouchableOpacity
                    onPress={() => router.back()}
                    className="absolute top-4 right-4 z-10 bg-white/10 p-2 rounded-full"
                >
                    <X size={20} color="white" />
                </StyledTouchableOpacity>

                {/* Animated Flame */}
                <StyledAnimatedView
                    style={{
                        transform: [{ scale: scaleAnim }],
                        shadowColor: phase.color,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 20 * phase.intensity,
                    }}
                    className="mb-8 mt-4"
                >
                    <Flame size={120} color={phase.color} fill={phase.color} />
                </StyledAnimatedView>

                {/* Streak Count */}
                <StyledText className="text-white text-6xl font-bold mb-2">
                    {user.streak}
                </StyledText>
                <StyledText className="text-slate-400 text-lg font-medium mb-6 uppercase tracking-widest">
                    Días en Racha
                </StyledText>

                {/* Phase Info */}
                <StyledView className={`px-4 py-2 rounded-full mb-4 ${phase.bgColor} border ${phase.borderColor}`}>
                    <StyledText className={`${phase.textColor} font-bold text-lg`}>
                        {phase.name}
                    </StyledText>
                </StyledView>

                <StyledText className="text-slate-300 text-center mb-8 leading-relaxed">
                    {phase.description}
                </StyledText>

                {/* Progress to Next Phase */}
                {nextPhaseDays && (
                    <StyledView className="w-full bg-slate-800 rounded-full h-12 relative justify-center overflow-hidden mb-4">
                        <StyledView
                            className={`absolute left-0 top-0 bottom-0 ${phase.bgColor.replace('/10', '')}`}
                            style={{ width: `${progress}%`, opacity: 0.3 }}
                        />
                        <StyledView className="flex-row justify-between items-center px-6 z-10">
                            <StyledText className="text-white font-bold text-sm">Próximo Nivel</StyledText>
                            <StyledText className="text-white font-bold text-sm">{nextPhaseDays} días</StyledText>
                        </StyledView>
                    </StyledView>
                )}

                {!nextPhaseDays && (
                    <StyledView className="flex-row items-center bg-blue-500/20 px-6 py-3 rounded-2xl border border-blue-500/30">
                        <Trophy size={24} color="#60a5fa" />
                        <StyledText className="text-blue-400 font-bold ml-3">¡Nivel Máximo Alcanzado!</StyledText>
                    </StyledView>
                )}
            </StyledView>
        </StyledView>
    );
}
