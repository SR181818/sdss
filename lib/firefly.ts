// Firefly Wallet Integration for Static dApp
import { generateSHA256, buildMoveTransaction, getContractAddresses } from './iota';

export interface FireflyWallet {
  isConnected: boolean;
  address: string | null;
  did: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  signAndSubmitTransaction: (transaction: any) => Promise<string>;
  getVerifiableCredential: (type: string) => Promise<any>;
}

// Mock Firefly integration (replace with actual @iota/firefly-connect)
class FireflyWalletImpl implements FireflyWallet {
  isConnected = false;
  address: string | null = null;
  did: string | null = null;

  async connect(): Promise<void> {
    try {
      // Simulate Firefly connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.isConnected = true;
      this.address = '0x' + Math.random().toString(16).substring(2, 42);
      this.did = 'did:iota:' + Math.random().toString(36).substring(2, 15);
      
      console.log('Firefly wallet connected:', { address: this.address, did: this.did });
    } catch (error) {
      console.error('Firefly connection failed:', error);
      throw new Error('Failed to connect to Firefly wallet');
    }
  }

  disconnect(): void {
    this.isConnected = false;
    this.address = null;
    this.did = null;
  }

  async signAndSubmitTransaction(transaction: any): Promise<string> {
    if (!this.isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      // Simulate transaction signing and submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const txHash = '0x' + Math.random().toString(16).substring(2, 66);
      console.log('Transaction submitted:', { transaction, txHash });
      
      return txHash;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw new Error('Failed to submit transaction');
    }
  }

  async getVerifiableCredential(type: string): Promise<any> {
    if (!this.isConnected) {
      throw new Error('Wallet not connected');
    }

    // Mock VC generation based on type
    const mockVCs = {
      Client: {
        id: `${this.did}#client-vc`,
        type: ['VerifiableCredential', 'ClientCredential'],
        issuer: 'did:iota:issuer123',
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: this.did,
          role: 'client',
          permissions: ['create_ticket', 'view_tickets'],
        },
      },
      Analyst: {
        id: `${this.did}#analyst-vc`,
        type: ['VerifiableCredential', 'AnalystCredential'],
        issuer: 'did:iota:issuer123',
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: this.did,
          role: 'analyst',
          permissions: ['assign_analyst', 'submit_evidence'],
          reputation: 85,
        },
      },
      Certifier: {
        id: `${this.did}#certifier-vc`,
        type: ['VerifiableCredential', 'CertifierCredential'],
        issuer: 'did:iota:issuer123',
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: this.did,
          role: 'certifier',
          permissions: ['validate_and_payout'],
          authority: 'senior',
        },
      },
    };

    return mockVCs[type as keyof typeof mockVCs] || null;
  }
}

// Singleton wallet instance
let walletInstance: FireflyWallet | null = null;

export const getFireflyWallet = (): FireflyWallet => {
  if (!walletInstance) {
    walletInstance = new FireflyWalletImpl();
  }
  return walletInstance;
};

// Smart contract interaction helpers
export const createTicket = async (
  description: string,
  stakeAmount: number,
  evidenceFile?: File
): Promise<string> => {
  const wallet = getFireflyWallet();
  const { socService } = getContractAddresses();

  // Generate evidence hash
  let evidenceHash = '';
  if (evidenceFile) {
    const fileBuffer = await evidenceFile.arrayBuffer();
    evidenceHash = await generateSHA256(new Uint8Array(fileBuffer));
  } else {
    evidenceHash = await generateSHA256(description);
  }

  const transaction = buildMoveTransaction(
    socService,
    'SOCService',
    'create_ticket',
    [stakeAmount, Array.from(new TextEncoder().encode(evidenceHash))]
  );

  return await wallet.signAndSubmitTransaction(transaction);
};

export const assignAnalyst = async (ticketId: number): Promise<string> => {
  const wallet = getFireflyWallet();
  const { socService } = getContractAddresses();

  const transaction = buildMoveTransaction(
    socService,
    'SOCService',
    'assign_analyst',
    [ticketId]
  );

  return await wallet.signAndSubmitTransaction(transaction);
};

export const submitEvidence = async (
  ticketId: number,
  evidenceFile: File,
  ipfsHash: string
): Promise<string> => {
  const wallet = getFireflyWallet();
  const { socService } = getContractAddresses();

  // Generate evidence hash
  const fileBuffer = await evidenceFile.arrayBuffer();
  const evidenceHash = await generateSHA256(new Uint8Array(fileBuffer));

  const transaction = buildMoveTransaction(
    socService,
    'SOCService',
    'submit_evidence',
    [ticketId, Array.from(new TextEncoder().encode(evidenceHash))]
  );

  return await wallet.signAndSubmitTransaction(transaction);
};

export const validateAndPayout = async (
  ticketId: number,
  approved: boolean
): Promise<string> => {
  const wallet = getFireflyWallet();
  const { socService } = getContractAddresses();

  const transaction = buildMoveTransaction(
    socService,
    'SOCService',
    'validate_and_payout',
    [ticketId, approved]
  );

  return await wallet.signAndSubmitTransaction(transaction);
};

// CLT balance query
export const getCLTBalance = async (address: string): Promise<number> => {
  try {
    // Mock CLT balance query
    await new Promise(resolve => setTimeout(resolve, 500));
    return Math.floor(Math.random() * 1000);
  } catch (error) {
    console.error('Failed to get CLT balance:', error);
    return 0;
  }
};