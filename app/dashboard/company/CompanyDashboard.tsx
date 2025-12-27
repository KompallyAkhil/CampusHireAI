'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText, TrendingUp, Plus, MoreHorizontal } from 'lucide-react';
import { motion } from "framer-motion";

const CompanyDashboard = () => {
    // Mock data
    const stats = {
        activeJobs: 5,
        totalApplications: 128,
        interviewsScheduled: 12,
        hired: 3
    };

    const activeListings = [
        { id: 1, title: 'Senior Frontend Engineer', applicants: 45, status: 'Active', posted: '2 days ago' },
        { id: 2, title: 'Product Designer', applicants: 32, status: 'Active', posted: '5 days ago' },
        { id: 3, title: 'Backend Developer', applicants: 18, status: 'Closing Soon', posted: '1 week ago' },
    ];

    const recentApplicants = [
        { id: 1, name: 'Alex Johnson', role: 'Frontend Engineer', experience: '3 years', match: '95%' },
        { id: 2, name: 'Sarah Williams', role: 'Product Designer', experience: '5 years', match: '88%' },
        { id: 3, name: 'Mike Chen', role: 'Frontend Engineer', experience: '2 years', match: '92%' },
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
            className="space-y-6 p-6 pb-20 md:pb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
             {/* Header */}
             <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Recruiter Dashboard
                    </h1>
                     <p className="text-muted-foreground mt-1">
                        Manage your job postings and track candidate applications.
                    </p>
                </div>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                    Post New Job
                </Button>
            </motion.div>

             {/* Stats */}
             <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="hover:shadow-lg transition-shadow border-blue-500/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                        <div className="p-3 bg-blue-500/10 rounded-full">
                            <FileText className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.activeJobs}</div>
                        <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Active Jobs</p>
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow border-blue-500/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                         <div className="p-3 bg-purple-500/10 rounded-full">
                            <Users className="h-6 w-6 text-purple-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.totalApplications}</div>
                        <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Total Applicants</p>
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow border-blue-500/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                         <div className="p-3 bg-indigo-500/10 rounded-full">
                            <Building2 className="h-6 w-6 text-indigo-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.interviewsScheduled}</div>
                        <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Interviews</p>
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow border-blue-500/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                        <div className="p-3 bg-green-500/10 rounded-full">
                            <TrendingUp className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.hired}</div>
                         <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Hired</p>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Listings */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Active Listings</h2>
                        <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
                    </div>
                    <div className="grid gap-3">
                        {activeListings.map((job) => (
                            <Card key={job.id} className="group hover:border-blue-500/30 transition-all">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">{job.title}</h3>
                                        <div className="flex gap-2 mt-1">
                                            <Badge variant="secondary" className="text-[10px]">{job.status}</Badge>
                                            <span className="text-xs text-muted-foreground flex items-center">Posted {job.posted}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-blue-600">{job.applicants}</p>
                                        <p className="text-xs text-muted-foreground">Applicants</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Applications */}
                 <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Recent Applicants</h2>
                        <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
                    </div>
                     <Card className="border-blue-500/10">
                        <CardContent className="p-0">
                            {recentApplicants.map((applicant, index) => (
                                <div key={applicant.id} className={`p-4 flex items-center justify-between hover:bg-muted/50 transition-colors ${index !== recentApplicants.length -1 ? 'border-b border-border' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold">
                                            {applicant.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{applicant.name}</p>
                                            <p className="text-xs text-muted-foreground">{applicant.role} • {applicant.experience}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Badge className={`
                                            ${parseInt(applicant.match) > 90 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}
                                        `}>
                                            {applicant.match} Match
                                        </Badge>
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

export default CompanyDashboard;
