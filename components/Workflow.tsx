'use client'
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Upload, Brain, MailCheck, FileText, ArrowDown, GraduationCap, School, Building2, BookOpen, Globe, Laptop } from "lucide-react";

const Workflow = () => {
    const steps = [
        {
            icon: <Briefcase className="size-6 text-white" />,
            title: "Job Opening",
            description: "Recruiters or Universities post job openings with detailed Job Descriptions (JD).",
            color: "bg-slate-900"
        },
        {
            icon: <Upload className="size-6 text-white" />,
            title: "Resume Upload",
            description: "Students upload their resumes tailored to the specific role and JD.",
            color: "bg-indigo-600"
        },
        {
            icon: <Brain className="size-6 text-white" />,
            title: "AI Screening",
            description: "Our AI analyzes resumes against the JD, identifying the best matches instantly.",
            color: "bg-teal-600"
        },
        {
            icon: <MailCheck className="size-6 text-white" />,
            title: "Automated Shortlist",
            description: "Shortlisted candidates receive automated emails with next steps.",
            color: "bg-green-600"
        },
        {
            icon: <FileText className="size-6 text-white" />,
            title: "Constructive Feedback",
            description: "Rejected candidates receive personalized feedback on their resume gaps.",
            color: "bg-rose-600"
        }
    ];

    return (
        <section id="workflow" className="py-24 bg-white relative overflow-hidden">
            {/* Floating Background Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[
                    { Icon: GraduationCap, top: "10%", left: "5%", delay: 0 },
                    { Icon: School, top: "20%", right: "10%", delay: 2 },
                    { Icon: Building2, bottom: "25%", left: "15%", delay: 1 },
                    { Icon: BookOpen, top: "40%", right: "5%", delay: 3 },
                    { Icon: Globe, bottom: "30%", right: "20%", delay: 1.5 },
                    { Icon: Laptop, top: "40%", left: "10%", delay: 2.5 },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: [0.03, 0.08, 0.03],
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 5 + index,
                            repeat: Infinity,
                            delay: item.delay,
                            ease: "easeInOut"
                        }}
                        className="absolute text-slate-900"
                        style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                    >
                        <item.Icon className="size-12 md:size-24" />
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-slate-50 text-slate-600 text-sm font-medium tracking-wide mb-6 border border-slate-200"
                    >
                        How It Works
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-6"
                    >
                        Streamlined hiring in <span className="italic text-teal-600">5 simple steps</span>.
                    </motion.h2>
                </div>

                {/* Steps Timeline */}
                <div className="max-w-4xl mx-auto relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2 hidden md:block" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex items-center gap-8 mb-12 md:mb-24 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Content Side */}
                            <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{step.description}</p>
                            </div>

                            {/* Center Icon */}
                            <div className="relative z-10 shrink-0">
                                <div className={`size-16 rounded-2xl ${step.color} flex items-center justify-center shadow-xl shadow-slate-200`}>
                                    {step.icon}
                                </div>
                            </div>

                            {/* Empty Side for Balance */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Workflow;
