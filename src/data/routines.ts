export type Exercise = {
    id: string;
    name: string;
    sets: number;
    reps: string;
    duration?: number; // in seconds
    description: string;
};

export type Routine = {
    id: string;
    title: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: number; // in minutes
    xpReward: number;
    exercises: Exercise[];
};

export const ROUTINES: Routine[] = [
    {
        id: 'beg-1',
        title: 'Full Body Start',
        level: 'beginner',
        duration: 15,
        xpReward: 100,
        exercises: [
            {
                id: 'ex-1',
                name: 'Jumping Jacks',
                sets: 3,
                reps: '30 sec',
                duration: 30,
                description: 'Start with feet together and jump out while raising arms.',
            },
            {
                id: 'ex-2',
                name: 'Bodyweight Squats',
                sets: 3,
                reps: '12',
                description: 'Keep back straight, lower hips until knees are at 90 degrees.',
            },
            {
                id: 'ex-3',
                name: 'Push-ups (Knees)',
                sets: 3,
                reps: '10',
                description: 'Keep core tight, lower chest to floor. Use knees if needed.',
            },
            {
                id: 'ex-4',
                name: 'Plank',
                sets: 3,
                reps: '20 sec',
                duration: 20,
                description: 'Hold a straight line from head to heels (or knees).',
            },
        ],
    },
    {
        id: 'int-1',
        title: 'Core & Cardio',
        level: 'intermediate',
        duration: 25,
        xpReward: 200,
        exercises: [
            {
                id: 'ex-5',
                name: 'Burpees',
                sets: 3,
                reps: '10',
                description: 'Squat, jump back to plank, push-up, jump forward, jump up.',
            },
            {
                id: 'ex-6',
                name: 'Mountain Climbers',
                sets: 3,
                reps: '40 sec',
                duration: 40,
                description: 'Alternate bringing knees to chest in plank position.',
            },
            {
                id: 'ex-7',
                name: 'Lunges',
                sets: 3,
                reps: '12 per leg',
                description: 'Step forward and lower hips until both knees are at 90 degrees.',
            },
        ],
    },
    {
        id: 'adv-1',
        title: 'HIIT Intensity',
        level: 'advanced',
        duration: 35,
        xpReward: 350,
        exercises: [
            {
                id: 'ex-8',
                name: 'Jump Squats',
                sets: 4,
                reps: '15',
                description: 'Explosive squat, jumping as high as possible.',
            },
            {
                id: 'ex-9',
                name: 'Diamond Push-ups',
                sets: 4,
                reps: '15',
                description: 'Hands close together under chest forming a diamond shape.',
            },
            {
                id: 'ex-10',
                name: 'High Knees',
                sets: 4,
                reps: '45 sec',
                duration: 45,
                description: 'Run in place bringing knees as high as possible.',
            },
        ],
    },
];
