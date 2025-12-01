import { View } from 'react-native';
import { styled } from 'nativewind';
import Svg, { Circle, Line, Path, G } from 'react-native-svg';
import { useEffect, useState } from 'react';

const StyledView = styled(View);

interface ExerciseAnimationProps {
    exerciseId: string;
}

export default function ExerciseAnimation({ exerciseId }: ExerciseAnimationProps) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(prev => (prev + 1) % 2);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const renderStickFigure = () => {
        switch (exerciseId) {
            case 'ex-1': // Jumping Jacks
                return frame === 0 ? (
                    <G>
                        {/* Head */}
                        <Circle cx="100" cy="30" r="12" stroke="#60a5fa" strokeWidth="3" fill="none" />
                        {/* Body */}
                        <Line x1="100" y1="42" x2="100" y2="90" stroke="#60a5fa" strokeWidth="3" />
                        {/* Arms down */}
                        <Line x1="100" y1="50" x2="70" y2="70" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="50" x2="130" y2="70" stroke="#60a5fa" strokeWidth="3" />
                        {/* Legs together */}
                        <Line x1="100" y1="90" x2="90" y2="130" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="90" x2="110" y2="130" stroke="#60a5fa" strokeWidth="3" />
                    </G>
                ) : (
                    <G>
                        {/* Head */}
                        <Circle cx="100" cy="30" r="12" stroke="#3b82f6" strokeWidth="3" fill="none" />
                        {/* Body */}
                        <Line x1="100" y1="42" x2="100" y2="90" stroke="#3b82f6" strokeWidth="3" />
                        {/* Arms up */}
                        <Line x1="100" y1="50" x2="70" y2="30" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="50" x2="130" y2="30" stroke="#3b82f6" strokeWidth="3" />
                        {/* Legs apart */}
                        <Line x1="100" y1="90" x2="70" y2="130" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="90" x2="130" y2="130" stroke="#3b82f6" strokeWidth="3" />
                    </G>
                );

            case 'ex-2': // Squats
                return frame === 0 ? (
                    <G>
                        {/* Standing */}
                        <Circle cx="100" cy="30" r="12" stroke="#60a5fa" strokeWidth="3" fill="none" />
                        <Line x1="100" y1="42" x2="100" y2="80" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="55" x2="80" y2="65" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="55" x2="120" y2="65" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="80" x2="90" y2="120" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="80" x2="110" y2="120" stroke="#60a5fa" strokeWidth="3" />
                    </G>
                ) : (
                    <G>
                        {/* Squatting */}
                        <Circle cx="100" cy="50" r="12" stroke="#3b82f6" strokeWidth="3" fill="none" />
                        <Line x1="100" y1="62" x2="100" y2="90" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="70" x2="75" y2="75" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="70" x2="125" y2="75" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="90" x2="80" y2="110" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="90" x2="120" y2="110" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="80" y1="110" x2="70" y2="130" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="120" y1="110" x2="130" y2="130" stroke="#3b82f6" strokeWidth="3" />
                    </G>
                );

            case 'ex-3': // Push-ups
                return frame === 0 ? (
                    <G>
                        {/* Up position */}
                        <Circle cx="60" cy="60" r="12" stroke="#60a5fa" strokeWidth="3" fill="none" />
                        <Line x1="60" y1="72" x2="120" y2="72" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="40" y1="72" x2="20" y2="90" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="120" y1="72" x2="140" y2="90" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="120" y1="72" x2="140" y2="100" stroke="#60a5fa" strokeWidth="3" />
                    </G>
                ) : (
                    <G>
                        {/* Down position */}
                        <Circle cx="60" cy="75" r="12" stroke="#3b82f6" strokeWidth="3" fill="none" />
                        <Line x1="60" y1="87" x2="120" y2="87" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="40" y1="87" x2="20" y2="95" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="120" y1="87" x2="140" y2="105" stroke="#3b82f6" strokeWidth="3" />
                    </G>
                );

            case 'ex-4': // Plank
                return (
                    <G>
                        <Circle cx="50" cy="70" r="12" stroke="#60a5fa" strokeWidth="3" fill="none" />
                        <Line x1="50" y1="82" x2="130" y2="82" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="30" y1="82" x2="20" y2="95" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="130" y1="82" x2="150" y2="95" stroke="#60a5fa" strokeWidth="3" />
                    </G>
                );

            case 'ex-5': // Burpees
                return frame === 0 ? (
                    <G>
                        {/* Standing */}
                        <Circle cx="100" cy="30" r="12" stroke="#60a5fa" strokeWidth="3" fill="none" />
                        <Line x1="100" y1="42" x2="100" y2="80" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="55" x2="80" y2="65" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="55" x2="120" y2="65" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="80" x2="90" y2="120" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="80" x2="110" y2="120" stroke="#60a5fa" strokeWidth="3" />
                    </G>
                ) : (
                    <G>
                        {/* Plank position */}
                        <Circle cx="50" cy="70" r="12" stroke="#3b82f6" strokeWidth="3" fill="none" />
                        <Line x1="50" y1="82" x2="130" y2="82" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="30" y1="82" x2="20" y2="95" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="130" y1="82" x2="150" y2="95" stroke="#3b82f6" strokeWidth="3" />
                    </G>
                );

            case 'ex-6': // Mountain Climbers
                return frame === 0 ? (
                    <G>
                        <Circle cx="50" cy="60" r="12" stroke="#60a5fa" strokeWidth="3" fill="none" />
                        <Line x1="50" y1="72" x2="120" y2="72" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="30" y1="72" x2="20" y2="90" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="120" y1="72" x2="130" y2="100" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="120" y1="72" x2="100" y2="60" stroke="#60a5fa" strokeWidth="3" />
                    </G>
                ) : (
                    <G>
                        <Circle cx="50" cy="60" r="12" stroke="#3b82f6" strokeWidth="3" fill="none" />
                        <Line x1="50" y1="72" x2="120" y2="72" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="30" y1="72" x2="20" y2="90" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="120" y1="72" x2="100" y2="60" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="120" y1="72" x2="130" y2="100" stroke="#3b82f6" strokeWidth="3" />
                    </G>
                );

            case 'ex-7': // Lunges
                return frame === 0 ? (
                    <G>
                        <Circle cx="100" cy="30" r="12" stroke="#60a5fa" strokeWidth="3" fill="none" />
                        <Line x1="100" y1="42" x2="100" y2="80" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="55" x2="80" y2="65" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="55" x2="120" y2="65" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="80" x2="80" y2="120" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="80" x2="120" y2="100" stroke="#60a5fa" strokeWidth="3" />
                    </G>
                ) : (
                    <G>
                        <Circle cx="100" cy="30" r="12" stroke="#3b82f6" strokeWidth="3" fill="none" />
                        <Line x1="100" y1="42" x2="100" y2="80" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="55" x2="80" y2="65" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="55" x2="120" y2="65" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="80" x2="120" y2="120" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="80" x2="80" y2="100" stroke="#3b82f6" strokeWidth="3" />
                    </G>
                );

            case 'ex-8': // Jump Squats
                return frame === 0 ? (
                    <G>
                        <Circle cx="100" cy="50" r="12" stroke="#60a5fa" strokeWidth="3" fill="none" />
                        <Line x1="100" y1="62" x2="100" y2="90" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="70" x2="75" y2="75" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="70" x2="125" y2="75" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="90" x2="80" y2="110" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="90" x2="120" y2="110" stroke="#60a5fa" strokeWidth="3" />
                    </G>
                ) : (
                    <G>
                        <Circle cx="100" cy="20" r="12" stroke="#3b82f6" strokeWidth="3" fill="none" />
                        <Line x1="100" y1="32" x2="100" y2="60" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="45" x2="80" y2="35" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="45" x2="120" y2="35" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="60" x2="95" y2="80" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="60" x2="105" y2="80" stroke="#3b82f6" strokeWidth="3" />
                    </G>
                );

            case 'ex-9': // Diamond Push-ups
                return frame === 0 ? (
                    <G>
                        <Circle cx="60" cy="60" r="12" stroke="#60a5fa" strokeWidth="3" fill="none" />
                        <Line x1="60" y1="72" x2="120" y2="72" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="50" y1="72" x2="35" y2="90" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="120" y1="72" x2="140" y2="90" stroke="#60a5fa" strokeWidth="3" />
                        {/* Diamond hands */}
                        <Path d="M 35 90 L 40 85 L 45 90 L 40 95 Z" stroke="#60a5fa" strokeWidth="2" fill="none" />
                    </G>
                ) : (
                    <G>
                        <Circle cx="60" cy="75" r="12" stroke="#3b82f6" strokeWidth="3" fill="none" />
                        <Line x1="60" y1="87" x2="120" y2="87" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="50" y1="87" x2="35" y2="95" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="120" y1="87" x2="140" y2="105" stroke="#3b82f6" strokeWidth="3" />
                        <Path d="M 35 95 L 40 90 L 45 95 L 40 100 Z" stroke="#3b82f6" strokeWidth="2" fill="none" />
                    </G>
                );

            case 'ex-10': // High Knees
                return frame === 0 ? (
                    <G>
                        <Circle cx="100" cy="30" r="12" stroke="#60a5fa" strokeWidth="3" fill="none" />
                        <Line x1="100" y1="42" x2="100" y2="70" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="50" x2="80" y2="60" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="50" x2="120" y2="60" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="70" x2="90" y2="50" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="70" x2="110" y2="110" stroke="#60a5fa" strokeWidth="3" />
                    </G>
                ) : (
                    <G>
                        <Circle cx="100" cy="30" r="12" stroke="#3b82f6" strokeWidth="3" fill="none" />
                        <Line x1="100" y1="42" x2="100" y2="70" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="50" x2="80" y2="60" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="50" x2="120" y2="60" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="70" x2="110" y2="50" stroke="#3b82f6" strokeWidth="3" />
                        <Line x1="100" y1="70" x2="90" y2="110" stroke="#3b82f6" strokeWidth="3" />
                    </G>
                );

            default:
                return (
                    <G>
                        <Circle cx="100" cy="30" r="12" stroke="#60a5fa" strokeWidth="3" fill="none" />
                        <Line x1="100" y1="42" x2="100" y2="80" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="55" x2="80" y2="65" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="55" x2="120" y2="65" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="80" x2="90" y2="120" stroke="#60a5fa" strokeWidth="3" />
                        <Line x1="100" y1="80" x2="110" y2="120" stroke="#60a5fa" strokeWidth="3" />
                    </G>
                );
        }
    };

    return (
        <StyledView className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <Svg width="200" height="140" viewBox="0 0 200 140">
                {renderStickFigure()}
            </Svg>
        </StyledView>
    );
}
