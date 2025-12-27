'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, CheckCircle, Search, TrendingUp, User, XCircle } from 'lucide-react';
import { motion } from "framer-motion";
const StudentDashboard = () => {
    // Mock data - replace with actual API calls later
  
    const stats = {
        applied: 12,
        shortlisted: 4,
        rejected: 2,
        interviews: 1
    };

    const recommendedJobs = [
        { id: 1, title: 'Frontend Developer', company: 'TechCorp', type: 'Remote', salary: '$80k - $100k' },
        { id: 2, title: 'UX Designer', company: 'CreativeStudio', type: 'Hybrid', salary: '$70k - $90k' },
        { id: 3, title: 'React Native Dev', company: 'AppWorks', type: 'On-site', salary: '$90k - $120k' },
    ];

    const upcomingInterviews = [
        { id: 1, company: 'TechCorp', role: 'Frontend Developer', date: '2025-01-15', time: '10:00 AM' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div 
            className="space-y-6 p-6 pb-20 md:pb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Welcome Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight to-primary/60 bg-clip-text text-transparent">
                        Welcome back!
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Here's what's happening with your job search today.
                    </p>
                </div>
                <div className="flex gap-3">
                     <Button variant="outline" className="gap-2">
                        <User className="h-4 w-4" />
                        Update Profile
                    </Button>
                    <Button className="gap-2">
                        <Search className="h-4 w-4" />
                        Find Jobs
                    </Button>
                </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                        <div className="p-3 bg-blue-500/10 rounded-full">
                            <Briefcase className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.applied}</div>
                        <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Applied</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                         <div className="p-3 bg-yellow-500/10 rounded-full">
                            <TrendingUp className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.shortlisted}</div>
                        <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Shortlisted</p>
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                         <div className="p-3 bg-green-500/10 rounded-full">
                            <Calendar className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.interviews}</div>
                        <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Interviews</p>
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                        <div className="p-3 bg-red-500/10 rounded-full">
                            <XCircle className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.rejected}</div>
                         <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Rejected</p>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recommended Jobs */}
                <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Recommended for you
                    </h2>
                    <div className="grid gap-4">
                        {recommendedJobs.map((job) => (
                            <Card key={job.id} className="group hover:border-primary/50 transition-colors">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                            {job.company.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                                            <p className="text-sm text-muted-foreground">{job.company} • {job.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{job.salary}</p>
                                        <Button size="sm" variant="ghost" className="mt-1 h-8 text-xs">View Details</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Upcoming Interviews & Actions */}
                <motion.div variants={itemVariants} className="space-y-6">
                     <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Upcoming Interviews
                    </h2>
                    <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="p-4 space-y-4">
                            {upcomingInterviews.length > 0 ? (
                                upcomingInterviews.map((interview) => (
                                    <div key={interview.id} className="flex gap-3 items-start border-l-2 border-primary pl-3">
                                        <div>
                                            <p className="font-semibold text-sm">{interview.role}</p>
                                            <p className="text-xs text-muted-foreground">{interview.company}</p>
                                            <Badge variant="secondary" className="mt-2 text-[10px]">
                                                {interview.date} @ {interview.time}
                                            </Badge>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No interviews scheduled yet.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="from-indigo-500/10 to-purple-500/10 border-none">
                         <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Boost your profile</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Complete your skills assessments to increase your chances of getting hired.
                            </p>
                            <Button className="w-full  from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg">
                                Start Assessment
                            </Button>
                         </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default StudentDashboard;
