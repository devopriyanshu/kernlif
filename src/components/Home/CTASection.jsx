import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Building2, CheckCircle, ChevronRight, ArrowRight, ChevronDown } from 'lucide-react';

const CTASection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
          question: "What is this wellness platform about?",
          answer: "Our platform helps you manage your mental and physical well-being by connecting you to verified health experts, wellness centers, and providing a comprehensive dashboard to track your health metrics.",
        },
        {
          question: "How can I connect with a health expert?",
          answer: "You can browse and filter through a list of certified doctors, therapists, and trainers. Book appointments directly through their profiles based on availability.",
        },
        {
          question: "Can I find wellness centers near me?",
          answer: "Yes, use our 'Find Centers' feature to locate wellness centers by location, services, amenities, and user ratings.",
        },
        {
          question: "What features does the wellness dashboard offer?",
          answer: "The dashboard allows you to track activities, nutrition, sleep, appointments, and trends — all in one sleek, personalized interface.",
        },
        {
          question: "Is my personal health data secure?",
          answer: "Absolutely. We use industry-standard encryption and do not share your data with any third parties without your consent.",
        },
        {
          question: "Do I need a subscription to use the platform?",
          answer: "Core features are free. For advanced analytics, unlimited expert access, and premium content, you can upgrade to a subscription plan anytime.",
        },
    ];

  return (
    <>
        {/* FAQ Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
                Frequently Asked Questions
            </h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden"
                >
                    <button
                    onClick={() => toggle(index)}
                    className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium focus:outline-none"
                    >
                    <span className="text-lg">{faq.question}</span>
                    <ChevronDown
                        className={`transition-transform duration-200 text-gray-500 ${
                        openIndex === index ? "rotate-180" : ""
                        }`}
                    />
                    </button>
                    <div 
                        className={`px-6 text-gray-600 bg-gray-50 transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                    >
                        {faq.answer}
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Join Network Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
            <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Join Our Wellness Network
                </h2>
                <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Partner with WellNest to expand your reach and help more people on
                their wellness journey. Whether you're a health expert or wellness
                center, we provide the platform to grow your impact.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* For Experts */}
                <motion.div
                className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                >
                <div className="flex items-center mb-8">
                    <div className="bg-blue-500 p-4 rounded-2xl mr-5 shadow-lg shadow-blue-500/30">
                        <Brain className="text-white" size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">For Wellness Experts</h3>
                        <p className="text-blue-200 text-sm">Doctors, Therapists & Coaches</p>
                    </div>
                </div>

                <p className="text-blue-100 mb-8 text-lg">
                    Share your expertise with thousands of users seeking guidance. Build your practice and make a meaningful impact.
                </p>

                <ul className="space-y-4 mb-10">
                    {[
                        "Create your professional profile and showcase credentials",
                        "Manage appointments and client communications",
                        "Access analytics and grow your client base"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start">
                             <CheckCircle className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-blue-50">{item}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    to="/partner-login?role=expert"
                     className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl transition duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-blue-500/25"
                >
                    Register as Expert
                    <ChevronRight className="ml-2" size={20} />
                </Link>
                </motion.div>

                {/* For Centers */}
                <motion.div
                className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                >
                <div className="flex items-center mb-8">
                    <div className="bg-purple-500 p-4 rounded-2xl mr-5 shadow-lg shadow-purple-500/30">
                        <Building2 className="text-white" size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">For Wellness Centers</h3>
                        <p className="text-purple-200 text-sm">Gyms, Spas & Studios</p>
                    </div>
                </div>

                <p className="text-blue-100 mb-8 text-lg">
                    List your wellness center and connect with health-conscious individuals. Increase visibility and grow your membership.
                </p>

                <ul className="space-y-4 mb-10">
                    {[
                        "Showcase facilities, services, and class schedules",
                        "Manage bookings and membership subscriptions",
                        "Track performance metrics and customer feedback"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start">
                             <CheckCircle className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-blue-50">{item}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    to="/partner-login?role=center"
                    className="w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-4 px-6 rounded-xl transition duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-purple-500/25"
                >
                    Register Your Center
                    <ChevronRight className="ml-2" size={20} />
                </Link>
                </motion.div>
            </div>

            {/* Contact Information */}
            <div className="text-center border-t border-white/10 pt-16">
                <h3 className="text-2xl font-bold mb-4">
                Need More Information?
                </h3>
                <p className="text-blue-200 mb-8 max-w-xl mx-auto">
                Our partnership team is here to help you get started and answer
                any questions about joining our network.
                </p>
                <button className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-flex items-center">
                    Contact Partnership Team
                    <ArrowRight className="ml-2" size={18} />
                </button>
            </div>
            </div>
        </section>
    </>
  );
};

export default CTASection;
