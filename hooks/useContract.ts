'use client';

import { useState, useCallback } from 'react';
import { 
  createTicket, 
  assignAnalyst, 
  submitEvidence, 
  validateAndPayout,
  getCLTBalance 
} from '@/lib/firefly';
import { uploadToIPFS } from '@/lib/storage';
import { anchorToNotarization } from '@/lib/iota';
import { toast } from 'sonner';

export interface UseContractReturn {
  isLoading: boolean;
  createTicketTx: (description: string, stakeAmount: number, evidenceFile?: File) => Promise<string>;
  assignAnalystTx: (ticketId: number) => Promise<string>;
  submitEvidenceTx: (ticketId: number, evidenceFile: File) => Promise<string>;
  validateAndPayoutTx: (ticketId: number, approved: boolean) => Promise<string>;
  getCLTBalanceTx: (address: string) => Promise<number>;
}

export const useContract = (): UseContractReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const createTicketTx = useCallback(async (
    description: string, 
    stakeAmount: number, 
    evidenceFile?: File
  ): Promise<string> => {
    setIsLoading(true);
    try {
      // Upload evidence to IPFS if provided
      let ipfsHash = '';
      if (evidenceFile) {
        toast.info('Uploading evidence to IPFS...');
        ipfsHash = await uploadToIPFS(evidenceFile);
      }

      // Create ticket transaction
      toast.info('Creating ticket with Gas Station sponsorship...');
      const txHash = await createTicket(description, stakeAmount, evidenceFile);

      // Anchor evidence hash to Notarization
      if (evidenceFile) {
        toast.info('Anchoring evidence hash to IOTA Notarization...');
        const fileBuffer = await evidenceFile.arrayBuffer();
        const { generateSHA256 } = await import('@/lib/iota');
        const evidenceHash = await generateSHA256(new Uint8Array(fileBuffer));
        await anchorToNotarization(evidenceHash);
      }

      toast.success('Ticket created successfully!');
      return txHash;
    } catch (error) {
      console.error('Create ticket failed:', error);
      toast.error('Failed to create ticket');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const assignAnalystTx = useCallback(async (ticketId: number): Promise<string> => {
    setIsLoading(true);
    try {
      toast.info('Assigning analyst to ticket...');
      const txHash = await assignAnalyst(ticketId);
      toast.success('Ticket assigned successfully!');
      return txHash;
    } catch (error) {
      console.error('Assign analyst failed:', error);
      toast.error('Failed to assign analyst');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitEvidenceTx = useCallback(async (
    ticketId: number, 
    evidenceFile: File
  ): Promise<string> => {
    setIsLoading(true);
    try {
      // Upload to IPFS
      toast.info('Uploading evidence to IPFS...');
      const ipfsHash = await uploadToIPFS(evidenceFile);

      // Generate and anchor hash
      toast.info('Anchoring evidence hash to IOTA Notarization...');
      const fileBuffer = await evidenceFile.arrayBuffer();
      const { generateSHA256 } = await import('@/lib/iota');
      const evidenceHash = await generateSHA256(new Uint8Array(fileBuffer));
      await anchorToNotarization(evidenceHash);

      // Submit evidence transaction
      toast.info('Submitting evidence to smart contract...');
      const txHash = await submitEvidence(ticketId, evidenceFile, ipfsHash);

      toast.success('Evidence submitted successfully!');
      return txHash;
    } catch (error) {
      console.error('Submit evidence failed:', error);
      toast.error('Failed to submit evidence');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const validateAndPayoutTx = useCallback(async (
    ticketId: number, 
    approved: boolean
  ): Promise<string> => {
    setIsLoading(true);
    try {
      const action = approved ? 'Approving and processing payout' : 'Rejecting and processing refund';
      toast.info(`${action}...`);
      
      const txHash = await validateAndPayout(ticketId, approved);
      
      if (approved) {
        toast.success('Ticket validated! Payout processed and CLT tokens minted.');
      } else {
        toast.success('Ticket rejected! Funds refunded to client.');
      }
      
      return txHash;
    } catch (error) {
      console.error('Validate and payout failed:', error);
      toast.error('Failed to process validation');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCLTBalanceTx = useCallback(async (address: string): Promise<number> => {
    try {
      return await getCLTBalance(address);
    } catch (error) {
      console.error('Get CLT balance failed:', error);
      return 0;
    }
  }, []);

  return {
    isLoading,
    createTicketTx,
    assignAnalystTx,
    submitEvidenceTx,
    validateAndPayoutTx,
    getCLTBalanceTx,
  };
};