import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Heart } from 'lucide-react';

const InfoTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState('horarios');

    const tabs = [
        { id: 'horarios', label: 'Horarios', icon: Clock },
        { id: 'ministerios', label: 'Ministerios', icon: Users },
        { id: 'creencias', label: 'Creencias', icon: Heart },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const content = {
        horarios: (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                <motion.h3 variants={itemVariants} className="text-2xl font-bold text-gray-800">Nuestros Horarios</motion.h3>

                <motion.div variants={itemVariants} className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                    <h4 className="text-lg font-semibold text-teal-800 mb-4">Reuniones de Grupos - Viernes 19:00</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                        {['UCE', 'Cristo Joven', 'La Fuerza del Espíritu', 'Católicos en Acción'].map((group) => (
                            <li key={group} className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                <span>{group}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="border-t border-gray-100 pt-4">
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center space-x-3">
                            <span className="w-24 font-semibold text-teal-600">Domingos:</span>
                            <span>10:00 AM - Culto General</span>
                        </li>
                    </ul>
                </motion.div>
            </motion.div>
        ),
        ministerios: (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
            >
                <motion.h3 variants={itemVariants} className="text-2xl font-bold text-gray-800">Ministerios</motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { title: 'Niños', desc: 'Enseñanza divertida y bíblica para los más pequeños.' },
                        { title: 'Jóvenes', desc: 'Un espacio para conectar y crecer juntos.' },
                        { title: 'Alabanza', desc: 'Adoración contemporánea y apasionada.' },
                        { title: 'Acción Social', desc: 'Sirviendo a nuestra comunidad con amor.' }
                    ].map((min) => (
                        <motion.div key={min.title} variants={itemVariants} className="p-4 bg-teal-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                            <h4 className="font-bold text-teal-700">{min.title}</h4>
                            <p className="text-sm text-gray-600">{min.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        ),
        creencias: (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
            >
                <motion.h3 variants={itemVariants} className="text-2xl font-bold text-gray-800">En qué creemos</motion.h3>
                <motion.p variants={itemVariants} className="text-gray-600">
                    Creemos en un Dios de amor que desea tener una relación personal con cada uno de nosotros.
                    Nuestra fe se basa en la Biblia y en la persona de Jesucristo.
                </motion.p>
                <motion.p variants={itemVariants} className="text-gray-600">
                    Valoramos la autenticidad, la comunidad y el servicio a los demás.
                </motion.p>
            </motion.div>
        ),
    };

    return (
        <section id="info" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Conoce más sobre nosotros
                        </h2>
                        <p className="mt-4 text-xl text-gray-500">
                            Información útil para tu visita y participación.
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-wrap justify-center space-x-2 mb-8 bg-gray-100 p-1 rounded-xl">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeTab === tab.id
                                        ? 'bg-white text-teal-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                    }
                `}
                            >
                                <Icon size={18} className="mr-2" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 min-h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {content[activeTab as keyof typeof content]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default InfoTabs;
