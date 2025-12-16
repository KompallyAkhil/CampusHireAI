'use client'
import React from "react";
import { motion } from "framer-motion";
import { Brain, Shield, TrendingUp, Workflow, GraduationCap, Globe } from "lucide-react";

const Features = () => {
    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-6">
                        Everything you need to <br />
                        <span className="italic text-teal-600">hire better</span>.
                    </h2>
                    <p className="text-lg text-slate-600">
                        A complete suite of tools designed to remove friction and add intelligence to your recruiting process.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                    {/* Card 1: AI Analysis (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 rounded-3xl bg-slate-50 p-8 border border-slate-100 overflow-hidden relative group hover:shadow-xl transition-all duration-300"
                    >
                        <div className="relative z-10">
                            <div className="size-12 rounded-2xl bg-white  shadow-sm flex items-center justify-center mb-6">
                                <Brain className="size-6 text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Deep Context Analysis</h3>
                            <p className="text-slate-600 max-w-md">Our AI doesn't just look for keywords. It reads between the lines to understand a candidate's true potential and soft skills.</p>
                        </div>

                        {/* Visual: Resume Scanning */}
                        <div className="absolute top-8 right-8 w-48 h-64 bg-white  rounded-xl shadow-lg border border-slate-200 p-4 hidden lg:block transform group-hover:scale-105 transition-transform duration-500">
                            <div className="space-y-3 opacity-50">
                                <div className="h-2 w-1/3 bg-slate-200 rounded-full" />
                                <div className="h-2 w-full bg-slate-200 rounded-full" />
                                <div className="h-2 w-5/6 bg-slate-200 rounded-full" />
                                <div className="h-2 w-full bg-slate-200 rounded-full" />
                            </div>
                            <div className="mt-6 space-y-3 opacity-50">
                                <div className="h-2 w-1/4 bg-slate-200 rounded-full" />
                                <div className="h-2 w-full bg-slate-200 rounded-full" />
                                <div className="h-2 w-full bg-slate-200 rounded-full" />
                            </div>
                            {/* Scanner Line */}
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 w-full h-0.5 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                            />
                        </div>
                    </motion.div>

                    {/* Card 2: Campus Hiring */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-1 rounded-3xl bg-slate-50 p-8 border border-slate-100 overflow-hidden relative group hover:shadow-xl transition-all duration-300"
                    >
                        <div className="relative z-10">
                            <div className="size-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-6">
                                <GraduationCap className="size-6 text-teal-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Campus Hiring</h3>
                            <p className="text-slate-600">Helping colleges & universities for a centralized campus hiring process.</p>
                        </div>
                    </motion.div>

                    {/* Card 3: Bias Elimination (Standard) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-50 p-8 border rounded-3xl border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="size-12 rounded-2xl bg-rose-50 flex items-center justify-center">
                                <Workflow className="size-6 text-rose-500" />
                            </div>
                        
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Automation </h3>
                        <p className="text-slate-600 text-sm">Send Email Notifications to candidates</p>
                    </motion.div>

                    {/* Card 4: Analytics (Standard) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-50  p-8 border rounded-3xl border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="size-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                                <TrendingUp className="size-6 text-amber-500" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Predictive Success</h3>
                        <p className="text-slate-600 text-sm mb-6">Data-driven insights on candidate rejection.</p>
                    </motion.div>

                    {/* Card 5: Global SMB Hiring */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bg-slate-50 p-8 border rounded-3xl border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="size-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                <Globe className="size-6 text-indigo-600" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Global SMB Hiring</h3>
                        <p className="text-slate-600 text-sm">Small scale industries to hire people across the world with specific domain.</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Features;
