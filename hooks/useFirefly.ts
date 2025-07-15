'use client';

import { useState, useEffect, useCallback } from 'react';
import { getFireflyWallet, FireflyWallet } from '@/lib/firefly';
import { toast } from 'sonner';

export interface UseFireflyReturn {
  wallet: FireflyWallet;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  getCredential: (type: 'Client' | 'Analyst' | 'Certifier') => Promise<any>;
}

export const useFirefly = (): UseFireflyReturn => {
  const [wallet] = useState(() => getFireflyWallet());
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    if (wallet.isConnected) return;

    setIsConnecting(true);
    try {
      await wallet.connect();
      toast.success('Firefly wallet connected successfully');
    } catch (error) {
      console.error('Wallet connection failed:', error);
      toast.error('Failed to connect Firefly wallet');
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, [wallet]);

  const disconnect = useCallback(() => {
    wallet.disconnect();
    toast.success('Wallet disconnected');
  }, [wallet]);

  const getCredential = useCallback(async (type: 'Client' | 'Analyst' | 'Certifier') => {
    if (!wallet.isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      const credential = await wallet.getVerifiableCredential(type);
      if (!credential) {
        throw new Error(`No ${type} credential found`);
      }
      return credential;
    } catch (error) {
      console.error(`Failed to get ${type} credential:`, error);
      toast.error(`Failed to verify ${type} credentials`);
      throw error;
    }
  }, [wallet]);

  return {
    wallet,
    isConnecting,
    connect,
    disconnect,
    getCredential,
  };
};