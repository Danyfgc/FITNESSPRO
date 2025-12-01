import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { UserProvider } from '../src/context/UserContext';

export default function Layout() {
    return (
        <UserProvider>
            <SafeAreaProvider>
                <StatusBar style="light" />
                <Slot />
            </SafeAreaProvider>
        </UserProvider>
    );
}
