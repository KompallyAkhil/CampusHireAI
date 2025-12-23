'use client'
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface User {
    userId : number;
    id : number;
    title : string;
    completed : boolean;
}

const UserSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean()
});

const Dashboard =  () => {
    const router = useRouter();
    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        const checkSession = () => {
            const token = localStorage.getItem('token');
            const expiresAt = localStorage.getItem('session_expires_at');
            
            if (!token || !expiresAt) {
                 router.push('/');
                 return;
            }

            if (expiresAt) {
                const now = Date.now();
                const timeout = parseInt(expiresAt) - now;
                
                if (timeout <= 0) {
                    toast.error("Session expired. Please log in again.");
                    localStorage.removeItem('session_expires_at');
                    localStorage.removeItem('token');
                    router.push('/');
                } else {
                    // Set a timer for the remaining time
                    const timer = setTimeout(() => {
                        toast.error("Session expired. Please log in again.");
                        localStorage.removeItem('session_expires_at');
                        localStorage.removeItem('token');
                        router.push('/');
                    }, timeout);
                    return () => clearTimeout(timer);
                }
            }
        };

        checkSession();
    }, [router]);

    const getDataFromUser = async () => {
        const response = await fetch('/api/users');
        const res = await response.json();
        const validatedData = UserSchema.parse(res);
        console.log(validatedData);
        setData(validatedData);
    }
    console.log(data);
    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={() => getDataFromUser()}>Get Data</Button>
            
        </div>
    );
};

export default Dashboard;