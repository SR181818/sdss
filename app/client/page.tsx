'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Upload, 
  Wallet, 
  FileText, 
  Clock, 
  DollarSign,
  Hash,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useFirefly } from '@/hooks/useFirefly';
import { useContract } from '@/hooks/useContract';
import { usePolling } from '@/hooks/usePolling';
import { cacheTicket } from '@/lib/storage';
import { toast } from 'sonner';

export default function ClientPage() {
  const { wallet, isConnecting, connect, disconnect, getCredential } = useFirefly();
  const { isLoading, createTicketTx } = useContract();
  const { tickets, startPolling, stopPolling, refreshData } = usePolling();
  
  const [isVerified, setIsVerified] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [stakeAmount, setStakeAmount] = useState('50');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);

  const myTickets = tickets.filter(ticket => ticket.clientAddress === wallet.address);

  useEffect(() => {
    if (wallet.isConnected) {
      startPolling();
      verifyClientCredentials();
    } else {
      stopPolling();
      setIsVerified(false);
    }

    return () => stopPolling();
  }, [wallet.isConnected]);

  const verifyClientCredentials = async () => {
    try {
      await getCredential('Client');
      setIsVerified(true);
      toast.success('Client credentials verified');
    } catch (error) {
      setIsVerified(false);
      toast.error('Client credentials not found');
    }
  };

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error('Client credentials required');
      return;
    }

    try {
      const txHash = await createTicketTx(description, parseInt(stakeAmount), evidenceFile);
      
      // Cache the ticket locally
      const newTicket = {
        id: Date.now().toString(),
        clientAddress: wallet.address!,
        title,
        description,
        severity,
        status: 'open' as const,
        stakeAmount: parseInt(stakeAmount),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        txHash,
      };

      await cacheTicket(newTicket);
      await refreshData();

      // Reset form
      setTitle('');
      setDescription('');
      setSeverity('medium');
      setStakeAmount('50');
      setEvidenceFile(null);
    } catch (error) {
      console.error('Failed to create ticket:', error);
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

  const getSeverityColor = (sev: string) => {
    switch (sev) {
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
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>dSOC Client Portal</CardTitle>
                <CardDescription>
                  Connect your Firefly wallet to access the client portal
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
              <h1 className="text-xl font-bold text-primary">dSOC Client Portal</h1>
              {isVerified && (
                <Badge variant="outline" className="ml-3">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Client
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{myTickets.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {myTickets.filter(t => t.status === 'open').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {myTickets.filter(t => ['assigned', 'in_progress'].includes(t.status)).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {myTickets.reduce((sum, t) => sum + t.stakeAmount, 0)} IOTA
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create Ticket Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Create Security Incident
                </CardTitle>
                <CardDescription>
                  Submit a new security incident with evidence and stake funds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateTicket} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Incident Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Brief description of the incident"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide detailed information about the security incident"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="severity">Severity Level</Label>
                      <Select value={severity} onValueChange={(value) => setSeverity(value as typeof severity)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              Low
                            </div>
                          </SelectItem>
                          <SelectItem value="medium">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-yellow-500" />
                              Medium
                            </div>
                          </SelectItem>
                          <SelectItem value="high">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-500" />
                              High
                            </div>
                          </SelectItem>
                          <SelectItem value="critical">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              Critical
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="stake">Stake Amount (IOTA)</Label>
                      <Input
                        id="stake"
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder="Enter stake amount"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="evidence">Evidence Upload (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        id="evidence"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
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
                          PDF, DOC, images up to 10MB
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
                        IOTA Trust Framework Integration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Identity</Badge>
                          <span className="text-muted-foreground">Client DID verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Gas Station</Badge>
                          <span className="text-muted-foreground">Zero transaction fees</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Notarization</Badge>
                          <span className="text-muted-foreground">Evidence hash anchored</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Smart Contract</Badge>
                          <span className="text-muted-foreground">Escrow managed by Move</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button 
                    type="submit" 
                    disabled={isLoading || !isVerified}
                    className="w-full"
                  >
                    {isLoading ? 'Creating Ticket...' : 'Create Incident Ticket'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* My Tickets */}
            <Card>
              <CardHeader>
                <CardTitle>My Tickets</CardTitle>
                <CardDescription>Track your security incident reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myTickets.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No tickets yet. Create your first incident report.</p>
                    </div>
                  ) : (
                    myTickets.map((ticket) => (
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
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Created: {new Date(ticket.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}