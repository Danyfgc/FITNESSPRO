import { Tabs } from 'expo-router';
import { Home, Dumbbell, User, Utensils } from 'lucide-react-native';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#020617',
                    borderTopColor: 'rgba(255,255,255,0.1)',
                    borderTopWidth: 1,
                    height: 70,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: '#60a5fa',
                tabBarInactiveTintColor: '#64748b',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="routines"
                options={{
                    title: 'Rutinas',
                    tabBarIcon: ({ color, size }) => <Dumbbell size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="nutrition"
                options={{
                    title: 'Nutrición',
                    tabBarIcon: ({ color, size }) => <Utensils size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
