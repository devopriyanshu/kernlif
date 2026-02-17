import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Dumbbell, CheckCircle } from 'lucide-react';

const CenterFeatures = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="mx-auto text-center max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Find & Manage Wellness Centers with Ease
            </h2>
            <p className="text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
            Explore nearby gyms, yoga studios, and wellness centers and manage
            your subscriptions from one dashboard.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
            {
                title: "Nearby Health Centers",
                desc: "Discover top-rated gyms and wellness hubs close to your location using smart filters and maps.",
                icon: MapPin,
            },
            {
                title: "Manage Subscriptions",
                desc: "Easily view, renew, or cancel your memberships and class packages directly from your dashboard.",
                icon: CreditCard,
            },
            {
                title: "Center Details & Reviews",
                desc: "Read expert and user reviews, view photos, amenities, pricing, and classes before joining.",
                icon: Dumbbell,
            },
            {
                title: "Book Classes & Sessions",
                desc: "Schedule classes or 1-on-1 sessions with trainers, therapists, or yoga instructors in one click.",
                icon: CheckCircle,
            },
            ].map((item, index) => (
            <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-100 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
            >
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        <item.icon size={32} />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                </p>
            </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CenterFeatures;
