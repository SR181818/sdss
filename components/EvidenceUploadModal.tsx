'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Hash, Shield, CheckCircle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface EvidenceUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId: string | null;
}

export function EvidenceUploadModal({ open, onOpenChange, ticketId }: EvidenceUploadModalProps) {
  const { user, submitEvidence, isLoading } = useApp();
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !ticketId) return;

    try {
      // Simulate file upload to IPFS and generate SHA-256 hash
      const mockIpfsHash = 'ipfs:' + Math.random().toString(36).substring(2, 15);
      const mockSha256Hash = 'sha256:' + Math.random().toString(36).substring(2, 15);
      
      await submitEvidence(ticketId, {
        ticketId,
        uploadedBy: user.id,
        fileName: evidenceFile?.name || 'resolution_notes.txt',
        fileSize: evidenceFile?.size || resolutionNotes.length,
        ipfsHash: mockIpfsHash,
        sha256Hash: mockSha256Hash
      });

      // Reset form
      setResolutionNotes('');
      setEvidenceFile(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to submit evidence:', error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEvidenceFile(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Hash className="h-5 w-5" />
                Evidence Processing
              </CardTitle>
              <CardDescription>
                Your evidence will be processed through the IOTA Trust Framework
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">IPFS Upload</div>
                    <div className="text-sm text-muted-foreground">
                      Files will be uploaded to decentralized storage
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">SHA-256 Hashing</div>
                    <div className="text-sm text-muted-foreground">
                      Cryptographic hash generated for integrity verification
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">IOTA Notarization</div>
                    <div className="text-sm text-muted-foreground">
                      Evidence hash anchored to IOTA network for immutability
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Smart Contract Update</div>
                    <div className="text-sm text-muted-foreground">
                      Ticket status updated to "in_progress" for certifier review
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analyst Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">DID</Badge>
                  <span className="text-muted-foreground">{user?.did}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Reputation</Badge>
                  <span className="text-muted-foreground">{user?.reputation}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">CLT Balance</Badge>
                  <span className="text-muted-foreground">{user?.cltBalance} tokens</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Evidence'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}