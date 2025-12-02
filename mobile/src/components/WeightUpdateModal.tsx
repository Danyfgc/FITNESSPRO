import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useState } from 'react';
import { X } from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledModal = styled(Modal);

interface WeightUpdateModalProps {
    visible: boolean;
    currentWeight: number;
    onClose: () => void;
    onSave: (newWeight: number) => void;
}

export default function WeightUpdateModal({ visible, currentWeight, onClose, onSave }: WeightUpdateModalProps) {
    const [weight, setWeight] = useState(currentWeight.toString());

    const handleSave = () => {
        const newWeight = parseFloat(weight);
        if (!isNaN(newWeight) && newWeight > 0 && newWeight < 500) {
            onSave(newWeight);
            onClose();
        }
    };

    return (
        <StyledModal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <StyledView className="flex-1 bg-black/50 justify-center items-center p-6">
                <StyledView className="bg-slate-900 rounded-3xl p-6 w-full max-w-sm border border-white/10">
                    <StyledView className="flex-row justify-between items-center mb-6">
                        <StyledText className="text-white text-2xl font-bold">Actualizar Peso</StyledText>
                        <StyledTouchableOpacity onPress={onClose}>
                            <X size={24} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>

                    <StyledText className="text-slate-400 text-sm mb-4">
                        Han pasado 7 días desde tu última actualización. ¿Cuál es tu peso actual?
                    </StyledText>

                    <StyledView className="mb-6">
                        <StyledText className="text-slate-400 text-xs mb-2 uppercase font-bold">Peso (kg)</StyledText>
                        <StyledTextInput
                            className="bg-slate-800 text-white px-4 py-3 rounded-xl text-lg font-bold border border-white/10"
                            value={weight}
                            onChangeText={setWeight}
                            keyboardType="decimal-pad"
                            placeholder="70.5"
                            placeholderTextColor="#64748b"
                        />
                    </StyledView>

                    <StyledView className="flex-row space-x-3">
                        <StyledTouchableOpacity
                            onPress={onClose}
                            className="flex-1 bg-slate-800 py-3 rounded-xl"
                        >
                            <StyledText className="text-white text-center font-bold">Cancelar</StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity
                            onPress={handleSave}
                            className="flex-1 bg-blue-500 py-3 rounded-xl"
                        >
                            <StyledText className="text-white text-center font-bold">Guardar</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledModal>
    );
}
