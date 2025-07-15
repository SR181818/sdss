'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  User, 
  DollarSign, 
  FileText, 
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Ticket } from '@/contexts/AppContext';

interface TicketCardProps {
  ticket: Ticket;
  onAction?: (action: string, ticketId: string) => void;
}

export function TicketCard({ ticket, onAction }: TicketCardProps) {
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
      case 'closed': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return Clock;
      case 'assigned': return User;
      case 'in_progress': return FileText;
      case 'resolved': return CheckCircle;
      case 'validated': return CheckCircle;
      case 'closed': return XCircle;
      default: return AlertCircle;
    }
  };

  const StatusIcon = getStatusIcon(ticket.status);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{ticket.title}</CardTitle>
            <CardDescription className="mt-1">{ticket.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-xs ${getStatusColor(ticket.status)}`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {ticket.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <div className={`w-2 h-2 rounded-full ${getSeverityColor(ticket.severity)} mr-1`} />
                {ticket.severity}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <DollarSign className="h-3 w-3 mr-1" />
                {ticket.stakeAmount} IOTA
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Created: {new Date(ticket.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {ticket.evidenceHash && (
              <Badge variant="outline" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                Evidence
              </Badge>
            )}
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}