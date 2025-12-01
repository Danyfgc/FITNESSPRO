import { Exercise, Routine } from '../data/routines';
import { UserProfile } from '../context/UserContext';

/**
 * Adjusts exercise intensity based on user profile
 */
export function adjustExerciseForUser(exercise: Exercise, user: UserProfile): Exercise {
    const { weight, height, level } = user;

    // Calculate BMI for basic fitness assessment
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Base multiplier on user level
    let intensityMultiplier = 1.0;
    if (level === 'beginner') intensityMultiplier = 0.7;
    if (level === 'intermediate') intensityMultiplier = 1.0;
    if (level === 'advanced') intensityMultiplier = 1.3;

    // Adjust based on BMI (lighter users might need less intensity initially)
    if (bmi < 18.5) {
        intensityMultiplier *= 0.8; // Underweight - reduce intensity
    } else if (bmi > 30) {
        intensityMultiplier *= 0.85; // Overweight - slightly reduce intensity
    }

    // Clone the exercise and adjust reps
    const adjustedExercise = { ...exercise };

    // If reps is a number, adjust it
    const repsMatch = exercise.reps.match(/^(\d+)/);
    if (repsMatch) {
        const baseReps = parseInt(repsMatch[1]);
        const adjustedReps = Math.max(5, Math.round(baseReps * intensityMultiplier));
        adjustedExercise.reps = exercise.reps.replace(/^\d+/, adjustedReps.toString());
    }

    // Adjust duration if present
    if (exercise.duration) {
        adjustedExercise.duration = Math.max(10, Math.round(exercise.duration * intensityMultiplier));
    }

    return adjustedExercise;
}

/**
 * Filters and returns routines suitable for the user's level
 */
export function getRecommendedRoutines(routines: Routine[], user: UserProfile): Routine[] {
    return routines.filter(routine => {
        // Match user level or one level above for progression
        if (user.level === 'beginner') {
            return routine.level === 'beginner' || routine.level === 'intermediate';
        }
        if (user.level === 'intermediate') {
            return routine.level === 'intermediate' || routine.level === 'advanced';
        }
        if (user.level === 'advanced') {
            return routine.level === 'advanced';
        }
        return true;
    });
}

/**
 * Personalizes an entire routine for a user
 */
export function personalizeRoutine(routine: Routine, user: UserProfile): Routine {
    return {
        ...routine,
        exercises: routine.exercises.map(ex => adjustExerciseForUser(ex, user))
    };
}

/**
 * Calculates if an exercise is appropriate for user's fitness level
 */
export function calculateIntensity(exercise: Exercise, user: UserProfile): 'low' | 'medium' | 'high' {
    const { weight, height } = user;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Parse reps to get base intensity
    const repsMatch = exercise.reps.match(/^(\d+)/);
    const reps = repsMatch ? parseInt(repsMatch[1]) : 10;

    // Simple intensity calculation
    let intensity = exercise.sets * reps;
    if (exercise.duration) {
        intensity = exercise.duration * exercise.sets;
    }

    // Adjust based on BMI and user level
    if (bmi > 30 || user.level === 'beginner') {
        if (intensity > 100) return 'high';
        if (intensity > 50) return 'medium';
        return 'low';
    }

    if (intensity > 150) return 'high';
    if (intensity > 75) return 'medium';
    return 'low';
}
