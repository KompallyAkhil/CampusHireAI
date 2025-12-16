'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z } from "zod";
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
    const [data, setData] = useState<User | null>(null);
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