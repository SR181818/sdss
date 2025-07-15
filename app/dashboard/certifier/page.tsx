'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Shield, 
  FileText,
  TrendingUp,
  Star,
  Users
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { TicketCard } from '@/components/TicketCard';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ValidationModal } from '@/components/ValidationModal';

export default function CertifierDashboard() {
  const { user, tickets, fetchTickets, validateTicket, isLoading } = useApp();
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const pendingTickets = tickets.filter(ticket => ticket.status === 'in_progress');
  const myValidations = tickets.filter(ticket => ticket.certifierId === user?.id);
  
  const stats = {
    pending: pendingTickets.length,
    validated: myValidations.filter(t => t.status === 'validated').length,
    rejected: myValidations.filter(t => t.status === 'open' && t.certifierId === user?.id).length,
    total: myValidations.length,
    reputation: user?.reputation || 0
  };

  const handleValidate = (ticketId: string) => {
    setSelectedTicket(ticketId);
    setShowValidationModal(true);
  };

  const handleApprove = async (ticketId: string) => {
    try {
      await validateTicket(ticketId, true);
      await fetchTickets();
    } catch (error) {
      console.error('Failed to approve ticket:', error);
    }
  };

  const handleReject = async (ticketId: string) => {
    try {
      await validateTicket(ticketId, false);
      await fetchTickets();
    } catch (error) {
      console.error('Failed to reject ticket:', error);
    }
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
    return <div>Please log in to access the certifier dashboard.</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Certifier Dashboard</h1>
            <p className="text-muted-foreground">Validate analyst work and approve payouts</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              <Star className="h-4 w-4 mr-1" />
              Reputation: {stats.reputation}%
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Award className="h-4 w-4 mr-1" />
              Validations: {stats.total}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Validated</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.validated}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejected}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Validation Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{stats.reputation}%</div>
                <p className="text-sm text-muted-foreground">Reputation Score</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.validated}</div>
                <p className="text-sm text-muted-foreground">Approved Validations</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
                <p className="text-sm text-muted-foreground">Rejected Submissions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets Section */}
        <Card>
          <CardHeader>
            <CardTitle>Validation Queue</CardTitle>
            <CardDescription>Review analyst submissions and approve payouts</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">Pending Review ({stats.pending})</TabsTrigger>
                <TabsTrigger value="validated">Validated ({stats.validated})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="space-y-4">
                {pendingTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No tickets pending validation.</p>
                  </div>
                ) : (
                  pendingTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold">{ticket.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              <div className={`w-2 h-2 rounded-full ${getSeverityColor(ticket.severity)} mr-1`} />
                              {ticket.severity}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {ticket.stakeAmount} IOTA
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              Analyst: {ticket.analystId}
                            </Badge>
                          </div>
                          {ticket.evidenceHash && (
                            <div className="text-xs text-muted-foreground">
                              Evidence Hash: {ticket.evidenceHash.substring(0, 16)}...
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleValidate(ticket.id)}
                            disabled={isLoading}
                            size="sm"
                          >
                            Review
                          </Button>
                          <Button 
                            onClick={() => handleApprove(ticket.id)}
                            disabled={isLoading}
                            size="sm"
                            variant="outline"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            onClick={() => handleReject(ticket.id)}
                            disabled={isLoading}
                            size="sm"
                            variant="outline"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="validated" className="space-y-4">
                {myValidations.filter(t => t.status === 'validated').map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </TabsContent>
              
              <TabsContent value="rejected" className="space-y-4">
                {myValidations.filter(t => t.status === 'open' && t.certifierId === user?.id).map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <ValidationModal 
          open={showValidationModal} 
          onOpenChange={setShowValidationModal}
          ticketId={selectedTicket}
        />
      </div>
    </DashboardLayout>
  );
}