'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type UserRole = 'client' | 'analyst' | 'certifier';

export interface User {
  id: string;
  did: string;
  role: UserRole;
  name: string;
  email: string;
  reputation: number;
  cltBalance: number;
  walletAddress: string;
}

export interface Ticket {
  id: string;
  clientId: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'validated' | 'closed';
  stakeAmount: number;
  analystId?: string;
  certifierId?: string;
  createdAt: string;
  updatedAt: string;
  evidenceHash?: string;
  resolutionHash?: string;
  ipfsHash?: string;
}

export interface Evidence {
  id: string;
  ticketId: string;
  uploadedBy: string;
  fileName: string;
  fileSize: number;
  ipfsHash: string;
  sha256Hash: string;
  timestamp: string;
}

interface AppContextType {
  user: User | null;
  tickets: Ticket[];
  evidence: Evidence[];
  isLoading: boolean;
  login: (did: string, role: UserRole) => Promise<void>;
  logout: () => void;
  createTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  assignTicket: (ticketId: string, analystId: string) => Promise<void>;
  submitEvidence: (ticketId: string, evidenceData: Omit<Evidence, 'id' | 'timestamp'>) => Promise<void>;
  validateTicket: (ticketId: string, approved: boolean) => Promise<void>;
  fetchTickets: () => Promise<void>;
  fetchEvidence: (ticketId: string) => Promise<Evidence[]>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock users database
  const mockUsers: User[] = [
    {
      id: '1',
      did: 'did:iota:client1',
      role: 'client',
      name: 'John Doe',
      email: 'john@example.com',
      reputation: 95,
      cltBalance: 0,
      walletAddress: '0x1234...5678'
    },
    {
      id: '2',
      did: 'did:iota:analyst1',
      role: 'analyst',
      name: 'Jane Smith',
      email: 'jane@example.com',
      reputation: 88,
      cltBalance: 150,
      walletAddress: '0x2345...6789'
    },
    {
      id: '3',
      did: 'did:iota:certifier1',
      role: 'certifier',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      reputation: 92,
      cltBalance: 75,
      walletAddress: '0x3456...7890'
    }
  ];

  const login = async (did: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate IOTA Identity verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = mockUsers.find(u => u.did === did && u.role === role);
      if (mockUser) {
        setUser(mockUser);
        toast.success('Login successful');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setTickets([]);
    setEvidence([]);
    toast.success('Logged out successfully');
  };

  const createTicket = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      // Simulate Move smart contract call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newTicket: Ticket = {
        ...ticketData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'open'
      };
      
      setTickets(prev => [...prev, newTicket]);
      toast.success('Ticket created successfully');
    } catch (error) {
      toast.error('Failed to create ticket');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const assignTicket = async (ticketId: string, analystId: string) => {
    setIsLoading(true);
    try {
      // Simulate Move smart contract call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, analystId, status: 'assigned' as const, updatedAt: new Date().toISOString() }
          : ticket
      ));
      toast.success('Ticket assigned successfully');
    } catch (error) {
      toast.error('Failed to assign ticket');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const submitEvidence = async (ticketId: string, evidenceData: Omit<Evidence, 'id' | 'timestamp'>) => {
    setIsLoading(true);
    try {
      // Simulate IPFS upload and IOTA Notarization
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newEvidence: Evidence = {
        ...evidenceData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      
      setEvidence(prev => [...prev, newEvidence]);
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: 'in_progress' as const, evidenceHash: newEvidence.sha256Hash, updatedAt: new Date().toISOString() }
          : ticket
      ));
      toast.success('Evidence submitted successfully');
    } catch (error) {
      toast.error('Failed to submit evidence');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const validateTicket = async (ticketId: string, approved: boolean) => {
    setIsLoading(true);
    try {
      // Simulate Move smart contract validation and CLT minting
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId 
          ? { 
              ...ticket, 
              status: approved ? 'validated' as const : 'open' as const,
              certifierId: user?.id,
              updatedAt: new Date().toISOString()
            }
          : ticket
      ));
      
      if (approved) {
        toast.success('Ticket validated and CLT tokens minted');
      } else {
        toast.success('Ticket rejected and funds refunded');
      }
    } catch (error) {
      toast.error('Failed to validate ticket');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      // Simulate fetching from blockchain
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock tickets data
      const mockTickets: Ticket[] = [
        {
          id: '1',
          clientId: '1',
          title: 'Suspicious Network Activity',
          description: 'Detected unusual network traffic patterns',
          severity: 'high',
          status: 'open',
          stakeAmount: 100,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          updatedAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '2',
          clientId: '1',
          title: 'Malware Detection',
          description: 'Potential malware found in system',
          severity: 'critical',
          status: 'assigned',
          stakeAmount: 200,
          analystId: '2',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          updatedAt: new Date(Date.now() - 1800000).toISOString()
        }
      ];
      
      setTickets(mockTickets);
    } catch (error) {
      toast.error('Failed to fetch tickets');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvidence = async (ticketId: string): Promise<Evidence[]> => {
    // Simulate fetching evidence from IPFS
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return evidence.filter(e => e.ticketId === ticketId);
  };

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  return (
    <AppContext.Provider value={{
      user,
      tickets,
      evidence,
      isLoading,
      login,
      logout,
      createTicket,
      assignTicket,
      submitEvidence,
      validateTicket,
      fetchTickets,
      fetchEvidence
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};