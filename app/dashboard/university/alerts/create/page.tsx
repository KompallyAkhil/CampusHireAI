"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";

export default function CreateAlertPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        deadline: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post("http://127.0.0.1:8000/alerts", formData);

            toast.success("Alert created successfully!");
            setFormData({ title: "", message: "", deadline: "" });
        } catch (error: any) {
             const errorMessage = error.response?.data?.detail || error.message || "Failed to create alert";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Create Alert for Students</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow border">
                <div>
                    <label className="block text-sm font-medium mb-1">Alert Title</label>
                    <input 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        type="text" 
                        required
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" 
                        placeholder="e.g., Campus Drive Tomorrow"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none h-32" 
                        placeholder="Write your message here..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Application Deadline</label>
                    <input 
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        type="datetime-local" 
                        required
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" 
                    />
                </div>
                {/* Additional fields like 'Target Batch', 'Priority' could be added */}
                <Button disabled={isLoading} className="w-full bg-primary text-white hover:bg-primary/90">
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                    Send Alert
                </Button>
            </form>
        </div>
    );
}
