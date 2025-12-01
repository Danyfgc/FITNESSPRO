import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import { styled } from 'nativewind';
import { useUser, Gender } from '../../src/context/UserContext';
import { Award, Calendar, Activity, Moon, Sun, Edit, ChevronDown } from 'lucide-react-native';
import { router } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(TextInput);

const GENDERS: { id: Gender; label: string }[] = [
    { id: 'male', label: 'Masculino' },
    { id: 'female', label: 'Femenino' },
    { id: 'other', label: 'Otro' },
];

export default function Profile() {
    const { user, theme, toggleTheme, updateProfile } = useUser();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState('');
    const [editAge, setEditAge] = useState('');
    const [editWeight, setEditWeight] = useState('');
    const [editHeight, setEditHeight] = useState('');
    const [editGender, setEditGender] = useState<Gender>('other');
    const [showGenderPicker, setShowGenderPicker] = useState(false);

    if (!user) {
        router.replace('/');
        return null;
    }

    const stats = [
        { label: 'Rutinas', value: user.completedWorkouts.length.toString(), icon: Activity },
        { label: 'Racha', value: `${user.streak} días`, icon: Calendar },
        { label: 'XP Total', value: user.xp.toString(), icon: Award },
    ];

    const openEditModal = () => {
        setEditName(user.name);
        setEditAge(user.age.toString());
        setEditWeight(user.weight.toString());
        setEditHeight(user.height.toString());
        setEditGender(user.gender);
        setShowEditModal(true);
    };

    const saveProfile = () => {
        updateProfile({
            name: editName,
            age: parseInt(editAge),
            weight: parseFloat(editWeight),
            height: parseFloat(editHeight),
            gender: editGender,
        });
        setShowEditModal(false);
    };

    const bgColor = theme === 'dark' ? 'bg-slate-950' : 'bg-white';
    const textColor = theme === 'dark' ? 'text-white' : 'text-slate-950';
    const secondaryTextColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
    const cardBg = theme === 'dark' ? 'bg-white/5' : 'bg-slate-100';
    const borderColor = theme === 'dark' ? 'border-white/10' : 'border-slate-200';

    return (
        <StyledScrollView className={`flex-1 ${bgColor}`}>
            <StyledView className="p-6 pb-24">
                <StyledText className={`${textColor} text-3xl font-bold mb-8 pt-12`}>Perfil</StyledText>

                <StyledView className="flex-row items-center mb-8">
                    <StyledView className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mr-4">
                        <StyledText className="text-white text-3xl font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </StyledText>
                    </StyledView>
                    <StyledView className="flex-1">
                        <StyledText className={`${textColor} text-2xl font-bold`}>{user.name}</StyledText>
                        <StyledText className="text-blue-400 font-medium capitalize">{user.level}</StyledText>
                        <StyledText className={`${secondaryTextColor} text-sm`}>
                            {user.age} años • {user.weight} kg • {user.height} cm • {GENDERS.find(g => g.id === user.gender)?.label}
                        </StyledText>
                    </StyledView>
                </StyledView>

                <StyledView className="flex-row mb-8">
                    {stats.map((stat, index) => (
                        <StyledView key={stat.label} className={`flex-1 ${cardBg} p-4 rounded-2xl border ${borderColor} ${index !== stats.length - 1 ? 'mr-2' : ''}`}>
                            <StyledView className="items-center">
                                <stat.icon size={20} color={theme === 'dark' ? '#94a3b8' : '#64748b'} style={{ marginBottom: 8 }} />
                                <StyledText className={`${textColor} font-bold text-lg`}>{stat.value}</StyledText>
                                <StyledText className={`${secondaryTextColor} text-xs`}>{stat.label}</StyledText>
                            </StyledView>
                        </StyledView>
                    ))}
                </StyledView>

                <StyledView>
                    <StyledText className={`${secondaryTextColor} text-lg font-semibold mb-4`}>Configuración</StyledText>

                    <StyledTouchableOpacity
                        onPress={openEditModal}
                        className={`${cardBg} p-4 rounded-2xl flex-row items-center justify-between border ${borderColor} mb-3`}
                    >
                        <StyledView className="flex-row items-center">
                            <Edit size={20} color="#60a5fa" style={{ marginRight: 12 }} />
                            <StyledText className={`${textColor} font-medium`}>Editar Perfil</StyledText>
                        </StyledView>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        onPress={toggleTheme}
                        className={`${cardBg} p-4 rounded-2xl flex-row items-center justify-between border ${borderColor} mb-3`}
                    >
                        <StyledView className="flex-row items-center">
                            {theme === 'dark' ? (
                                <Sun size={20} color="#fbbf24" style={{ marginRight: 12 }} />
                            ) : (
                                <Moon size={20} color="#60a5fa" style={{ marginRight: 12 }} />
                            )}
                            <StyledText className={`${textColor} font-medium`}>
                                Modo {theme === 'dark' ? 'Claro' : 'Oscuro'}
                            </StyledText>
                        </StyledView>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Edit Profile Modal */}
            <Modal
                visible={showEditModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowEditModal(false)}
            >
                <StyledView className="flex-1 bg-black/50 justify-end">
                    <StyledView className="bg-slate-950 rounded-t-3xl p-6 pb-12">
                        <StyledText className="text-white text-2xl font-bold mb-6">Editar Perfil</StyledText>

                        <StyledView className="mb-4">
                            <StyledText className="text-slate-400 text-sm mb-2">Nombre</StyledText>
                            <StyledTextInput
                                value={editName}
                                onChangeText={setEditName}
                                className="text-white text-lg border-b-2 border-slate-700 py-2"
                            />
                        </StyledView>

                        <StyledView className="mb-4">
                            <StyledText className="text-slate-400 text-sm mb-2">Edad</StyledText>
                            <StyledTextInput
                                value={editAge}
                                onChangeText={setEditAge}
                                keyboardType="numeric"
                                className="text-white text-lg border-b-2 border-slate-700 py-2"
                            />
                        </StyledView>

                        <StyledView className="mb-4">
                            <StyledText className="text-slate-400 text-sm mb-2">Peso (kg)</StyledText>
                            <StyledTextInput
                                value={editWeight}
                                onChangeText={setEditWeight}
                                keyboardType="decimal-pad"
                                className="text-white text-lg border-b-2 border-slate-700 py-2"
                            />
                        </StyledView>

                        <StyledView className="mb-4">
                            <StyledText className="text-slate-400 text-sm mb-2">Altura (cm)</StyledText>
                            <StyledTextInput
                                value={editHeight}
                                onChangeText={setEditHeight}
                                keyboardType="numeric"
                                className="text-white text-lg border-b-2 border-slate-700 py-2"
                            />
                        </StyledView>

                        <StyledView className="mb-6">
                            <StyledText className="text-slate-400 text-sm mb-2">Sexo</StyledText>
                            <StyledTouchableOpacity
                                onPress={() => setShowGenderPicker(!showGenderPicker)}
                                className="border-b-2 border-slate-700 py-3 flex-row justify-between items-center"
                            >
                                <StyledText className="text-white text-lg">
                                    {GENDERS.find(g => g.id === editGender)?.label}
                                </StyledText>
                                <ChevronDown size={20} color="white" />
                            </StyledTouchableOpacity>

                            {showGenderPicker && (
                                <StyledView className="mt-2">
                                    {GENDERS.map((g) => (
                                        <StyledTouchableOpacity
                                            key={g.id}
                                            onPress={() => {
                                                setEditGender(g.id);
                                                setShowGenderPicker(false);
                                            }}
                                            className="py-3 px-4 bg-slate-900 rounded-lg mb-2"
                                        >
                                            <StyledText className="text-white">{g.label}</StyledText>
                                        </StyledTouchableOpacity>
                                    ))}
                                </StyledView>
                            )}
                        </StyledView>

                        <StyledView className="flex-row space-x-3">
                            <StyledTouchableOpacity
                                onPress={() => setShowEditModal(false)}
                                className="flex-1 bg-slate-800 py-4 rounded-2xl mr-3"
                            >
                                <StyledText className="text-white text-center font-bold">Cancelar</StyledText>
                            </StyledTouchableOpacity>

                            <StyledTouchableOpacity
                                onPress={saveProfile}
                                className="flex-1 bg-blue-600 py-4 rounded-2xl"
                            >
                                <StyledText className="text-white text-center font-bold">Guardar</StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </Modal>
        </StyledScrollView>
    );
}
