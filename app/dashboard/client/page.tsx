'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  DollarSign,
  TrendingUp,
  FileText,
  Users
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { CreateTicketModal } from '@/components/CreateTicketModal';
import { TicketCard } from '@/components/TicketCard';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function ClientDashboard() {
  const { user, tickets, fetchTickets, isLoading } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const myTickets = tickets.filter(ticket => ticket.clientId === user?.id);
  const stats = {
    total: myTickets.length,
    open: myTickets.filter(t => t.status === 'open').length,
    inProgress: myTickets.filter(t => ['assigned', 'in_progress'].includes(t.status)).length,
    resolved: myTickets.filter(t => ['resolved', 'validated'].includes(t.status)).length,
    totalStaked: myTickets.reduce((sum, t) => sum + t.stakeAmount, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-yellow-500';
      case 'assigned': return 'bg-blue-500';
      case 'in_progress': return 'bg-orange-500';
      case 'resolved': return 'bg-purple-500';
      case 'validated': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'secondary',
      assigned: 'default',
      in_progress: 'default',
      resolved: 'default',
      validated: 'default'
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  if (!user) {
    return <div>Please log in to access the client dashboard.</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Client Dashboard</h1>
            <p className="text-muted-foreground">Manage your security incidents and track progress</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Create Incident
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.open}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStaked} IOTA</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Resolution Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Open</span>
                <span>{stats.open}/{stats.total}</span>
              </div>
              <Progress value={(stats.open / stats.total) * 100} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span>In Progress</span>
                <span>{stats.inProgress}/{stats.total}</span>
              </div>
              <Progress value={(stats.inProgress / stats.total) * 100} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span>Resolved</span>
                <span>{stats.resolved}/{stats.total}</span>
              </div>
              <Progress value={(stats.resolved / stats.total) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Tickets Section */}
        <Card>
          <CardHeader>
            <CardTitle>My Tickets</CardTitle>
            <CardDescription>Track your security incident reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="open">Open ({stats.open})</TabsTrigger>
                <TabsTrigger value="assigned">Assigned</TabsTrigger>
                <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved ({stats.resolved})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {myTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No tickets yet. Create your first incident report.</p>
                  </div>
                ) : (
                  myTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="open" className="space-y-4">
                {myTickets.filter(t => t.status === 'open').map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </TabsContent>
              
              <TabsContent value="assigned" className="space-y-4">
                {myTickets.filter(t => t.status === 'assigned').map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </TabsContent>
              
              <TabsContent value="in_progress" className="space-y-4">
                {myTickets.filter(t => t.status === 'in_progress').map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </TabsContent>
              
              <TabsContent value="resolved" className="space-y-4">
                {myTickets.filter(t => ['resolved', 'validated'].includes(t.status)).map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <CreateTicketModal 
          open={showCreateModal} 
          onOpenChange={setShowCreateModal}
        />
      </div>
    </DashboardLayout>
  );
}