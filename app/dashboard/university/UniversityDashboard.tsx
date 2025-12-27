'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Building, Users, PieChart, ArrowUpRight, Calendar } from 'lucide-react';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
const UniversityDashboard = () => {
    // Mock data
   
    const stats = {
        totalStudents: 1200,
        placedStudents: 850,
        companiesVisited: 45,
        avgPackage: '8.5 LPA'
    };
    
    const upcomingDrives = [
        { id: 1, company: 'Google', date: 'Jan 20, 2025', roles: ['SDE', 'Cloud Engineer'], eligible: 150 },
        { id: 2, company: 'Microsoft', date: 'Jan 25, 2025', roles: ['SDE-1'], eligible: 200 },
        { id: 3, company: 'Deloitte', date: 'Feb 02, 2025', roles: ['Analyst', 'Consultant'], eligible: 300 },
    ];

    const topPerformers = [
        { id: 1, dept: 'Computer Science', placed: '92%', avg: '12 LPA' },
        { id: 2, dept: 'Electronics', placed: '85%', avg: '8 LPA' },
        { id: 3, dept: 'Information Tech', placed: '88%', avg: '10 LPA' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div 
            className="space-y-6 p-6 md:pb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Placement Cell
                    </h1>
                     <p className="text-muted-foreground mt-1">
                        Overview of campus placement statistics and drives.
                    </p>
                </div>
                 <div className="flex gap-3">
                     <Button variant="outline" className="gap-2">
                        <Users className="h-4 w-4" />
                        Manage Students
                    </Button>
                    <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
                        <Calendar className="h-4 w-4" />
                        Schedule Drive
                    </Button>
                </div>
            </motion.div>

            {/* Stats */}
             <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="hover:shadow-lg transition-shadow border-orange-500/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                        <div className="p-3 bg-orange-500/10 rounded-full">
                            <GraduationCap className="h-6 w-6 text-orange-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.placedStudents}/{stats.totalStudents}</div>
                        <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Placed Students</p>
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow border-orange-500/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                         <div className="p-3 bg-blue-500/10 rounded-full">
                            <Building className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.companiesVisited}</div>
                        <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Companies</p>
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow border-orange-500/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                         <div className="p-3 bg-green-500/10 rounded-full">
                            <PieChart className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold">{Math.round((stats.placedStudents/stats.totalStudents)*100)}%</div>
                        <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Placement Rate</p>
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow border-orange-500/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                        <div className="p-3 bg-yellow-500/10 rounded-full">
                            <ArrowUpRight className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.avgPackage}</div>
                         <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Avg Package</p>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Drives */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Building className="h-5 w-5 text-orange-600" />
                        Upcoming Drives
                    </h2>
                     <div className="grid gap-3">
                        {upcomingDrives.map((drive) => (
                            <Card key={drive.id} className="group hover:border-orange-500/30 transition-all">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg">{drive.company}</h3>
                                        <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">{drive.date}</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {drive.roles.map(role => (
                                            <Badge key={role} variant="secondary" className="text-xs">{role}</Badge>
                                        ))}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {drive.eligible} Eligible Students
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Department Performance */}
                <motion.div variants={itemVariants} className="space-y-4">
                     <h2 className="text-xl font-semibold flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-orange-600" />
                        Department Statistics
                    </h2>
                    <Card>
                        <CardContent className="p-0">
                            {topPerformers.map((dept, index) => (
                                <div key={dept.id} className={`p-4 flex items-center justify-between ${index !== topPerformers.length - 1 ? 'border-b' : ''}`}>
                                    <span className="font-medium">{dept.dept}</span>
                                    <div className="text-right">
                                        <div className="font-bold text-green-600">{dept.placed} Placed</div>
                                        <div className="text-xs text-muted-foreground">Avg: {dept.avg}</div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

        </motion.div>
    );
};

export default UniversityDashboard;
