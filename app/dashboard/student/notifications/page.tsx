"use client";
import { useEffect, useState } from "react";
import { Loader2, Timer } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Alert {
  id: number;
  title: string;
  message: string;
  deadline: string;
  created_at: string;
}

export default function StudentNotificationsPage() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [now, setNow] = useState(Date.now());

    // Poll for new alerts every 30 seconds
    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch("/api/alerts");
                if (res.ok) {
                    const data = await res.json();
                    setAlerts(data);
                }
            } catch (error) {
                console.error("Failed to fetch alerts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
        // const interval = setInterval(fetchAlerts, 30000);
        // return () => clearInterval(interval);
    }, []);

    // Update timer every second
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const getTimeRemaining = (deadline: string) => {
        const deadlineTime = new Date(deadline).getTime();
        const diff = deadlineTime - now;

        if (diff <= 0) return "Expired";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    if (loading) {
        return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Notifications</h1>
             <div className="space-y-4">
                {alerts.length === 0 && <p className="text-gray-500">No new notifications.</p>}
                
                {alerts.map((alert) => {
                    const isExpired = new Date(alert.deadline).getTime() <= now;
                    return (
                        <div key={alert.id} className="p-4 bg-white rounded-lg shadow border flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg text-primary">{alert.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{alert.message}</p>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
                                </span>
                            </div>
                            
                            <div className={`mt-2 flex items-center gap-2 text-sm font-medium ${isExpired ? "text-red-500" : "text-green-600"}`}>
                                <Timer size={16} />
                                <span>
                                    {isExpired ? "Deadline Passed" : `Time Left: ${getTimeRemaining(alert.deadline)}`}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
