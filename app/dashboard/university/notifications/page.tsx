'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Inbox, Check, X, Bell } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from "framer-motion";

export default function NotificationsPage() {
    const { user } = useAuthStore();
    const [invites, setInvites] = useState<any[]>([]);
    const [isLoadingInvites, setIsLoadingInvites] = useState(true);

    useEffect(() => {
        const fetchInvites = async () => {
            if (!user?.id) return;

            try {
                const { data, error } = await supabase
                    .from('invites')
                    .select('*')
                    .eq('university_id', user.id)
                    .eq('status', 'pending');
                
                if (error) throw error;
                setInvites(data || []);
            } catch (error) {
                console.error('Error fetching invites:', error);
            } finally {
                setIsLoadingInvites(false);
            }
        };

        fetchInvites();
    }, [user?.id]);

    const handleAcceptInvite = async (invite: any) => {
        try {
            // 1. Update invite status
            const { error: updateError } = await supabase
                .from('invites')
                .update({ status: 'accepted' })
                .eq('id', invite.id);

            if (updateError) throw updateError;

            // 2. Create Job Opening
            const { error: jobError } = await supabase
                .from('jobs')
                .insert({
                    university_id: user?.id,
                    company_id: invite.company_id,
                    title: invite.job_title,
                    description: invite.job_description,
                    status: 'active',
                    posted_at: new Date().toISOString()
                });

            if (jobError) {
                console.error('Error creating job:', jobError);
                toast.warning('Invite accepted but failed to create job automatically.');
            } else {
                toast.success('Invite accepted and Job created successfully!');
            }

            // Remove from local state
            setInvites(invites.filter(i => i.id !== invite.id));

        } catch (error: any) {
            console.error('Error accepting invite:', error);
            toast.error(error.message || 'Failed to accept invite');
        }
    };

    const handleRejectInvite = async (inviteId: string) => {
        try {
            const { error } = await supabase
                .from('invites')
                .update({ status: 'rejected' })
                .eq('id', inviteId);

            if (error) throw error;
            
            toast.info('Invite rejected');
            setInvites(invites.filter(i => i.id !== inviteId));
        } catch (error: any) {
            console.error('Error rejecting invite:', error);
            toast.error('Failed to reject invite');
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-orange-600 flex items-center gap-2">
                <Bell className="h-8 w-8" />
                Notifications
            </h1>
            
            <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Inbox className="h-5 w-5 text-orange-600" />
                    Pending Invites
                </h2>
                
                {isLoadingInvites ? (
                    <div className="text-sm text-muted-foreground">Loading invites...</div>
                ) : invites.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="p-6 text-center text-muted-foreground">
                            No pending invites.
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-3">
                        {invites.map((invite) => (
                            <motion.div 
                                key={invite.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Card className="border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg">{invite.company_name}</h3>
                                                <div className="text-sm font-medium text-orange-700">{invite.job_title}</div>
                                            </div>
                                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">New Invite</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4">{invite.job_description}</p>
                                        <div className="flex gap-2 justify-end">
                                            <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => handleRejectInvite(invite.id)}>
                                                <X className="h-4 w-4 mr-1" /> Reject
                                            </Button>
                                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700" onClick={() => handleAcceptInvite(invite)}>
                                                <Check className="h-4 w-4 mr-1" /> Accept
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
            
           
        </div>
    );
}
