'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Shield, 
  FileText,
  TrendingUp,
  Star,
  Users,
  Wallet,
  Hash,
  ExternalLink
} from 'lucide-react';
import { useFirefly } from '@/hooks/useFirefly';
import { useContract } from '@/hooks/useContract';
import { usePolling } from '@/hooks/usePolling';
import { cacheTicket } from '@/lib/storage';
import { getIPFSUrl } from '@/lib/storage';
import { toast } from 'sonner';

export default function CertifierPage() {
  const { wallet, isConnecting, connect, disconnect, getCredential } = useFirefly();
  const { isLoading, validateAndPayoutTx } = useContract();
  const { tickets, startPolling, stopPolling, refreshData } = usePolling();
  
  const [isVerified, setIsVerified] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [validationNotes, setValidationNotes] = useState('');
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);

  const pendingTickets = tickets.filter(ticket => ticket.status === 'in_progress');
  const myValidations = tickets.filter(ticket => ticket.certifierAddress === wallet.address);

  useEffect(() => {
    if (wallet.isConnected) {
      startPolling();
      verifyCertifierCredentials();
    } else {
      stopPolling();
      setIsVerified(false);
    }

    return () => stopPolling();
  }, [wallet.isConnected]);

  const verifyCertifierCredentials = async () => {
    try {
      await getCredential('Certifier');
      setIsVerified(true);
      toast.success('Certifier credentials verified');
    } catch (error) {
      setIsVerified(false);
      toast.error('Certifier credentials not found');
    }
  };

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleValidate = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowValidationModal(true);
  };

  const handleQuickAction = async (ticket: any, approved: boolean) => {
    if (!isVerified) {
      toast.error('Certifier credentials required');
      return;
    }

    try {
      const txHash = await validateAndPayoutTx(parseInt(ticket.id), approved);
      
      // Update ticket locally
      const updatedTicket = {
        ...ticket,
        status: approved ? 'validated' : 'open',
        certifierAddress: wallet.address,
        updatedAt: new Date().toISOString(),
      };

      await cacheTicket(updatedTicket);
      await refreshData();
    } catch (error) {
      console.error('Failed to validate ticket:', error);
    }
  };

  const handleSubmitValidation = async () => {
    if (!selectedTicket || !decision) return;

    try {
      const txHash = await validateAndPayoutTx(parseInt(selectedTicket.id), decision === 'approve');
      
      // Update ticket locally
      const updatedTicket = {
        ...selectedTicket,
        status: decision === 'approve' ? 'validated' : 'open',
        certifierAddress: wallet.address,
        updatedAt: new Date().toISOString(),
      };

      await cacheTicket(updatedTicket);
      await refreshData();

      // Reset form
      setValidationNotes('');
      setDecision(null);
      setShowValidationModal(false);
      setSelectedTicket(null);
    } catch (error) {
      console.error('Failed to submit validation:', error);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-yellow-600 bg-yellow-50';
      case 'assigned': return 'text-blue-600 bg-blue-50';
      case 'in_progress': return 'text-orange-600 bg-orange-50';
      case 'resolved': return 'text-purple-600 bg-purple-50';
      case 'validated': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const calculateCLTReward = (stakeAmount: number) => {
    return Math.floor(stakeAmount / 10); // 1 CLT per 10 IOTA
  };

  if (!wallet.isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>dSOC Certifier Portal</CardTitle>
                <CardDescription>
                  Connect your Firefly wallet to access the certifier portal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full"
                  size="lg"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  {isConnecting ? 'Connecting...' : 'Connect Firefly Wallet'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">dSOC Certifier Portal</h1>
              {isVerified && (
                <Badge variant="outline" className="ml-3">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Certifier
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                <Award className="h-4 w-4 mr-1" />
                Validations: {myValidations.length}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {wallet.address?.substring(0, 8)}...{wallet.address?.substring(-6)}
              </Badge>
              <Button variant="outline" onClick={disconnect}>
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingTickets.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Validated</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {myValidations.filter(t => t.status === 'validated').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {myValidations.filter(t => t.status === 'open' && t.certifierAddress === wallet.address).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{myValidations.length}</div>
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
                  <div className="text-3xl font-bold text-primary">92%</div>
                  <p className="text-sm text-muted-foreground">Reputation Score</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {myValidations.filter(t => t.status === 'validated').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Approved Validations</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {myValidations.filter(t => t.status === 'open' && t.certifierAddress === wallet.address).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Rejected Submissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation Queue */}
          <Card>
            <CardHeader>
              <CardTitle>Validation Queue</CardTitle>
              <CardDescription>Review analyst submissions and approve payouts</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pending">Pending Review ({pendingTickets.length})</TabsTrigger>
                  <TabsTrigger value="validated">Validated ({myValidations.filter(t => t.status === 'validated').length})</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected ({myValidations.filter(t => t.status === 'open' && t.certifierAddress === wallet.address).length})</TabsTrigger>
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
                                Analyst: {ticket.analystAddress?.substring(0, 8)}...
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Award className="h-3 w-3 mr-1" />
                                CLT Reward: {calculateCLTReward(ticket.stakeAmount)}
                              </Badge>
                            </div>
                            {ticket.evidenceHash && (
                              <div className="text-xs text-muted-foreground mb-2">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-3 w-3" />
                                  Evidence Hash: {ticket.evidenceHash.substring(0, 16)}...
                                </div>
                              </div>
                            )}
                            {ticket.ipfsHash && (
                              <div className="text-xs text-muted-foreground">
                                <a 
                                  href={getIPFSUrl(ticket.ipfsHash)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  View Evidence on IPFS
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleValidate(ticket)}
                              disabled={isLoading || !isVerified}
                              size="sm"
                            >
                              Review
                            </Button>
                            <Button 
                              onClick={() => handleQuickAction(ticket, true)}
                              disabled={isLoading || !isVerified}
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              onClick={() => handleQuickAction(ticket, false)}
                              disabled={isLoading || !isVerified}
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
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
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold">{ticket.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-xs ${getStatusColor(ticket.status)}`}>
                              {ticket.status.replace('_', ' ')}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <div className={`w-2 h-2 rounded-full ${getSeverityColor(ticket.severity)} mr-1`} />
                              {ticket.severity}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {ticket.stakeAmount} IOTA
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Validated
                            </Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="rejected" className="space-y-4">
                  {myValidations.filter(t => t.status === 'open' && t.certifierAddress === wallet.address).map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold">{ticket.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs text-red-600 bg-red-50">
                              Rejected
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <div className={`w-2 h-2 rounded-full ${getSeverityColor(ticket.severity)} mr-1`} />
                              {ticket.severity}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {ticket.stakeAmount} IOTA
                            </Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Validation Modal */}
      <Dialog open={showValidationModal} onOpenChange={setShowValidationModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Validate Resolution
            </DialogTitle>
            <DialogDescription>
              Review the analyst's evidence and approve or reject the resolution
            </DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Ticket Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium">{selectedTicket.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedTicket.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <div className={`w-2 h-2 rounded-full ${getSeverityColor(selectedTicket.severity)} mr-1`} />
                        {selectedTicket.severity}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {selectedTicket.stakeAmount} IOTA
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Analyst: {selectedTicket.analystAddress?.substring(0, 8)}...
                      </Badge>
                    </div>
                    {selectedTicket.evidenceHash && (
                      <div className="text-xs text-muted-foreground">
                        <div className="font-medium">Evidence Hash:</div>
                        <div className="font-mono">{selectedTicket.evidenceHash}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="validation">Validation Notes</Label>
                <Textarea
                  id="validation"
                  value={validationNotes}
                  onChange={(e) => setValidationNotes(e.target.value)}
                  placeholder="Provide feedback on the analyst's work and your validation decision..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className={`cursor-pointer border-2 ${decision === 'approve' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <CardHeader onClick={() => setDecision('approve')}>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      Approve Resolution
                    </CardTitle>
                    <CardDescription>
                      Evidence is satisfactory and resolution is valid
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Release {selectedTicket.stakeAmount} IOTA to analyst</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-orange-500" />
                        <span>Mint {calculateCLTReward(selectedTicket.stakeAmount)} CLT rewards</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-blue-500" />
                        <span>Update ticket status to "validated"</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer border-2 ${decision === 'reject' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                  <CardHeader onClick={() => setDecision('reject')}>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <XCircle className="h-5 w-5" />
                      Reject Resolution
                    </CardTitle>
                    <CardDescription>
                      Evidence is insufficient or resolution is invalid
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-500" />
                        <span>Refund {selectedTicket.stakeAmount} IOTA to client</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span>No CLT rewards minted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-blue-500" />
                        <span>Reset ticket status to "open"</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-blue-50 dark:bg-blue-950">
                <CardHeader>
                  <CardTitle className="text-lg">Validation Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Smart Contract</Badge>
                      <span className="text-muted-foreground">Move validate_and_payout function will be called</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Gas Station</Badge>
                      <span className="text-muted-foreground">Transaction fees sponsored by IOTA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">CLT Minting</Badge>
                      <span className="text-muted-foreground">Purpose-bound tokens for analyst rewards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Reputation</Badge>
                      <span className="text-muted-foreground">Analyst reputation updated based on validation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowValidationModal(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitValidation}
                  disabled={isLoading || !decision}
                  className={decision === 'approve' ? 'bg-green-600 hover:bg-green-700' : decision === 'reject' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  {isLoading ? 'Processing...' : decision === 'approve' ? 'Approve & Payout' : decision === 'reject' ? 'Reject & Refund' : 'Select Decision'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}