"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Users,
  FileText,
  TrendingUp,
  Plus,
  MoreHorizontal,
  School,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
const CompanyDashboard = () => {
  const { user } = useAuthStore();
  // Mock data
  const stats = {
    activeJobs: 5,
    totalApplications: 128,
    interviewsScheduled: 12,
    hired: 3,
  };

  const activeListings = [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      applicants: 45,
      status: "Active",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Product Designer",
      applicants: 32,
      status: "Active",
      posted: "5 days ago",
    },
    {
      id: 3,
      title: "Backend Developer",
      applicants: 18,
      status: "Closing Soon",
      posted: "1 week ago",
    },
  ];

  const recentApplicants = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Frontend Engineer",
      experience: "3 years",
      match: "95%",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Product Designer",
      experience: "5 years",
      match: "88%",
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "Frontend Engineer",
      experience: "2 years",
      match: "92%",
    },
  ];

  const [universities, setUniversities] = useState<any[]>([]);
  const [isLoadingUniversities, setIsLoadingUniversities] = useState(true);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const [inviteData, setInviteData] = useState({
    jobTitle: "",
    jobDescription: "",
  });

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/fetchUniversities",
        );
        setUniversities(response.data || []);
        // const { data, error } = await supabase
        //     .from('users')
        //     .select('*')
        //     .eq('role', 'university');

        // if (error) throw error;
        // setUniversities(data || []);
      } catch (error) {
        console.error("Error fetching universities:", error);
        toast.error("Failed to load universities");
      } finally {
        setIsLoadingUniversities(false);
      }
    };

    fetchUniversities();
  }, []);

  const handleOpenInvite = (uni: any) => {
    setSelectedUniversity(uni);
    setIsInviteDialogOpen(true);
  };

  const handleSendInvite = async () => {
    if (!inviteData.jobTitle || !inviteData.jobDescription) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { error } = await supabase.from("invites").insert({
        company_id: user?.id,
        university_id: selectedUniversity.id,
        company_name: user?.name || "Company Name", // Fallback if name is missing
        job_title: inviteData.jobTitle,
        job_description: inviteData.jobDescription,
        status: "pending",
      });

      if (error) throw error;

      toast.success(`Invite sent to ${selectedUniversity.name}`);
      setIsInviteDialogOpen(false);
      setInviteData({ jobTitle: "", jobDescription: "" });
    } catch (error: any) {
      console.error("Error sending invite:", error);
      toast.error(error.message || "Failed to send invite");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="space-y-6 p-6 pb-20 md:pb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">
            Recruiter Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your job postings, track candidate applications and invite
            universities.
          </p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Post New Job
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="hover:shadow-lg transition-shadow border-blue-500/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{stats.activeJobs}</div>
            <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">
              Active Jobs
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow border-blue-500/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-purple-500/10 rounded-full">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">
              Total Applicants
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow border-blue-500/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-indigo-500/10 rounded-full">
              <Building2 className="h-6 w-6 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold">
              {stats.interviewsScheduled}
            </div>
            <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">
              Interviews
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow border-blue-500/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-green-500/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{stats.hired}</div>
            <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">
              Hired
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Universities List - NEW SECTION */}
        <motion.div variants={itemVariants} className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <School className="h-5 w-5 text-blue-600" />
              Partner Universities
            </h2>
          </div>
          {isLoadingUniversities ? (
            <div className="text-center py-4 text-muted-foreground">
              Loading universities...
            </div>
          ) : universities.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No universities found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {universities.map((uni) => (
                <Card
                  key={uni.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {uni.name ? uni.name.charAt(0) : "U"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{uni.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {uni.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => handleOpenInvite(uni)}
                    >
                      <Send className="h-3 w-3" /> Invite
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>

        {/* Active Listings */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Listings</h2>
            <Button variant="ghost" size="sm" className="text-blue-600">
              View All
            </Button>
          </div>
          <div className="grid gap-3">
            {activeListings.map((job) => (
              <Card
                key={job.id}
                className="group hover:border-blue-500/30 transition-all"
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">
                        {job.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        Posted {job.posted}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-blue-600">
                      {job.applicants}
                    </p>
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
            <Button variant="ghost" size="sm" className="text-blue-600">
              View All
            </Button>
          </div>
          <Card className="border-blue-500/10">
            <CardContent className="p-0">
              {recentApplicants.map((applicant, index) => (
                <div
                  key={applicant.id}
                  className={`p-4 flex items-center justify-between hover:bg-muted/50 transition-colors ${index !== recentApplicants.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold">
                      {applicant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{applicant.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {applicant.role} • {applicant.experience}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Badge
                      className={`
                                            ${parseInt(applicant.match) > 90 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}
                                        `}
                    >
                      {applicant.match} Match
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Invite Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite {selectedUniversity?.name}</DialogTitle>
            <DialogDescription>
              Send a job invitation to this university.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="e.g. Junior Developer"
                value={inviteData.jobTitle}
                onChange={(e) =>
                  setInviteData({ ...inviteData, jobTitle: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <textarea
                id="jobDescription"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe the role..."
                value={inviteData.jobDescription}
                onChange={(e) =>
                  setInviteData({
                    ...inviteData,
                    jobDescription: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsInviteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSendInvite}>Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CompanyDashboard;
