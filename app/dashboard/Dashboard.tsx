'use client';

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/useAuthStore";
import { useAuthCheck } from "@/hooks/use-auth-check";
import StudentDashboard from "./student/StudentDashboard";
import CompanyDashboard from "./company/CompanyDashboard";
import UniversityDashboard from "./university/UniversityDashboard";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
    const router = useRouter();
    const { isLoading } = useAuthCheck();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return null; 
    }

    const renderDashboard = () => {
        switch (user.role) {
            case 'student':
                return <StudentDashboard />;
            case 'company':
                return <CompanyDashboard />;
            case 'university':
                return <UniversityDashboard />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                        <h2 className="text-2xl font-bold mb-2">Unknown Role</h2>
                        <p className="text-muted-foreground">
                            Your account type ({user.role}) is not recognized. Please contact support.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="container pt-10 mx-auto max-w-7xl animate-in fade-in duration-500">
            <h1>{user.role}</h1>
            {renderDashboard()}
        </div>
    );
};

export default Dashboard;