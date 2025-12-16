import React from "react";
import { Github, Linkedin, Twitter, Mail, Phone } from "lucide-react";

import Image from "next/image";
const Footer = () => {

    const contact = [
        {
            info: "support@campushireai.com",
            icon: Mail
        },
        {
            info: "tel:+911234567890",
            icon: Phone
        }
    ]

    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <a href="#home" className="flex items-center gap-2 mb-6 group w-fit">
                            <div className="relative size-8 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
                                <Image src="/images/gpt1.png" width={100} height={100} className="h-full w-full object-cover" alt="Logo" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                                CampusHire AI
                            </span>
                        </a>
                        <p className="text-slate-500 leading-relaxed mb-6 max-w-sm">
                            Revolutionizing campus hiring with ethical AI. We bridge the gap between talent and opportunity, ensuring fair access for everyone.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="size-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                <Github className="size-5" />
                            </a>
                            <a href="#" className="size-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                <Linkedin className="size-5" />
                            </a>
                            <a href="#" className="size-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                <Twitter className="size-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="#home" className="text-slate-500 hover:text-primary transition-colors">Home</a>
                            </li>
                            <li>
                                <a href="#features" className="text-slate-500 hover:text-primary transition-colors">Features</a>
                            </li>
                            <li>
                                <a href="#about" className="text-slate-500 hover:text-primary transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="#workflow" className="text-slate-500 hover:text-primary transition-colors">How it Works</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Contact</h4>
                        <ul className="space-y-4">
                            
                            <li>
                                <a href="mailto:support@campushireai.com" className="flex items-center gap-3 text-slate-500 hover:text-primary transition-colors group">
                                    <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <Mail className="size-4" />
                                    </div>
                                    campushireai@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+911234567890" className="flex items-center gap-3 text-slate-500 hover:text-primary transition-colors group">
                                    <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <Phone className="size-4" />
                                    </div>
                                    +91 123 456 7890
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm font-medium">
                        © {new Date().getFullYear()} CampusHire AI. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-slate-400 text-sm font-medium hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="text-slate-400 text-sm font-medium hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
