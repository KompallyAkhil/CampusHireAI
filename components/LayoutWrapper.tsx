'use client';

import { useAuthStore } from "@/store/useAuthStore";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const checkSession = useAuthStore((state) => state.checkSession);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        checkSession();
        setIsLoading(false);
    }, [checkSession]);

    const isDashboard = pathname?.startsWith('/dashboard');

    if (isLoading) {
         return <>{children}</>; 
    }

    if (isAuthenticated && isDashboard) {
        return (
            <div className="flex min-h-screen bg-background text-foreground">
                <Sidebar />
                <main className="flex-1 w-full relative overflow-y-auto h-screen">
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            {children}
        </div>
    );
}
