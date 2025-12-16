'use client'
import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Globe, Zap, Heart, Shield } from "lucide-react";

const About = () => {
    const values = [
        {
            icon: <Heart className="size-6 text-rose-600" />,
            title: "Human-First",
            description: "Technology should empower connections, not replace them. We build for people first."
        },
        {
            icon: <Shield className="size-6 text-indigo-600" />,
            title: "Unbiased",
            description: "We're committed to removing prejudice from the hiring equation through ethical AI."
        },
        {
            icon: <Globe className="size-6 text-teal-600" />,
            title: "Global Reach",
            description: "Talent is everywhere. We help you find it, regardless of geography or background."
        }
    ];

    return (
        <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">

                {/* Mission Statement */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-white text-slate-600 text-sm font-medium tracking-wide mb-6 border border-slate-200 shadow-sm"
                    >
                        Our Mission
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif font-medium text-slate-900 mb-8 leading-tight"
                    >
                        Bridging the gap between <br className="hidden md:block" />
                        <span className="italic text-indigo-600">talent</span> and <span className="italic text-teal-600">opportunity</span>.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto"
                    >
                        We're democratizing campus hiring using ethical AI, ensuring every student gets a fair shot and every company finds their perfect match.
                    </motion.p>
                </div>

                {/* Core Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default About;