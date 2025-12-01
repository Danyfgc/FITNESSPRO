import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTINES } from '../data/routines';
import { useUser } from '../context/UserContext';
import { X, ChevronRight, ChevronLeft, Play, Pause, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const WorkoutPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { completeWorkout, addXP } = useUser();

    const routine = ROUTINES.find(r => r.id === id);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    // Timer state
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isActive, setIsActive] = useState(false);

    if (!routine) return <div>Routine not found</div>;

    const currentExercise = routine.exercises[currentIndex];

    useEffect(() => {
        // Reset timer when exercise changes
        if (currentExercise.duration) {
            setTimeLeft(currentExercise.duration);
            setIsActive(false);
        } else {
            setTimeLeft(null);
            setIsActive(false);
        }
    }, [currentIndex, currentExercise]);

    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft !== null && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const handleNext = () => {
        if (currentIndex < routine.exercises.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            finishWorkout();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const finishWorkout = () => {
        setIsCompleted(true);
        completeWorkout(routine.id);
        addXP(routine.xpReward);
    };

    if (isCompleted) {
        return (
            <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-950">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-emerald-500/20 p-8 rounded-full mb-6 text-emerald-500"
                >
                    <CheckCircle size={80} />
                </motion.div>
                <h1 className="text-4xl font-bold mb-2">Workout Complete!</h1>
                <p className="text-slate-400 mb-8">You earned {routine.xpReward} XP</p>
                <button
                    onClick={() => navigate('/')}
                    className="btn-primary w-full max-w-xs"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-slate-950">
            {/* Header */}
            <div className="p-4 flex justify-between items-center">
                <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full">
                    <X size={20} />
                </button>
                <span className="font-semibold text-sm text-slate-400">
                    {currentIndex + 1} / {routine.exercises.length}
                </span>
                <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full max-w-md text-center"
                    >
                        <h2 className="text-3xl font-bold mb-4">{currentExercise.name}</h2>

                        <div className="bg-white/5 p-6 rounded-3xl mb-8 border border-white/10">
                            <div className="flex justify-around text-lg font-medium mb-4">
                                <div className="flex flex-col">
                                    <span className="text-slate-400 text-xs uppercase tracking-wider">Sets</span>
                                    <span>{currentExercise.sets}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-400 text-xs uppercase tracking-wider">Reps</span>
                                    <span>{currentExercise.reps}</span>
                                </div>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-sm">
                                {currentExercise.description}
                            </p>
                        </div>

                        {/* Timer Display */}
                        {timeLeft !== null && (
                            <div className="mb-8">
                                <div className="text-6xl font-mono font-bold tabular-nums tracking-tighter">
                                    00:{timeLeft.toString().padStart(2, '0')}
                                </div>
                                <button
                                    onClick={() => setIsActive(!isActive)}
                                    className={clsx(
                                        "mt-4 px-6 py-2 rounded-full flex items-center justify-center space-x-2 mx-auto transition-colors",
                                        isActive ? "bg-yellow-500/20 text-yellow-500" : "bg-blue-500/20 text-blue-500"
                                    )}
                                >
                                    {isActive ? <><Pause size={18} /> <span>Pause</span></> : <><Play size={18} /> <span>Start Timer</span></>}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="p-6 pb-safe glass-nav">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="p-4 rounded-full bg-slate-800 disabled:opacity-30 transition-opacity"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={handleNext}
                        className="btn-primary flex-1 mx-4 flex items-center justify-center space-x-2"
                    >
                        <span>{currentIndex === routine.exercises.length - 1 ? 'Finish' : 'Next Exercise'}</span>
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutPlayer;
