import { View, Text, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { styled } from 'nativewind';
import { Activity, ArrowRight } from 'lucide-react-native';
import { useUser } from '../src/context/UserContext';
import { useEffect } from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function Welcome() {
    const { isAuthenticated } = useUser();

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/(tabs)');
        }
    }, [isAuthenticated]);

    return (
        <StyledView className="flex-1 bg-slate-950 items-center justify-center p-6">
            <StyledView className="w-20 h-20 bg-blue-500 rounded-3xl items-center justify-center mb-6 shadow-lg">
                <Activity size={40} color="white" />
            </StyledView>

            <StyledText className="text-4xl font-bold text-white mb-2">
                Fitness <StyledText className="text-blue-400">Pro</StyledText>
            </StyledText>

            <StyledText className="text-slate-400 text-lg text-center mb-12">
                Tu camino personal hacia un estilo de vida más saludable.
            </StyledText>

            <Link href="/onboarding" asChild>
                <StyledTouchableOpacity className="bg-blue-600 w-full py-4 rounded-2xl flex-row items-center justify-center space-x-2 active:bg-blue-700">
                    <StyledText className="text-white font-bold text-lg mr-2">Comenzar</StyledText>
                    <ArrowRight size={20} color="white" />
                </StyledTouchableOpacity>
            </Link>
        </StyledView>
    );
}
