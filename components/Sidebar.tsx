'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  User,
  BarChart3,
  Bell,
  Megaphone
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const logout = useAuthStore((state) => state.logout);
    const pathname = usePathname();
    const user = useAuthStore((state) => state.user);
    // console.log(user?.name);
    const [hasNewNotification, setHasNewNotification] = useState(false);

    // Poll for notifications
    useEffect(() => {
        if (user?.role !== 'student') return;

        const checkNotifications = async () => {
            try {
                const res = await fetch('/api/alerts');
                if (res.ok) {
                    const alerts = await res.json();
                    if (alerts.length > 0) {
                        const latestAlert = alerts[0];
                        const lastReadTime = localStorage.getItem('last_read_alert_time');
                        
                        if (!lastReadTime || new Date(latestAlert.created_at).getTime() > new Date(lastReadTime).getTime()) {
                            setHasNewNotification(true);
                        }
                    }
                }
            } catch (error) {
                console.error("Error checking notifications:", error);
            }
        };

        checkNotifications();
        // const interval = setInterval(checkNotifications, 30000); // Check every 30s
        // return () => clearInterval(interval);
    }, [user?.role]);

    const handleNavClick = (href: string) => {
        if (href === '/dashboard/student/notifications') {
            setHasNewNotification(false);
            localStorage.setItem('last_read_alert_time', new Date().toISOString());
        }
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    const getNavItems = () => {
        const commonItems = [
             { icon: Home, label: 'Home', href: '/' },
             { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        ];

        if (user?.role === 'university') {
            return [
                ...commonItems,
                { icon: Bell, label: 'Notifications', href: '/dashboard/university/notifications' },
                { icon: Megaphone, label: 'Create Alert', href: '/dashboard/university/alerts/create' },
            ];
        }

        if (user?.role === 'student') {
            return [
                ...commonItems,
                { icon: Bell, label: 'Notifications', href: '/dashboard/student/notifications' },
            ];
        }

        return commonItems;
    };

    const navItems = getNavItems();

    return (
        <motion.div 
            initial={{ width: isCollapsed ? 80 : 250 }}
            animate={{ width: isCollapsed ? 80 : 250 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 20 }}
            className="h-screen sticky top-0 bg-background border-r border-border/50 flex flex-col z-50 shadow-xl"
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-border/50 h-16">
                {!isCollapsed && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                         <div className="relative size-8 cursor-pointer rounded-xl bg-primary flex items-center justify-center overflow-hidden">
                            <Image src="/images/campushire.png" width={40} height={40} className="h-full w-full object-cover" alt="Logo" />
                        </div>
                        <span className="font-bold text-lg text-nowrap overflow-hidden cursor-pointer">CampusHire</span>
                    </motion.div>
                )}
                {isCollapsed && (
                     <div className="mx-auto cursor-pointer relative size-8 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
                        <Image src="/images/campushire.png" width={40} height={40} className="h-full w-full object-cover" alt="Logo" />
                    </div>
                )}
            </div>

            {/* Toggle Button */}
             <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 bg-background border border-border rounded-full p-1 shadow-md hover:bg-accent transition-colors z-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Nav Items */}
            <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = (item.href === '/' || item.href === '/dashboard')
                        ? pathname === item.href 
                        : pathname === item.href || pathname?.startsWith(item.href + '/');

                    return (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all group relative ${
                                isActive 
                                    ? 'bg-primary text-primary-foreground shadow-md' 
                                    : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <div className="relative">
                                <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-foreground'} />
                                {item.label === 'Notifications' && hasNewNotification && (
                                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                )} 
                            </div>
                            
                            {!isCollapsed && (
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="font-medium whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </Link>
                    )
                })}
            </div>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-border/50">
                 <button
                    onClick={handleLogout}
                     className={`flex items-center cursor-pointer gap-3 px-3 py-2 rounded-xl w-full transition-all hover:bg-gray-100 ${
                        isCollapsed ? 'justify-center' : ''
                     }`}
                >
                    <div className={`rounded-full bg-gray-200 w-8 h-8 flex justify-center items-center`}>{user?.name?.toString().charAt(0)}</div>
                    {!isCollapsed && (
                        <motion.span 
                        initial={{ opacity: 0 }}    
                        animate={{ opacity: 1 }}
                        className="font-medium whitespace-nowrap"
                        >
                            Logout
                        </motion.span>
                    )}
                    {/* <LogOut size={20} className='text-destructive' /> */}
                </button>
            </div>
        </motion.div>
    );
};
