import { UserProfile } from '../context/UserContext';
import { Meal, MEALS } from '../data/meals';

export const calculateIdealWeight = (heightCm: number, gender: string): { min: number; max: number } => {
    // Simple BMI-based estimation for "healthy" range (BMI 18.5 - 24.9)
    // height is in cm, convert to m
    const heightM = heightCm / 100;
    const minWeight = 18.5 * (heightM * heightM);
    const maxWeight = 24.9 * (heightM * heightM);
    return {
        min: Math.round(minWeight),
        max: Math.round(maxWeight),
    };
};

export const calculateDailyCalories = (user: UserProfile): number => {
    // Harris-Benedict Equation (Simplified)
    // BMR Calculation
    let bmr = 0;
    if (user.gender === 'male') {
        bmr = 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age);
    } else {
        bmr = 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
    }

    // Activity Multiplier (Assuming moderate activity for now based on app usage)
    const tdee = bmr * 1.55;

    // Adjust for goal (Simplified: if BMI > 25 deficit, else maintain/surplus)
    const heightM = user.height / 100;
    const bmi = user.weight / (heightM * heightM);

    if (bmi > 25) {
        return Math.round(tdee - 500); // Deficit for weight loss
    } else if (bmi < 18.5) {
        return Math.round(tdee + 300); // Surplus for weight gain
    } else {
        return Math.round(tdee); // Maintenance
    }
};

export const generateDailyPlan = (targetCalories: number, dateString?: string): Meal[] => {
    // Use provided date or today's date
    const date = dateString || new Date().toISOString().split('T')[0];

    // Simple seeded random number generator
    const seed = date.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    let randomState = seed;

    const seededRandom = () => {
        const x = Math.sin(randomState++) * 10000;
        return x - Math.floor(x);
    };

    const getMeal = (category: string) => {
        const options = MEALS.filter(m => m.category === category);
        return options[Math.floor(seededRandom() * options.length)];
    };

    const getSnack = () => {
        const options = MEALS.filter(m => m.category === 'snack');
        return options[Math.floor(seededRandom() * options.length)];
    };

    return [
        getMeal('breakfast'),
        getSnack(), // Snack 1
        getMeal('lunch'),
        getSnack(), // Snack 2
        getMeal('dinner'),
    ];
};
