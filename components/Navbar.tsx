'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { RoleSelectionDialog } from "./RoleSelectionDialog";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const expiresAt = localStorage.getItem('session_expires_at');
        
        if (token && expiresAt) {
            const now = Date.now();
            if (parseInt(expiresAt) > now) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                localStorage.removeItem('session_expires_at');
                localStorage.removeItem('token');
            }
        } else {
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        checkAuth();
        // Check auth status periodically or on focus
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    // Also check on mount and interval
    useEffect(() => {
        const interval = setInterval(checkAuth, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        try {
            // Remove local storage items
            localStorage.removeItem('session_expires_at');
            localStorage.removeItem('token');
            
            // Force update
            window.dispatchEvent(new Event("storage"));
            setIsLoggedIn(false);
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const getNavbarWidth = () => {
        if (windowWidth < 768) return "95%";
        if (windowWidth < 1024) return scrolled ? "85%" : "90%";
        if (windowWidth < 1280) return scrolled ? "70%" : "80%";
        return scrolled ? "55%" : "70%";
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Features", href: "#features" },
        { name: "How it Works", href: "#workflow" },
    ];

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
                <motion.nav
                    initial={{ width: "95%", y: -100, opacity: 0 }}
                    animate={{
                        width: getNavbarWidth(),
                        y: 0,
                        opacity: 1
                    }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                    className="pointer-events-auto rounded-2xl transition-colors duration-300 border bg-background/70 backdrop-blur-xl border-border/50 shadow-lg"
                    style={{
                        maxWidth: "1200px"
                    }}
                >
                    <div className="px-4 md:px-6">
                        <div className="flex h-16 items-center justify-between">

                            <div className="flex items-center gap-2 group">
                                <div className="relative size-9 rounded-2xl bg-primary flex items-center justify-center overflow-hidden">
                                    <Image src="/images/campushire.png" width={100} height={100} className="h-full w-full object-cover" alt="Logo" />
                                    <div className="absolute inset-0 bg-white/20 opacity-0" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text from-foreground to-foreground/70">
                                    <Link href="/">
                                    CampusHire AI
                                    </Link>
                                </span>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-border/50">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="relative px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground rounded-full hover:bg-background/80"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>

                            {/* Right Side */}
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex">
                                    {isLoggedIn ? (
                                        <Button 
                                            onClick={handleLogout}
                                            className="bg-primary cursor-pointer hover:bg-primary/80 shadow-lg border-0"
                                        >
                                            Logout
                                        </Button>
                                    ) : (
                                        <RoleSelectionDialog>
                                            <Button className="bg-primary cursor-pointer hover:bg-primary/80 shadow-lg shadow-indigo-500/20 border-0">
                                                Login
                                            </Button>
                                        </RoleSelectionDialog>
                                    )}
                                </div>

                                {/* Mobile Menu Toggle */}
                                <button
                                    className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={toggleMenu}
                                    aria-label="Toggle menu"
                                >
                                    {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, margin: 0 }}
                                animate={{ opacity: 1, height: "auto", margin: "8px" }}
                                exit={{ opacity: 0, height: 0, margin: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="md:hidden cursor-pointer overflow-hidden bg-background/95 backdrop-blur-xl rounded-xl border border-border/50 mx-2 mb-2"
                            >
                                <div className="p-4 flex cursor-pointer flex-col gap-2">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                            <ChevronRight className="size-4 opacity-50" />
                                        </a>
                                    ))}
                                    <div className="pt-2 mt-2 border-t border-border/50">
                                        {isLoggedIn ? (
                                            <Button 
                                                onClick={handleLogout}
                                                className="w-full rounded-xl bg-destructive border-0"
                                            >
                                                Logout
                                            </Button>
                                        ) : (
                                            <RoleSelectionDialog>
                                                <Button className="w-full rounded-xl bg-primary border-0">
                                                    Login
                                                </Button>
                                            </RoleSelectionDialog>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>

            </div>
        </>
    );
};

export default Navbar;
