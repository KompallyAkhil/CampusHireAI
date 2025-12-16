'use client'
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import {  CheckCircle2 , User} from "lucide-react";
import Link from "next/link";
const HeroSection = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e :any) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };
   



    const candidateData = [
        { name: "Alex Chen", role: "Frontend Developer", score: 77, color: "bg-indigo-100 text-indigo-600" },
        { name: "Sarah Jones", role: "Product Designer", score: 87, color: "bg-rose-100 text-rose-600" },
        { name: "Michael Brown", role: "Backend Engineer", score: 85, color: "bg-amber-100 text-amber-600" },
    ]

   

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FDFCF8] text-slate-900 pt-20">
            {/* Organic Background Shapes */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-[#FFE4D6] blur-[120px] opacity-60 mix-blend-multiply animate-pulse duration-[8s]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[#E0F2F1] blur-[120px] opacity-60 mix-blend-multiply animate-pulse duration-[10s] delay-1000" />
                <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full bg-[#F3E5F5] blur-[100px] opacity-50 mix-blend-multiply animate-bounce duration-[12s]" />
            </div>


            <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-7xl">

                {/* Left Content */}
                <div className="flex flex-col items-start text-left space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >   
                        <span className=" inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-medium tracking-wide mb-6 border border-slate-200">
                    <div className="flex size-1.5 rounded-full bg-green-500 animate-pulse">
                    
                    </div>
                            Hiring Reimagined
                            
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] tracking-tight text-slate-900 mb-6">
                            Hiring is <span className="italic text-coral-500">Human</span>. <br />
                            AI just makes it easier.
                        </h1>
                        <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                            We believe in connections, not just collections of resumes. Let our AI handle the noise so you can focus on the person behind the paper.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-wrap gap-4"
                    >
                        <Button asChild size="lg" className="h-14 px-8 cursor-pointer rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 text-lg transition-all hover:scale-105">
                            <Link href="/dashboard">Get Started</Link>
                        </Button>
                        {/* <Button size="lg" variant="ghost" className="h-14 px-8 rounded-2xl text-slate-600 hover:bg-slate-100 text-lg">
                            View Success Stories
                        </Button> */}
                    </motion.div>

                    {/* <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="flex items-center gap-4 pt-4"
                    >
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`size-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden`}>
                                    <User className="size-6 text-slate-400" />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-slate-500">
                            <span className="font-bold text-slate-900">2,000+</span> happy humans hired this week.
                        </div>
                    </motion.div> */}
                </div>

                {/* Right Visual - Interactive Card */}
                <div className="relative flex justify-center lg:justify-end perspective-1000" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8"
                    >
                        {/* Candidate List Simulation */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-teal-100 flex items-center justify-center">
                                        <span className="font-bold text-teal-700">AI</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">Top Candidates</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-1">
                                            <span className="size-1.5 rounded-full bg-green-500 animate-pulse" /> Live Matching
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {candidateData.map((candidate, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1 + index * 0.5, duration: 0.5 }}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                                    >
                                        <div className={`size-10 rounded-full ${candidate.color} flex items-center justify-center font-bold text-sm`}>
                                            {candidate.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-semibold text-slate-900 text-sm">{candidate.name}</h4>
                                                <span className="text-xs font-bold text-teal-600">{candidate.score}% Match</span>
                                            </div>
                                            <div className="text-xs text-slate-500 mb-1.5">{candidate.role}</div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${candidate.score}%` }}
                                                    transition={{ delay: 1.5 + index * 0.5, duration: 1, ease: "easeOut" }}
                                                    className="h-full bg-teal-500 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 bg-white p-3 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-2"
                        >
                            <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle2 className="size-5 text-green-600" />
                            </div>
                            <span className="font-medium text-slate-700 text-sm">98% Match</span>
                        </motion.div>

                    </motion.div>
                </div>

            </div>
        </section>
    );
};



export default HeroSection;
