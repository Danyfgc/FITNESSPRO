import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { styled } from 'nativewind';
import { ROUTINES } from '../../src/data/routines';
import { useUser } from '../../src/context/UserContext';
import { personalizeRoutine } from '../../src/utils/exercisePersonalization';
import { X, ChevronRight, ChevronLeft, Play, Pause, CheckCircle, RotateCcw } from 'lucide-react-native';
import clsx from 'clsx';
import { Audio } from 'expo-av';
import ExerciseAnimation from '../../src/components/ExerciseAnimation';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const TOTAL_SETS = 3; // Total circuit repetitions
const REST_TIME = 30; // 30 seconds rest between exercises

export default function WorkoutPlayer() {
    const { id } = useLocalSearchParams();
    const { completeWorkout, addXP, user } = useUser();

    const baseRoutine = ROUTINES.find(r => r.id === id);
    const routine = user && baseRoutine ? personalizeRoutine(baseRoutine, user) : baseRoutine;

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);

    // Timer for ALL exercises (rest between exercises)
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState(false);
    const [timerType, setTimerType] = useState<'exercise' | 'rest'>('exercise');

    const soundStartRef = useRef<Audio.Sound | null>(null);
    const soundEndRef = useRef<Audio.Sound | null>(null);
    const hasPlayedStart = useRef(false);

    if (!routine) return null;

    const currentExercise = routine.exercises[currentExerciseIndex];
    const totalExercises = routine.exercises.length;

    // Load sounds on mount
    useEffect(() => {
        async function loadSounds() {
            try {
                await Audio.setAudioModeAsync({
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: false,
                });
            } catch (error) {
                console.log('Error setting audio mode:', error);
            }
        }
        loadSounds();
    }, []);

    // Play sound function
    const playSound = async (type: 'start' | 'end') => {
        try {
            // Unload previous sounds
            if (soundStartRef.current) {
                await soundStartRef.current.unloadAsync();
                soundStartRef.current = null;
            }
            if (soundEndRef.current) {
                await soundEndRef.current.unloadAsync();
                soundEndRef.current = null;
            }

            const { sound } = await Audio.Sound.createAsync(
                type === 'start'
                    ? { uri: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg' }
                    : { uri: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg' },
                { shouldPlay: true, volume: 1.0 }
            );

            if (type === 'start') {
                soundStartRef.current = sound;
            } else {
                soundEndRef.current = sound;
            }

            // Unload after playing
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    // Initialize timer when exercise changes
    useEffect(() => {
        setIsActive(false);
        hasPlayedStart.current = false;

        if (currentExercise.duration) {
            setTimeLeft(currentExercise.duration);
            setTimerType('exercise');
        } else {
            setTimeLeft(REST_TIME);
            setTimerType('rest');
        }
    }, [currentExerciseIndex]);

    // Timer countdown logic
    useEffect(() => {
        let interval: any = null;

        if (isActive && timeLeft > 0) {
            // Play start sound only once when timer starts
            if (!hasPlayedStart.current) {
                playSound('start');
                hasPlayedStart.current = true;
            }

            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        // Play end sound
                        playSound('end');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            hasPlayedStart.current = false;
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const handleStartPause = () => {
        if (!isActive) {
            hasPlayedStart.current = false;
        }
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setIsActive(false);
        hasPlayedStart.current = false;
        if (currentExercise.duration) {
            setTimeLeft(currentExercise.duration);
            setTimerType('exercise');
        } else {
            setTimeLeft(REST_TIME);
            setTimerType('rest');
        }
    };

    const handleNext = () => {
        // Check if we're at the last exercise
        if (currentExerciseIndex < totalExercises - 1) {
            // Move to next exercise in current set
            setCurrentExerciseIndex(currentExerciseIndex + 1);
        } else {
            // Completed all exercises in this set
            if (currentSet < TOTAL_SETS) {
                // Start next set from first exercise
                setCurrentSet(currentSet + 1);
                setCurrentExerciseIndex(0);
            } else {
                // Completed all sets - finish workout
                finishWorkout();
            }
        }
    };

    const handlePrev = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
        } else if (currentSet > 1) {
            // Go to last exercise of previous set
            setCurrentSet(currentSet - 1);
            setCurrentExerciseIndex(totalExercises - 1);
        }
    };

    const finishWorkout = () => {
        setIsCompleted(true);
        completeWorkout(routine.id);
        addXP(routine.xpReward);
    };

    const canFinish = currentSet === TOTAL_SETS && currentExerciseIndex === totalExercises - 1;

    if (isCompleted) {
        return (
            <StyledView className="flex-1 bg-slate-950 items-center justify-center p-6">
                <StyledView className="bg-emerald-500/20 p-8 rounded-full mb-6">
                    <CheckCircle size={80} color="#10b981" />
                </StyledView>
                <StyledText className="text-white text-4xl font-bold mb-2">¡Rutina Completada!</StyledText>
                <StyledText className="text-slate-400 mb-4">Completaste {TOTAL_SETS} series completas</StyledText>
                <StyledText className="text-slate-400 mb-8">Ganaste {routine.xpReward} XP</StyledText>
                <StyledTouchableOpacity
                    onPress={() => router.back()}
                    className="bg-blue-600 py-4 px-8 rounded-2xl"
                >
                    <StyledText className="text-white font-bold text-lg">Volver al Inicio</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        );
    }

    return (
        <StyledView className="flex-1 bg-slate-950">
            {/* Header */}
            <StyledView className="p-4 flex-row justify-between items-center pt-12">
                <StyledTouchableOpacity onPress={() => router.back()} className="bg-white/10 p-2 rounded-full">
                    <X size={20} color="white" />
                </StyledTouchableOpacity>
                <StyledView className="items-center">
                    <StyledText className="text-slate-400 font-semibold text-sm">
                        Serie {currentSet} / {TOTAL_SETS}
                    </StyledText>
                    <StyledText className="text-slate-500 text-xs">
                        Ejercicio {currentExerciseIndex + 1} / {totalExercises}
                    </StyledText>
                </StyledView>
                <StyledView className="w-10" />
            </StyledView>

            {/* Content */}
            <StyledScrollView className="flex-1 p-6">
                <StyledView className="items-center justify-center flex-1">
                    <StyledText className="text-white text-3xl font-bold mb-4 text-center">
                        {currentExercise.name}
                    </StyledText>

                    {/* Exercise Animation */}
                    <StyledView className="mb-6">
                        <ExerciseAnimation exerciseId={currentExercise.id} />
                    </StyledView>

                    <StyledView className="bg-white/5 p-6 rounded-3xl mb-8 border border-white/10 w-full">
                        <StyledView className="flex-row justify-around mb-4">
                            <StyledView className="items-center">
                                <StyledText className="text-slate-400 text-xs uppercase tracking-wider">Reps</StyledText>
                                <StyledText className="text-white text-lg font-medium">{currentExercise.reps}</StyledText>
                            </StyledView>
                            <StyledView className="items-center">
                                <StyledText className="text-slate-400 text-xs uppercase tracking-wider">Series Totales</StyledText>
                                <StyledText className="text-white text-lg font-medium">{currentExercise.sets}</StyledText>
                            </StyledView>
                        </StyledView>
                        <StyledText className="text-slate-300 text-sm text-center leading-relaxed">
                            {currentExercise.description}
                        </StyledText>
                    </StyledView>

                    {/* Timer - Always visible */}
                    <StyledView className="mb-8 items-center">
                        <StyledText className={clsx(
                            "text-sm font-semibold mb-2",
                            timerType === 'exercise' ? "text-blue-400" : "text-yellow-400"
                        )}>
                            {timerType === 'exercise' ? '⏱️ EJERCICIO' : '😌 DESCANSO'}
                        </StyledText>
                        <StyledText className="text-white text-6xl font-mono font-bold">
                            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </StyledText>
                        <StyledView className="flex-row items-center mt-4 space-x-3">
                            <StyledTouchableOpacity
                                onPress={handleStartPause}
                                className={clsx(
                                    "px-6 py-3 rounded-full flex-row items-center",
                                    isActive ? "bg-yellow-500/20" : "bg-blue-500/20"
                                )}
                            >
                                {isActive ? (
                                    <>
                                        <Pause size={18} color="#eab308" />
                                        <StyledText className="text-yellow-500 ml-2 font-semibold">
                                            Pausar
                                        </StyledText>
                                    </>
                                ) : (
                                    <>
                                        <Play size={18} color="#3b82f6" />
                                        <StyledText className="text-blue-500 ml-2 font-semibold">Iniciar</StyledText>
                                    </>
                                )}
                            </StyledTouchableOpacity>

                            <StyledTouchableOpacity
                                onPress={handleReset}
                                className="bg-slate-700/50 p-3 rounded-full"
                            >
                                <RotateCcw size={18} color="#94a3b8" />
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </StyledScrollView>

            {/* Controls */}
            <StyledView className="p-6 bg-slate-950/80 border-t border-white/10">
                <StyledView className="flex-row items-center justify-between">
                    <StyledTouchableOpacity
                        onPress={handlePrev}
                        disabled={currentExerciseIndex === 0 && currentSet === 1}
                        className={clsx(
                            "p-4 rounded-full bg-slate-800",
                            (currentExerciseIndex === 0 && currentSet === 1) && "opacity-30"
                        )}
                    >
                        <ChevronLeft size={24} color="white" />
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        onPress={handleNext}
                        disabled={timeLeft > 0}
                        className={clsx(
                            "bg-blue-600 flex-1 mx-4 py-4 rounded-2xl flex-row items-center justify-center",
                            timeLeft > 0 && "opacity-50 bg-slate-700"
                        )}
                    >
                        <StyledText className="text-white font-bold text-lg mr-2">
                            {canFinish ? 'Finalizar Rutina' : 'Siguiente'}
                        </StyledText>
                        <ChevronRight size={20} color="white" />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </StyledView>
    );
}
