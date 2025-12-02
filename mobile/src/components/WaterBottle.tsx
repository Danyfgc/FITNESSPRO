import { View, Text, Animated, Easing } from 'react-native';
import { styled } from 'nativewind';
import { useEffect, useRef } from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledAnimatedView = styled(Animated.View);

interface WaterBottleProps {
    current: number; // in ml
    goal: number; // in ml
}

export default function WaterBottle({ current, goal }: WaterBottleProps) {
    const fillAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const percentage = Math.min(Math.max(current / goal, 0), 1);

        Animated.timing(fillAnim, {
            toValue: percentage,
            duration: 1000,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false, // width/height changes not supported by native driver
        }).start();
    }, [current, goal]);

    return (
        <StyledView className="items-center justify-center">
            {/* Bottle Shape */}
            <StyledView className="w-24 h-40 bg-slate-800/50 rounded-3xl border-4 border-slate-600 overflow-hidden relative">
                {/* Cap */}
                <StyledView className="absolute -top-1 left-1/2 -ml-4 w-8 h-4 bg-slate-500 rounded-t-lg" />

                {/* Water */}
                <StyledAnimatedView
                    className="absolute bottom-0 left-0 right-0 bg-blue-500/80"
                    style={{
                        height: fillAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%']
                        })
                    }}
                />

                {/* Measurement Lines */}
                <StyledView className="absolute inset-0 justify-evenly opacity-30">
                    <StyledView className="h-px bg-white w-full" />
                    <StyledView className="h-px bg-white w-full" />
                    <StyledView className="h-px bg-white w-full" />
                </StyledView>
            </StyledView>

            {/* Text Overlay */}
            <StyledView className="absolute">
                <StyledText className="text-white font-bold text-lg shadow-lg">
                    {Math.round(current / 100) / 10}L
                </StyledText>
            </StyledView>
        </StyledView>
    );
}
