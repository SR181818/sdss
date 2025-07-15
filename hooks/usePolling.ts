'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getCachedTickets, getCachedTransactions } from '@/lib/storage';
import { pollContractState } from '@/lib/iota';

export interface UsePollingReturn {
  tickets: any[];
  transactions: any[];
  isPolling: boolean;
  startPolling: () => void;
  stopPolling: () => void;
  refreshData: () => Promise<void>;
}

export const usePolling = (interval: number = 10000): UsePollingReturn => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isPolling, setIsPolling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const refreshData = useCallback(async () => {
    try {
      // Get cached data
      const [cachedTickets, cachedTransactions] = await Promise.all([
        getCachedTickets(),
        getCachedTransactions(),
      ]);

      setTickets(cachedTickets);
      setTransactions(cachedTransactions);

      // Poll contract state for updates
      if (cachedTickets.length > 0) {
        // This would poll the actual contract state
        // For now, we'll simulate updates
        const updatedTickets = cachedTickets.map(ticket => {
          // Simulate random status updates
          if (Math.random() < 0.1) {
            const statuses = ['open', 'assigned', 'in_progress', 'resolved', 'validated'];
            const currentIndex = statuses.indexOf(ticket.status);
            if (currentIndex < statuses.length - 1) {
              return {
                ...ticket,
                status: statuses[currentIndex + 1],
                updatedAt: new Date().toISOString(),
              };
            }
          }
          return ticket;
        });

        setTickets(updatedTickets);
      }
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  }, []);

  const startPolling = useCallback(() => {
    if (intervalRef.current) return;

    setIsPolling(true);
    refreshData(); // Initial load

    intervalRef.current = setInterval(refreshData, interval);
  }, [refreshData, interval]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    tickets,
    transactions,
    isPolling,
    startPolling,
    stopPolling,
    refreshData,
  };
};