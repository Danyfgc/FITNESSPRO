import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <div className="relative bg-teal-50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-teal-50 sm:pb-12 md:pb-16 lg:max-w-2xl lg:w-full lg:pb-20 xl:pb-24">
                    <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-10 sm:px-6 md:mt-12 lg:mt-16 lg:px-8 xl:mt-20">
                        <div className="sm:text-center lg:text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                            >
                                <span className="block xl:inline">Bienvenidos a casa</span>{' '}
                                <span className="block text-teal-600 xl:inline">Jesús es el Señor</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                            >
                                Una comunidad donde puedes encontrar paz, propósito y pertenencia. Únete a nosotros para experimentar un ambiente fresco y relajado donde todos son bienvenidos.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                            >
                                <div className="rounded-md shadow">
                                    <motion.a
                                        href="#info"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg transition-colors duration-300"
                                    >
                                        Conócenos
                                        <ArrowRight className="ml-2" size={20} />
                                    </motion.a>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <motion.a
                                        href="#contact"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 md:py-4 md:text-lg transition-colors duration-300"
                                    >
                                        Contáctanos
                                    </motion.a>
                                </div>
                            </motion.div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-[#001f3f]">
                <img
                    className="h-48 w-full object-contain sm:h-60 md:h-80 lg:w-full lg:h-full"
                    src="/hero-image.jpg"
                    alt="Community gathering in nature"
                />
            </div>
        </div>
    );
};

export default Hero;
