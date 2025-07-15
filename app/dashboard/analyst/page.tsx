'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  DollarSign,
  FileText,
  Shield,
  Star
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { TicketCard } from '@/components/TicketCard';
import { DashboardLayout } from '@/components/DashboardLayout';
import { EvidenceUploadModal } from '@/components/EvidenceUploadModal';

export default function AnalystDashboard() {
  const { user, tickets, fetchTickets, assignTicket, isLoading } = useApp();
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const availableTickets = tickets.filter(ticket => ticket.status === 'open');
  const myTickets = tickets.filter(ticket => ticket.analystId === user?.id);
  
  const stats = {
    available: availableTickets.length,
    assigned: myTickets.filter(t => t.status === 'assigned').length,
    inProgress: myTickets.filter(t => t.status === 'in_progress').length,
    completed: myTickets.filter(t => ['resolved', 'validated'].includes(t.status)).length,
    totalEarned: myTickets.filter(t => t.status === 'validated').reduce((sum, t) => sum + t.stakeAmount, 0),
    cltBalance: user?.cltBalance || 0,
    reputation: user?.reputation || 0
  };

  const handleClaimTicket = async (ticketId: string) => {
    if (!user) return;
    try {
      await assignTicket(ticketId, user.id);
      await fetchTickets();
    } catch (error) {
      console.error('Failed to claim ticket:', error);
    }
  };

  const handleSubmitEvidence = (ticketId: string) => {
    setSelectedTicket(ticketId);
    setShowEvidenceModal(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!user) {
    return <div>Please log in to access the analyst dashboard.</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Analyst Dashboard</h1>
            <p className="text-muted-foreground">Claim tickets and resolve security incidents</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              <Star className="h-4 w-4 mr-1" />
              Reputation: {stats.reputation}%
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Award className="h-4 w-4 mr-1" />
              CLT Balance: {stats.cltBalance}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.available}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.assigned}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEarned} IOTA</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CLT Balance</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.cltBalance}</div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{stats.reputation}%</div>
                <p className="text-sm text-muted-foreground">Reputation Score</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
                <p className="text-sm text-muted-foreground">Tickets Resolved</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{stats.cltBalance}</div>
                <p className="text-sm text-muted-foreground">CLT Tokens Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets Section */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets</CardTitle>
            <CardDescription>Available tickets and your assigned work</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="available">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="available">Available ({stats.available})</TabsTrigger>
                <TabsTrigger value="assigned">Assigned ({stats.assigned})</TabsTrigger>
                <TabsTrigger value="in_progress">In Progress ({stats.inProgress})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="available" className="space-y-4">
                {availableTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No available tickets at the moment.</p>
                  </div>
                ) : (
                  availableTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold">{ticket.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              <div className={`w-2 h-2 rounded-full ${getSeverityColor(ticket.severity)} mr-1`} />
                              {ticket.severity}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {ticket.stakeAmount} IOTA
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleClaimTicket(ticket.id)}
                          disabled={isLoading}
                        >
                          Claim Ticket
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="assigned" className="space-y-4">
                {myTickets.filter(t => t.status === 'assigned').map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold">{ticket.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            <div className={`w-2 h-2 rounded-full ${getSeverityColor(ticket.severity)} mr-1`} />
                            {ticket.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {ticket.stakeAmount} IOTA
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleSubmitEvidence(ticket.id)}
                        disabled={isLoading}
                      >
                        Submit Evidence
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="in_progress" className="space-y-4">
                {myTickets.filter(t => t.status === 'in_progress').map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4">
                {myTickets.filter(t => ['resolved', 'validated'].includes(t.status)).map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <EvidenceUploadModal 
          open={showEvidenceModal} 
          onOpenChange={setShowEvidenceModal}
          ticketId={selectedTicket}
        />
      </div>
    </DashboardLayout>
  );
}