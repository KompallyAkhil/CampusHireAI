import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

export const useAuthCheck = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const checkSession = useAuthStore((state) => state.checkSession);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    useEffect(() => {
        const verifyAuth = () => {
            const isValid = checkSession();
            if (!isValid) {
                toast.error("Session expired or invalid. Please log in again.");
                router.push('/');
            } else {
                setIsLoading(false);
            }
        };
        const interval = setInterval(verifyAuth, 1000);
        return () => clearInterval(interval);
    }, [checkSession, isAuthenticated, router]);

    return { isLoading };
};
