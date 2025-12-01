import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { styled } from 'nativewind';
import { useUser, UserLevel, Gender } from '../src/context/UserContext';
import { Check, ChevronRight, ChevronDown } from 'lucide-react-native';
import clsx from 'clsx';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const LEVELS: { id: UserLevel; title: string; desc: string }[] = [
    { id: 'beginner', title: 'Principiante', desc: 'Nuevo en fitness, buscando un nuevo comienzo.' },
    { id: 'intermediate', title: 'Intermedio', desc: 'Activo, pero quiero superar mis límites.' },
    { id: 'advanced', title: 'Avanzado', desc: 'Fitness de élite, listo para alta intensidad.' },
];

const GENDERS: { id: Gender; label: string }[] = [
    { id: 'male', label: 'Masculino' },
    { id: 'female', label: 'Femenino' },
    { id: 'other', label: 'Otro' },
];

export default function Onboarding() {
    const { createProfile } = useUser();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState<Gender>('other');
    const [showGenderPicker, setShowGenderPicker] = useState(false);
    const [level, setLevel] = useState<UserLevel>('beginner');

    const handleFinish = () => {
        if (!name.trim() || !age || !weight || !height) return;
        createProfile(name, parseInt(age), parseFloat(weight), parseFloat(height), gender, level);
        router.replace('/(tabs)');
    };

    const canProceedStep1 = name.trim().length > 0;
    const canProceedStep2 = age.length > 0 && weight.length > 0 && height.length > 0;

    return (
        <StyledView className="flex-1 bg-slate-950 p-6 justify-between pt-20">
            <StyledScrollView>
                {step === 1 && (
                    <StyledView>
                        <StyledText className="text-white text-3xl font-bold mb-6">
                            ¿Cómo te llamas?
                        </StyledText>
                        <StyledTextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Ingresa tu nombre"
                            placeholderTextColor="#64748b"
                            className="text-white text-2xl border-b-2 border-slate-700 py-2 mb-8"
                            autoFocus
                        />
                    </StyledView>
                )}

                {step === 2 && (
                    <StyledView>
                        <StyledText className="text-white text-3xl font-bold mb-6">
                            Cuéntanos sobre ti
                        </StyledText>

                        <StyledView className="mb-6">
                            <StyledText className="text-slate-400 text-sm mb-2">Edad</StyledText>
                            <StyledTextInput
                                value={age}
                                onChangeText={setAge}
                                placeholder="Ej: 25"
                                placeholderTextColor="#64748b"
                                keyboardType="numeric"
                                className="text-white text-xl border-b-2 border-slate-700 py-2"
                            />
                        </StyledView>

                        <StyledView className="mb-6">
                            <StyledText className="text-slate-400 text-sm mb-2">Peso (kg)</StyledText>
                            <StyledTextInput
                                value={weight}
                                onChangeText={setWeight}
                                placeholder="Ej: 70"
                                placeholderTextColor="#64748b"
                                keyboardType="decimal-pad"
                                className="text-white text-xl border-b-2 border-slate-700 py-2"
                            />
                        </StyledView>

                        <StyledView className="mb-6">
                            <StyledText className="text-slate-400 text-sm mb-2">Altura (cm)</StyledText>
                            <StyledTextInput
                                value={height}
                                onChangeText={setHeight}
                                placeholder="Ej: 170"
                                placeholderTextColor="#64748b"
                                keyboardType="numeric"
                                className="text-white text-xl border-b-2 border-slate-700 py-2"
                            />
                        </StyledView>

                        <StyledView className="mb-6">
                            <StyledText className="text-slate-400 text-sm mb-2">Sexo</StyledText>
                            <StyledTouchableOpacity
                                onPress={() => setShowGenderPicker(!showGenderPicker)}
                                className="border-b-2 border-slate-700 py-3 flex-row justify-between items-center"
                            >
                                <StyledText className="text-white text-xl">
                                    {GENDERS.find(g => g.id === gender)?.label}
                                </StyledText>
                                <ChevronDown size={20} color="white" />
                            </StyledTouchableOpacity>

                            {showGenderPicker && (
                                <StyledView className="mt-2">
                                    {GENDERS.map((g) => (
                                        <StyledTouchableOpacity
                                            key={g.id}
                                            onPress={() => {
                                                setGender(g.id);
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
                    </StyledView>
                )}

                {step === 3 && (
                    <StyledView>
                        <StyledText className="text-white text-3xl font-bold mb-8">
                            Selecciona tu nivel
                        </StyledText>
                        <StyledView className="space-y-4">
                            {LEVELS.map((lvl) => (
                                <StyledTouchableOpacity
                                    key={lvl.id}
                                    onPress={() => setLevel(lvl.id)}
                                    className={clsx(
                                        'p-4 rounded-2xl border mb-4',
                                        level === lvl.id
                                            ? 'bg-blue-600/20 border-blue-500'
                                            : 'bg-slate-900 border-slate-800'
                                    )}
                                >
                                    <StyledView className="flex-row justify-between items-center">
                                        <StyledView className="flex-1">
                                            <StyledText className={clsx("font-semibold text-lg", level === lvl.id ? "text-blue-400" : "text-white")}>
                                                {lvl.title}
                                            </StyledText>
                                            <StyledText className="text-slate-400 text-sm mt-1">{lvl.desc}</StyledText>
                                        </StyledView>
                                        {level === lvl.id && (
                                            <Check size={24} color="#60a5fa" />
                                        )}
                                    </StyledView>
                                </StyledTouchableOpacity>
                            ))}
                        </StyledView>
                    </StyledView>
                )}
            </StyledScrollView>

            <StyledView className="pb-8">
                <StyledTouchableOpacity
                    onPress={() => {
                        if (step === 1 && canProceedStep1) setStep(2);
                        else if (step === 2 && canProceedStep2) setStep(3);
                        else if (step === 3) handleFinish();
                    }}
                    disabled={(step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)}
                    className={clsx(
                        "bg-blue-600 py-4 rounded-2xl flex-row items-center justify-center",
                        ((step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)) && "opacity-50"
                    )}
                >
                    <StyledText className="text-white font-bold text-lg mr-2">
                        {step === 3 ? '¡Vamos!' : 'Siguiente'}
                    </StyledText>
                    <ChevronRight size={20} color="white" />
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
}
