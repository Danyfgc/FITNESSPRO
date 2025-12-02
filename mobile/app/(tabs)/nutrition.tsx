import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { styled } from 'nativewind';
import { useUser } from '../../src/context/UserContext';
import { calculateIdealWeight, calculateDailyCalories, generateDailyPlan } from '../../src/utils/nutritionUtils';
import { useEffect, useState, useRef } from 'react';
import { Utensils, CheckCircle, Target, Info, Crown, PartyPopper } from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledAnimatedView = styled(Animated.View);

export default function NutritionScreen() {
    const { user, theme, updateProfile } = useUser();
    const [mealPlan, setMealPlan] = useState<any[]>([]);
    const [eatenMeals, setEatenMeals] = useState<string[]>([]);
    const progressAnim = useRef(new Animated.Value(0)).current;

    if (!user) return null;

    const idealWeight = calculateIdealWeight(user.height, user.gender);
    const dailyCalories = calculateDailyCalories(user);
    const weightProgress = Math.min(100, Math.max(0, ((user.weight - idealWeight.max) / (user.weight - idealWeight.min)) * 100)); // Simplified progress logic

    // Reverse progress logic: if weight > max, progress is how close to max. 
    // If weight < min, progress is how close to min.
    // For now, let's assume weight loss goal for simplicity or just show current vs target range.

    const isWeightLoss = user.weight > idealWeight.max;
    const isInIdealRange = user.weight >= idealWeight.min && user.weight <= idealWeight.max;
    const targetWeight = isWeightLoss ? idealWeight.max : idealWeight.min;
    const weightDiff = Math.abs(user.weight - targetWeight);

    // Check if goal is newly achieved
    useEffect(() => {
        if (isInIdealRange && !user.goalAchieved) {
            updateProfile({ goalAchieved: true });
        }
    }, [isInIdealRange, user.goalAchieved]);

    useEffect(() => {
        setMealPlan(generateDailyPlan(dailyCalories));

        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
        }).start();
    }, []);

    const toggleMeal = (mealId: string) => {
        if (eatenMeals.includes(mealId)) {
            setEatenMeals(eatenMeals.filter(id => id !== mealId));
        } else {
            setEatenMeals([...eatenMeals, mealId]);
        }
    };

    const bgColor = theme === 'dark' ? 'bg-slate-950' : 'bg-white';
    const textColor = theme === 'dark' ? 'text-white' : 'text-slate-950';
    const cardBg = theme === 'dark' ? 'bg-white/5' : 'bg-slate-100';
    const borderColor = theme === 'dark' ? 'border-white/10' : 'border-slate-200';

    return (
        <StyledScrollView className={`flex-1 ${bgColor} p-6`}>
            <StyledView className="pt-12 pb-24 space-y-8">
                {/* Header */}
                <StyledView>
                    <StyledText className={`${textColor} text-3xl font-bold mb-2`}>Nutrición</StyledText>
                    <StyledText className="text-slate-400">Tu plan personalizado</StyledText>
                </StyledView>

                {/* Goal Achievement Banner */}
                {isInIdealRange && (
                    <StyledView className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 p-6 rounded-3xl border-2 border-amber-500">
                        <StyledView className="flex-row items-center justify-center mb-2">
                            <Crown size={32} color="#fbbf24" fill="#fbbf24" />
                            <PartyPopper size={32} color="#fbbf24" style={{ marginLeft: 8 }} />
                        </StyledView>
                        <StyledText className="text-amber-400 text-2xl font-bold text-center mb-2">¡Felicidades!</StyledText>
                        <StyledText className="text-amber-300 text-center font-medium">
                            ¡Has alcanzado tu peso ideal! Mantén este excelente progreso.
                        </StyledText>
                    </StyledView>
                )}

                {/* Weight Goal Card */}
                <StyledView className={`${cardBg} p-6 rounded-3xl border ${borderColor}`}>
                    <StyledView className="flex-row justify-between items-center mb-6">
                        <StyledView>
                            <StyledText className="text-slate-400 text-sm font-medium mb-1">Peso Actual</StyledText>
                            <StyledText className={`${textColor} text-2xl font-bold`}>{user.weight} kg</StyledText>
                        </StyledView>
                        <StyledView className="items-end">
                            <StyledText className="text-blue-400 text-sm font-medium mb-1">Peso Ideal</StyledText>
                            <StyledText className="text-blue-400 text-2xl font-bold">{idealWeight.min} - {idealWeight.max} kg</StyledText>
                        </StyledView>
                    </StyledView>

                    {/* Progress Bar */}
                    <StyledView className="h-4 bg-slate-800 rounded-full overflow-hidden mb-2 relative">
                        <StyledAnimatedView
                            className="h-full bg-blue-500 rounded-full absolute left-0"
                            style={{
                                width: progressAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', isWeightLoss ? '60%' : '40%'] // Mock progress for visual
                                })
                            }}
                        />
                    </StyledView>
                    <StyledText className="text-slate-500 text-xs text-center">
                        {isWeightLoss ? `Te faltan ${weightDiff.toFixed(1)} kg para tu meta` : '¡Estás en tu rango ideal!'}
                    </StyledText>
                </StyledView>

                {/* Daily Targets */}
                <StyledView className="flex-row justify-between space-x-4">
                    <StyledView className={`flex-1 ${cardBg} p-4 rounded-2xl border ${borderColor} items-center`}>
                        <Target size={24} color="#f97316" />
                        <StyledText className={`${textColor} font-bold text-xl mt-2`}>{dailyCalories}</StyledText>
                        <StyledText className="text-slate-400 text-xs">Calorías</StyledText>
                    </StyledView>
                    <StyledView className={`flex-1 ${cardBg} p-4 rounded-2xl border ${borderColor} items-center`}>
                        <Utensils size={24} color="#10b981" />
                        <StyledText className={`${textColor} font-bold text-xl mt-2`}>5</StyledText>
                        <StyledText className="text-slate-400 text-xs">Comidas</StyledText>
                    </StyledView>
                </StyledView>

                {/* Meal Plan */}
                <StyledView>
                    <StyledText className={`${textColor} text-xl font-bold mb-4`}>Plan de Hoy</StyledText>
                    {mealPlan.map((meal, index) => {
                        const isEaten = eatenMeals.includes(meal.id + index); // Unique ID for list
                        const mealLabels = ['Desayuno', 'Media Mañana', 'Almuerzo', 'Media Tarde', 'Cena'];

                        return (
                            <StyledView key={index} className={`mb-4 ${cardBg} p-4 rounded-2xl border ${borderColor} ${isEaten ? 'opacity-50' : ''}`}>
                                <StyledView className="flex-row justify-between items-start mb-2">
                                    <StyledText className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                                        {mealLabels[index]}
                                    </StyledText>
                                    <StyledText className="text-slate-400 text-xs">{meal.calories} kcal</StyledText>
                                </StyledView>

                                <StyledText className={`${textColor} text-lg font-semibold mb-3`}>{meal.name}</StyledText>

                                <StyledView className="flex-row justify-between items-center">
                                    <StyledView className="flex-row space-x-3">
                                        <StyledText className="text-slate-500 text-xs">P: {meal.protein}g</StyledText>
                                        <StyledText className="text-slate-500 text-xs">C: {meal.carbs}g</StyledText>
                                        <StyledText className="text-slate-500 text-xs">G: {meal.fats}g</StyledText>
                                    </StyledView>

                                    <StyledTouchableOpacity
                                        onPress={() => toggleMeal(meal.id + index)}
                                        className={`flex-row items-center px-3 py-1.5 rounded-full ${isEaten ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}
                                    >
                                        {isEaten ? (
                                            <>
                                                <CheckCircle size={14} color="#10b981" />
                                                <StyledText className="text-emerald-500 text-xs font-bold ml-1">Comido</StyledText>
                                            </>
                                        ) : (
                                            <StyledText className="text-blue-400 text-xs font-bold">Marcar</StyledText>
                                        )}
                                    </StyledTouchableOpacity>
                                </StyledView>
                            </StyledView>
                        );
                    })}
                </StyledView>
            </StyledView>
        </StyledScrollView>
    );
}
