export interface Meal {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    image?: string;
}

export const MEALS: Meal[] = [
    // Breakfasts
    {
        id: 'b1',
        name: 'Avena con Frutas y Nueces',
        calories: 350,
        protein: 12,
        carbs: 55,
        fats: 10,
        category: 'breakfast',
    },
    {
        id: 'b2',
        name: 'Huevos Revueltos con Espinacas',
        calories: 300,
        protein: 20,
        carbs: 5,
        fats: 22,
        category: 'breakfast',
    },
    {
        id: 'b3',
        name: 'Tostadas de Aguacate y Huevo',
        calories: 400,
        protein: 15,
        carbs: 30,
        fats: 25,
        category: 'breakfast',
    },

    // Snacks
    {
        id: 's1',
        name: 'Yogur Griego con Berries',
        calories: 150,
        protein: 15,
        carbs: 20,
        fats: 0,
        category: 'snack',
    },
    {
        id: 's2',
        name: 'Manzana y Almendras',
        calories: 200,
        protein: 4,
        carbs: 25,
        fats: 10,
        category: 'snack',
    },
    {
        id: 's3',
        name: 'Batido de Proteína',
        calories: 180,
        protein: 25,
        carbs: 10,
        fats: 2,
        category: 'snack',
    },

    // Lunch/Dinner
    {
        id: 'm1',
        name: 'Pechuga de Pollo con Quinoa',
        calories: 450,
        protein: 40,
        carbs: 45,
        fats: 10,
        category: 'lunch',
    },
    {
        id: 'm2',
        name: 'Salmón al Horno con Espárragos',
        calories: 500,
        protein: 35,
        carbs: 10,
        fats: 30,
        category: 'lunch',
    },
    {
        id: 'm3',
        name: 'Ensalada de Atún y Garbanzos',
        calories: 400,
        protein: 30,
        carbs: 35,
        fats: 15,
        category: 'lunch',
    },
    {
        id: 'd1',
        name: 'Pavo con Verduras Salteadas',
        calories: 350,
        protein: 35,
        carbs: 15,
        fats: 12,
        category: 'dinner',
    },
    {
        id: 'd2',
        name: 'Tacos de Lechuga con Carne Molida',
        calories: 300,
        protein: 25,
        carbs: 10,
        fats: 18,
        category: 'dinner',
    },
];
