import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

export const useAuthCheck = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const checkSession = useAuthStore((state) => state.checkSession);

    useEffect(() => {
        const verifyAuth = () => {
            const isValid = checkSession();
            if (!isValid) {
                // If the session is invalid, redirect to login
                // We show a toast to inform the user why they are being redirected
                toast.error("Session expired or invalid. Please log in again.");
                router.push('/');
            } else {
                setIsLoading(false);
            }
        };

        // Initial check
        verifyAuth();

        // Check session every minute (60000ms)
        const interval = setInterval(verifyAuth, 60000);

        return () => clearInterval(interval);
    }, [checkSession, router]);

    return { isLoading };
};
