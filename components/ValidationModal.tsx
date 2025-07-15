'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Award, Shield, FileText, Hash } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface ValidationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId: string | null;
}

export function ValidationModal({ open, onOpenChange, ticketId }: ValidationModalProps) {
  const { user, tickets, validateTicket, isLoading } = useApp();
  const [validationNotes, setValidationNotes] = useState('');
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);

  const ticket = tickets.find(t => t.id === ticketId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !ticketId || !decision) return;

    try {
      await validateTicket(ticketId, decision === 'approve');
      
      // Reset form
      setValidationNotes('');
      setDecision(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to validate ticket:', error);
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

  const calculateCLTReward = (stakeAmount: number) => {
    return Math.floor(stakeAmount / 10); // 1 CLT per 10 IOTA
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

        {ticket && (
          <form onSubmit={handleSubmit} className="space-y-6">
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
                    <h3 className="font-medium">{ticket.title}</h3>
                    <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(ticket.severity)} mr-1`} />
                      {ticket.severity}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {ticket.stakeAmount} IOTA
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Analyst: {ticket.analystId}
                    </Badge>
                  </div>
                  {ticket.evidenceHash && (
                    <div className="text-xs text-muted-foreground">
                      <div className="font-medium">Evidence Hash:</div>
                      <div className="font-mono">{ticket.evidenceHash}</div>
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
                      <span>Release {ticket.stakeAmount} IOTA to analyst</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-orange-500" />
                      <span>Mint {calculateCLTReward(ticket.stakeAmount)} CLT rewards</span>
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
                      <span>Refund {ticket.stakeAmount} IOTA to client</span>
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

            <Card>
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
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || !decision}
                className={decision === 'approve' ? 'bg-green-600 hover:bg-green-700' : decision === 'reject' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                {isLoading ? 'Processing...' : decision === 'approve' ? 'Approve & Payout' : decision === 'reject' ? 'Reject & Refund' : 'Select Decision'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}