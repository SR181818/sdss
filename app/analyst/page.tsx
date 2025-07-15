'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  DollarSign,
  FileText,
  Shield,
  Star,
  Upload,
  Wallet,
  Hash,
  ExternalLink
} from 'lucide-react';
import { useFirefly } from '@/hooks/useFirefly';
import { useContract } from '@/hooks/useContract';
import { usePolling } from '@/hooks/usePolling';
import { cacheTicket, cacheEvidence } from '@/lib/storage';
import { toast } from 'sonner';

export default function AnalystPage() {
  const { wallet, isConnecting, connect, disconnect, getCredential } = useFirefly();
  const { isLoading, assignAnalystTx, submitEvidenceTx, getCLTBalanceTx } = useContract();
  const { tickets, startPolling, stopPolling, refreshData } = usePolling();
  
  const [isVerified, setIsVerified] = useState(false);
  const [cltBalance, setCltBalance] = useState(0);
  const [reputation, setReputation] = useState(0);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  const availableTickets = tickets.filter(ticket => ticket.status === 'open');
  const myTickets = tickets.filter(ticket => ticket.analystAddress === wallet.address);

  useEffect(() => {
    if (wallet.isConnected) {
      startPolling();
      verifyAnalystCredentials();
      loadAnalystData();
    } else {
      stopPolling();
      setIsVerified(false);
    }

    return () => stopPolling();
  }, [wallet.isConnected]);

  const verifyAnalystCredentials = async () => {
    try {
      const credential = await getCredential('Analyst');
      setIsVerified(true);
      setReputation(credential.credentialSubject.reputation || 85);
      toast.success('Analyst credentials verified');
    } catch (error) {
      setIsVerified(false);
      toast.error('Analyst credentials not found');
    }
  };

  const loadAnalystData = async () => {
    if (wallet.address) {
      const balance = await getCLTBalanceTx(wallet.address);
      setCltBalance(balance);
    }
  };

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleClaimTicket = async (ticket: any) => {
    if (!isVerified) {
      toast.error('Analyst credentials required');
      return;
    }

    try {
      const txHash = await assignAnalystTx(parseInt(ticket.id));
      
      // Update ticket locally
      const updatedTicket = {
        ...ticket,
        status: 'assigned',
        analystAddress: wallet.address,
        updatedAt: new Date().toISOString(),
      };

      await cacheTicket(updatedTicket);
      await refreshData();
    } catch (error) {
      console.error('Failed to claim ticket:', error);
    }
  };

  const handleSubmitEvidence = async () => {
    if (!selectedTicket || !evidenceFile) return;

    try {
      const txHash = await submitEvidenceTx(parseInt(selectedTicket.id), evidenceFile);
      
      // Cache evidence
      const evidence = {
        id: Date.now().toString(),
        ticketId: selectedTicket.id,
        filename: evidenceFile.name,
        ipfsHash: 'Qm' + Math.random().toString(36).substring(2, 15),
        sha256Hash: 'sha256:' + Math.random().toString(36).substring(2, 15),
        uploadedBy: wallet.address!,
        timestamp: new Date().toISOString(),
      };

      await cacheEvidence(evidence);

      // Update ticket status
      const updatedTicket = {
        ...selectedTicket,
        status: 'in_progress',
        evidenceHash: evidence.sha256Hash,
        updatedAt: new Date().toISOString(),
      };

      await cacheTicket(updatedTicket);
      await refreshData();

      // Reset form
      setEvidenceFile(null);
      setResolutionNotes('');
      setShowEvidenceModal(false);
      setSelectedTicket(null);
    } catch (error) {
      console.error('Failed to submit evidence:', error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setEvidenceFile(file);
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

  if (!wallet.isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>dSOC Analyst Portal</CardTitle>
                <CardDescription>
                  Connect your Firefly wallet to access the analyst portal
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
              <h1 className="text-xl font-bold text-primary">dSOC Analyst Portal</h1>
              {isVerified && (
                <Badge variant="outline" className="ml-3">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Analyst
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                <Star className="h-4 w-4 mr-1" />
                Reputation: {reputation}%
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Award className="h-4 w-4 mr-1" />
                CLT: {cltBalance}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{availableTickets.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assigned</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {myTickets.filter(t => t.status === 'assigned').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {myTickets.filter(t => t.status === 'in_progress').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {myTickets.filter(t => ['resolved', 'validated'].includes(t.status)).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CLT Balance</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cltBalance}</div>
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
                  <div className="text-3xl font-bold text-primary">{reputation}%</div>
                  <p className="text-sm text-muted-foreground">Reputation Score</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {myTickets.filter(t => ['resolved', 'validated'].includes(t.status)).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Tickets Resolved</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{cltBalance}</div>
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
                  <TabsTrigger value="available">Available ({availableTickets.length})</TabsTrigger>
                  <TabsTrigger value="assigned">Assigned ({myTickets.filter(t => t.status === 'assigned').length})</TabsTrigger>
                  <TabsTrigger value="in_progress">In Progress ({myTickets.filter(t => t.status === 'in_progress').length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({myTickets.filter(t => ['resolved', 'validated'].includes(t.status)).length})</TabsTrigger>
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
                            onClick={() => handleClaimTicket(ticket)}
                            disabled={isLoading || !isVerified}
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
                          </div>
                        </div>
                        <Button 
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowEvidenceModal(true);
                          }}
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
                            {ticket.evidenceHash && (
                              <Badge variant="outline" className="text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                Evidence Submitted
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Awaiting certifier validation
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-4">
                  {myTickets.filter(t => ['resolved', 'validated'].includes(t.status)).map((ticket) => (
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
                            {ticket.status === 'validated' && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-600">
                                <Award className="h-3 w-3 mr-1" />
                                CLT Earned
                              </Badge>
                            )}
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

      {/* Evidence Upload Modal */}
      <Dialog open={showEvidenceModal} onOpenChange={setShowEvidenceModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Submit Evidence & Resolution
            </DialogTitle>
            <DialogDescription>
              Upload your investigation findings and resolution for this security incident
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resolution">Resolution Notes</Label>
              <Textarea
                id="resolution"
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder="Describe your investigation findings, steps taken, and resolution..."
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence">Evidence Files</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  id="evidence"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.log"
                />
                <label
                  htmlFor="evidence"
                  className="flex flex-col items-center gap-2 cursor-pointer text-center"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload evidence files
                  </span>
                  <span className="text-xs text-gray-500">
                    Screenshots, logs, reports, etc. up to 10MB
                  </span>
                </label>
                {evidenceFile && (
                  <div className="mt-2 text-sm text-green-600">
                    ✓ {evidenceFile.name} ({Math.round(evidenceFile.size / 1024)}KB)
                  </div>
                )}
              </div>
            </div>

            <Card className="bg-blue-50 dark:bg-blue-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Hash className="h-4 w-4" />
                  Evidence Processing Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">IPFS Upload</Badge>
                    <span className="text-muted-foreground">Files uploaded to decentralized storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">SHA-256 Hash</Badge>
                    <span className="text-muted-foreground">Cryptographic integrity verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">Notarization</Badge>
                    <span className="text-muted-foreground">Hash anchored to IOTA network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">Smart Contract</Badge>
                    <span className="text-muted-foreground">Status updated for certifier review</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEvidenceModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitEvidence}
                disabled={isLoading || !evidenceFile}
              >
                {isLoading ? 'Submitting...' : 'Submit Evidence'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}