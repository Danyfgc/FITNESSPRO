import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import { useUser } from '../../src/context/UserContext';
import { BarChart } from 'react-native-chart-kit';
import { useState } from 'react';
import { TrendingUp, Droplets, Dumbbell } from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const screenWidth = Dimensions.get('window').width;

type DateRange = '7d' | '30d' | 'all';

export default function StatsScreen() {
    const { user, theme } = useUser();
    const [dateRange, setDateRange] = useState<DateRange>('7d');

    if (!user) return null;

    const today = new Date();
    const getDaysAgo = (days: number) => {
        const date = new Date(today);
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0];
    };

    const filterByRange = (data: any[]) => {
        if (dateRange === 'all') return data;
        const cutoffDate = getDaysAgo(dateRange === '7d' ? 7 : 30);
        return data.filter(entry => entry.date >= cutoffDate);
    };

    // Prepare data for charts
    const workoutData = filterByRange(user.workoutHistory || []);
    const waterData = filterByRange(user.waterHistory || []);

    // Get date labels (day of month) from actual data
    const getDateLabels = (data: any[]) => {
        if (data.length === 0) return [];

        // Sort by date
        const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));

        // Get all dates in range
        const startDate = new Date(sorted[0].date);
        const endDate = dateRange === 'all'
            ? new Date(sorted[sorted.length - 1].date)
            : new Date();

        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            dates.push(dateStr);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    // Fill data for all dates in range
    const fillDataByDates = (data: any[], dates: string[]) => {
        return dates.map(date => {
            const entry = data.find(e => e.date === date);
            return { date, value: entry ? entry.value : 0 };
        });
    };

    const dateLabels = getDateLabels(workoutData.length > 0 ? workoutData : waterData);
    const workoutChartData = fillDataByDates(workoutData, dateLabels);
    const waterChartData = fillDataByDates(waterData, dateLabels);

    // Format labels to show day of month, skip some if too many
    const formatLabels = (dates: string[]) => {
        const skipInterval = Math.ceil(dates.length / 7); // Show max ~7 labels
        return dates.map((date, i) => {
            if (i % skipInterval === 0) {
                const day = new Date(date).getDate();
                return day.toString();
            }
            return '';
        });
    };

    const xLabels = formatLabels(dateLabels);

    const bgColor = theme === 'dark' ? 'bg-slate-950' : 'bg-white';
    const textColor = theme === 'dark' ? 'text-white' : 'text-slate-950';
    const cardBg = theme === 'dark' ? 'bg-white/5' : 'bg-slate-100';
    const borderColor = theme === 'dark' ? 'border-white/10' : 'border-slate-200';

    const chartConfig = {
        backgroundColor: theme === 'dark' ? '#1e293b' : '#f1f5f9',
        backgroundGradientFrom: theme === 'dark' ? '#1e293b' : '#f1f5f9',
        backgroundGradientTo: theme === 'dark' ? '#0f172a' : '#e2e8f0',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(96, 165, 250, ${opacity})`,
        labelColor: (opacity = 1) => theme === 'dark' ? `rgba(148, 163, 184, ${opacity})` : `rgba(71, 85, 105, ${opacity})`,
        style: { borderRadius: 16 },
        propsForLabels: { fontSize: 10 },
    };

    return (
        <StyledScrollView className={`flex-1 ${bgColor} p-6`}>
            <StyledView className="pt-12 pb-24 space-y-6">
                {/* Header */}
                <StyledView>
                    <StyledText className={`${textColor} text-3xl font-bold mb-2`}>Estadísticas</StyledText>
                    <StyledText className="text-slate-400">Tu progreso en detalle</StyledText>
                </StyledView>

                {/* Date Range Selector */}
                <StyledView className="flex-row space-x-2">
                    {(['7d', '30d', 'all'] as DateRange[]).map((range) => (
                        <StyledTouchableOpacity
                            key={range}
                            onPress={() => setDateRange(range)}
                            className={`flex-1 py-3 rounded-xl ${dateRange === range ? 'bg-blue-500' : cardBg} border ${dateRange === range ? 'border-blue-500' : borderColor}`}
                        >
                            <StyledText className={`text-center font-bold text-sm ${dateRange === range ? 'text-white' : 'text-slate-400'}`}>
                                {range === '7d' ? '7 días' : range === '30d' ? '30 días' : 'Todo'}
                            </StyledText>
                        </StyledTouchableOpacity>
                    ))}
                </StyledView>

                {/* Workouts Chart */}
                <StyledView className={`${cardBg} p-4 rounded-3xl border ${borderColor}`}>
                    <StyledView className="flex-row items-center mb-4">
                        <Dumbbell size={20} color="#60a5fa" />
                        <StyledText className={`${textColor} text-lg font-bold ml-2`}>Entrenamientos</StyledText>
                    </StyledView>
                    {workoutChartData.length > 0 ? (
                        <BarChart
                            data={{
                                labels: xLabels,
                                datasets: [{ data: workoutChartData.map(e => e.value) }]
                            }}
                            width={screenWidth - 64}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={chartConfig}
                            style={{ borderRadius: 16 }}
                            fromZero
                        />
                    ) : (
                        <StyledText className="text-slate-400 text-center py-8">No hay datos disponibles</StyledText>
                    )}
                </StyledView>

                {/* Water Chart */}
                <StyledView className={`${cardBg} p-4 rounded-3xl border ${borderColor}`}>
                    <StyledView className="flex-row items-center mb-4">
                        <Droplets size={20} color="#3b82f6" />
                        <StyledText className={`${textColor} text-lg font-bold ml-2`}>Hidratación (Litros)</StyledText>
                    </StyledView>
                    {waterChartData.length > 0 ? (
                        <BarChart
                            data={{
                                labels: xLabels,
                                datasets: [{ data: waterChartData.map(e => e.value / 1000) }] // Convert ml to L
                            }}
                            width={screenWidth - 64}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix="L"
                            chartConfig={chartConfig}
                            style={{ borderRadius: 16 }}
                            fromZero
                        />
                    ) : (
                        <StyledText className="text-slate-400 text-center py-8">No hay datos disponibles</StyledText>
                    )}
                </StyledView>

                {/* Summary Stats */}
                <StyledView className="flex-row space-x-4">
                    <StyledView className={`flex-1 ${cardBg} p-4 rounded-2xl border ${borderColor} items-center`}>
                        <TrendingUp size={24} color="#10b981" />
                        <StyledText className={`${textColor} font-bold text-2xl mt-2`}>
                            {workoutData.reduce((sum, e) => sum + e.value, 0)}
                        </StyledText>
                        <StyledText className="text-slate-400 text-xs mt-1">Entrenamientos</StyledText>
                    </StyledView>
                    <StyledView className={`flex-1 ${cardBg} p-4 rounded-2xl border ${borderColor} items-center`}>
                        <Droplets size={24} color="#3b82f6" />
                        <StyledText className={`${textColor} font-bold text-2xl mt-2`}>
                            {(waterData.reduce((sum, e) => sum + e.value, 0) / 1000).toFixed(1)}L
                        </StyledText>
                        <StyledText className="text-slate-400 text-xs mt-1">Agua Total</StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledScrollView>
    );
}
