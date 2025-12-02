import { Flame } from 'lucide-react-native';

export type StreakPhase = {
    name: string;
    color: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
    description: string;
    minDays: number;
    nextPhaseDays: number | null;
    intensity: number; // 1-5 for animation intensity
};

export const STREAK_PHASES: StreakPhase[] = [
    {
        name: 'Chispa',
        color: '#facc15', // yellow-400
        textColor: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        description: '¡Estás comenzando! Mantén el ritmo para encender la llama.',
        minDays: 0,
        nextPhaseDays: 3,
        intensity: 1,
    },
    {
        name: 'Llama',
        color: '#fb923c', // orange-400
        textColor: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/20',
        description: '¡El fuego ha comenzado! Tu constancia está dando frutos.',
        minDays: 3,
        nextPhaseDays: 7,
        intensity: 2,
    },
    {
        name: 'Llamarada',
        color: '#f87171', // red-400
        textColor: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20',
        description: '¡Estás ardiendo! Nada puede detenerte ahora.',
        minDays: 7,
        nextPhaseDays: 14,
        intensity: 3,
    },
    {
        name: 'Infierno',
        color: '#c084fc', // purple-400
        textColor: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
        description: '¡Poder absoluto! Tu disciplina es legendaria.',
        minDays: 14,
        nextPhaseDays: 30,
        intensity: 4,
    },
    {
        name: 'Nova Azul',
        color: '#60a5fa', // blue-400
        textColor: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        description: '¡Has alcanzado la perfección! Eres una inspiración.',
        minDays: 30,
        nextPhaseDays: null,
        intensity: 5,
    },
];

export const getStreakPhase = (days: number): StreakPhase => {
    // Find the highest phase where minDays <= days
    const phase = [...STREAK_PHASES].reverse().find(p => days >= p.minDays);
    return phase || STREAK_PHASES[0];
};
