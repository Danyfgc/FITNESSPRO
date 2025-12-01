import React from 'react';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
    const photos = [
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            alt: 'Comunidad reunida',
            caption: 'Nuestras reuniones dominicales',
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            alt: 'Grupo de jóvenes',
            caption: 'Grupo de jóvenes',
        },
        {
            id: 3,
            src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            alt: 'Ayuda social',
            caption: 'Sirviendo a la comunidad',
        },
        {
            id: 4,
            src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            alt: 'Música y adoración',
            caption: 'Tiempo de adoración',
        },
        {
            id: 5,
            src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            alt: 'Estudio bíblico',
            caption: 'Creciendo juntos',
        },
        {
            id: 6,
            src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            alt: 'Amistad',
            caption: 'Amistades verdaderas',
        },
    ];

    return (
        <section id="gallery" className="py-20 bg-teal-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Nuestra Comunidad en Fotos
                    </h2>
                    <p className="mt-4 text-xl text-gray-500">
                        Momentos especiales que compartimos juntos.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-xl shadow-lg aspect-w-3 aspect-h-2 cursor-pointer"
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="object-cover w-full h-64 transform transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white text-lg font-semibold">{photo.caption}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
