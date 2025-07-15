'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Shield, DollarSign, FileText, Hash } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface CreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTicketModal({ open, onOpenChange }: CreateTicketModalProps) {
  const { user, createTicket, isLoading } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [stakeAmount, setStakeAmount] = useState('50');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Simulate file upload to IPFS and generate SHA-256 hash
      const mockHash = 'sha256:' + Math.random().toString(36).substring(2, 15);
      
      await createTicket({
        clientId: user.id,
        title,
        description,
        severity,
        stakeAmount: parseInt(stakeAmount),
        status: 'open',
        ipfsHash: evidenceFile ? 'ipfs:' + Math.random().toString(36).substring(2, 15) : undefined
      });

      // Reset form
      setTitle('');
      setDescription('');
      setSeverity('medium');
      setStakeAmount('50');
      setEvidenceFile(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  const getRecommendedStake = (sev: string) => {
    switch (sev) {
      case 'low': return '25';
      case 'medium': return '50';
      case 'high': return '100';
      case 'critical': return '200';
      default: return '50';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Create Security Incident
          </DialogTitle>
          <DialogDescription>
            Submit a new security incident with evidence and stake funds for resolution
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Incident Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief description of the incident"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity Level</Label>
              <Select value={severity} onValueChange={(value) => {
                setSeverity(value as typeof severity);
                setStakeAmount(getRecommendedStake(value));
              }}>
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
          </div>

          <div className="space-y-2">
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

          <div className="space-y-2">
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5" />
                Stake Configuration
              </CardTitle>
              <CardDescription>
                Set the reward amount for resolving this incident
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="stake">Stake Amount (IOTA)</Label>
                    <Badge variant="outline" className="text-xs">
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(severity)} mr-1`} />
                      {severity} severity
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Recommended: {getRecommendedStake(severity)} IOTA
                  </div>
                </div>
                
                <Input
                  id="stake"
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="Enter stake amount"
                  min="1"
                  required
                />
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Funds will be held in smart contract escrow</p>
                  <p>• Released to analyst upon successful validation</p>
                  <p>• Refunded if incident cannot be resolved</p>
                  <p>• CLT tokens minted as bonus rewards (1 CLT per 10 IOTA)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Hash className="h-5 w-5" />
                Blockchain Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">IOTA Identity</Badge>
                  <span className="text-muted-foreground">DID verification: {user?.did}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Gas Station</Badge>
                  <span className="text-muted-foreground">Transaction fees sponsored</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Notarization</Badge>
                  <span className="text-muted-foreground">Evidence will be SHA-256 hashed and anchored</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Smart Contract</Badge>
                  <span className="text-muted-foreground">Escrow managed by Move SOCService module</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Incident'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}