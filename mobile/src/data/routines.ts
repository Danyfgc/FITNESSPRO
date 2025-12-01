export type Exercise = {
    id: string;
    name: string;
    sets: number;
    reps: string;
    duration?: number;
    description: string;
};

export type Routine = {
    id: string;
    title: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
    xpReward: number;
    exercises: Exercise[];
};

export const ROUTINES: Routine[] = [
    {
        id: 'beg-1',
        title: 'Cuerpo Completo Inicial',
        level: 'beginner',
        duration: 15,
        xpReward: 100,
        exercises: [
            {
                id: 'ex-1',
                name: 'Saltos de Tijera',
                sets: 3,
                reps: '30 seg',
                duration: 30,
                description: 'Comienza con los pies juntos y salta abriendo mientras levantas los brazos.',
            },
            {
                id: 'ex-2',
                name: 'Sentadillas',
                sets: 3,
                reps: '12',
                description: 'Mantén la espalda recta, baja las caderas hasta que las rodillas estén a 90 grados.',
            },
            {
                id: 'ex-3',
                name: 'Flexiones (Rodillas)',
                sets: 3,
                reps: '10',
                description: 'Mantén el core apretado, baja el pecho al suelo. Usa las rodillas si es necesario.',
            },
            {
                id: 'ex-4',
                name: 'Plancha',
                sets: 3,
                reps: '20 seg',
                duration: 20,
                description: 'Mantén una línea recta desde la cabeza hasta los talones (o rodillas).',
            },
        ],
    },
    {
        id: 'int-1',
        title: 'Core y Cardio',
        level: 'intermediate',
        duration: 25,
        xpReward: 200,
        exercises: [
            {
                id: 'ex-5',
                name: 'Burpees',
                sets: 3,
                reps: '10',
                description: 'Sentadilla, salta hacia atrás a plancha, flexión, salta hacia adelante, salta arriba.',
            },
            {
                id: 'ex-6',
                name: 'Escaladores',
                sets: 3,
                reps: '40 seg',
                duration: 40,
                description: 'Alterna llevando las rodillas al pecho en posición de plancha.',
            },
            {
                id: 'ex-7',
                name: 'Zancadas',
                sets: 3,
                reps: '12 por pierna',
                description: 'Da un paso adelante y baja las caderas hasta que ambas rodillas estén a 90 grados.',
            },
        ],
    },
    {
        id: 'adv-1',
        title: 'HIIT Intenso',
        level: 'advanced',
        duration: 35,
        xpReward: 350,
        exercises: [
            {
                id: 'ex-8',
                name: 'Sentadillas con Salto',
                sets: 4,
                reps: '15',
                description: 'Sentadilla explosiva, saltando lo más alto posible.',
            },
            {
                id: 'ex-9',
                name: 'Flexiones Diamante',
                sets: 4,
                reps: '15',
                description: 'Manos juntas bajo el pecho formando un diamante.',
            },
            {
                id: 'ex-10',
                name: 'Rodillas Altas',
                sets: 4,
                reps: '45 seg',
                duration: 45,
                description: 'Corre en el lugar llevando las rodillas lo más alto posible.',
            },
        ],
    },
];
