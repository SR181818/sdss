// IPFS Storage via Web3.Storage (browser-only)
import { Web3Storage } from 'web3.storage';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Web3.Storage client
let web3StorageClient: Web3Storage | null = null;

const getWeb3StorageClient = (): Web3Storage => {
  if (!web3StorageClient) {
    const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;
    if (!token) {
      throw new Error('Web3.Storage token not configured');
    }
    web3StorageClient = new Web3Storage({ token });
  }
  return web3StorageClient;
};

// Upload file to IPFS
export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const client = getWeb3StorageClient();
    const cid = await client.put([file], {
      name: `dsoc-evidence-${Date.now()}`,
      maxRetries: 3,
    });
    
    console.log('File uploaded to IPFS:', { filename: file.name, cid });
    return cid;
  } catch (error) {
    console.error('IPFS upload failed:', error);
    throw new Error('Failed to upload file to IPFS');
  }
};

// Get IPFS URL
export const getIPFSUrl = (cid: string, filename?: string): string => {
  const gateway = process.env.NEXT_PUBLIC_IPFS_GATEWAY!;
  return filename ? `${gateway}${cid}/${filename}` : `${gateway}${cid}`;
};

// IndexedDB Schema for local caching
interface DSoCDB extends DBSchema {
  tickets: {
    key: string;
    value: {
      id: string;
      clientAddress: string;
      title: string;
      description: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      status: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'validated';
      stakeAmount: number;
      analystAddress?: string;
      certifierAddress?: string;
      evidenceHash?: string;
      ipfsHash?: string;
      createdAt: string;
      updatedAt: string;
      txHash: string;
    };
  };
  evidence: {
    key: string;
    value: {
      id: string;
      ticketId: string;
      filename: string;
      ipfsHash: string;
      sha256Hash: string;
      uploadedBy: string;
      timestamp: string;
    };
  };
  transactions: {
    key: string;
    value: {
      hash: string;
      type: 'create_ticket' | 'assign_analyst' | 'submit_evidence' | 'validate_and_payout';
      status: 'pending' | 'confirmed' | 'failed';
      timestamp: string;
      blockHeight?: number;
    };
  };
}

let db: IDBPDatabase<DSoCDB> | null = null;

const getDB = async (): Promise<IDBPDatabase<DSoCDB>> => {
  if (!db) {
    db = await openDB<DSoCDB>('dsoc-cache', 1, {
      upgrade(db) {
        // Tickets store
        if (!db.objectStoreNames.contains('tickets')) {
          const ticketStore = db.createObjectStore('tickets', { keyPath: 'id' });
          ticketStore.createIndex('status', 'status');
          ticketStore.createIndex('clientAddress', 'clientAddress');
          ticketStore.createIndex('analystAddress', 'analystAddress');
        }

        // Evidence store
        if (!db.objectStoreNames.contains('evidence')) {
          const evidenceStore = db.createObjectStore('evidence', { keyPath: 'id' });
          evidenceStore.createIndex('ticketId', 'ticketId');
          evidenceStore.createIndex('uploadedBy', 'uploadedBy');
        }

        // Transactions store
        if (!db.objectStoreNames.contains('transactions')) {
          const txStore = db.createObjectStore('transactions', { keyPath: 'hash' });
          txStore.createIndex('type', 'type');
          txStore.createIndex('status', 'status');
        }
      },
    });
  }
  return db;
};

// Ticket operations
export const cacheTicket = async (ticket: DSoCDB['tickets']['value']): Promise<void> => {
  const database = await getDB();
  await database.put('tickets', ticket);
};

export const getCachedTickets = async (filter?: {
  status?: string;
  clientAddress?: string;
  analystAddress?: string;
}): Promise<DSoCDB['tickets']['value'][]> => {
  const database = await getDB();
  let tickets = await database.getAll('tickets');

  if (filter) {
    tickets = tickets.filter(ticket => {
      if (filter.status && ticket.status !== filter.status) return false;
      if (filter.clientAddress && ticket.clientAddress !== filter.clientAddress) return false;
      if (filter.analystAddress && ticket.analystAddress !== filter.analystAddress) return false;
      return true;
    });
  }

  return tickets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getCachedTicket = async (id: string): Promise<DSoCDB['tickets']['value'] | undefined> => {
  const database = await getDB();
  return await database.get('tickets', id);
};

// Evidence operations
export const cacheEvidence = async (evidence: DSoCDB['evidence']['value']): Promise<void> => {
  const database = await getDB();
  await database.put('evidence', evidence);
};

export const getCachedEvidence = async (ticketId: string): Promise<DSoCDB['evidence']['value'][]> => {
  const database = await getDB();
  const tx = database.transaction('evidence', 'readonly');
  const index = tx.store.index('ticketId');
  return await index.getAll(ticketId);
};

// Transaction operations
export const cacheTransaction = async (transaction: DSoCDB['transactions']['value']): Promise<void> => {
  const database = await getDB();
  await database.put('transactions', transaction);
};

export const getCachedTransactions = async (type?: string): Promise<DSoCDB['transactions']['value'][]> => {
  const database = await getDB();
  
  if (type) {
    const tx = database.transaction('transactions', 'readonly');
    const index = tx.store.index('type');
    return await index.getAll(type);
  }
  
  return await database.getAll('transactions');
};

// Clear cache
export const clearCache = async (): Promise<void> => {
  const database = await getDB();
  const tx = database.transaction(['tickets', 'evidence', 'transactions'], 'readwrite');
  await Promise.all([
    tx.objectStore('tickets').clear(),
    tx.objectStore('evidence').clear(),
    tx.objectStore('transactions').clear(),
  ]);
};