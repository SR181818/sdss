import { Client, SecretManager, Utils } from '@iota/sdk-wasm';
import { Resolver, Document, VerifiableCredential } from '@iota/identity-wasm';

// IOTA SDK Client (browser-compatible)
let iotaClient: Client | null = null;

export const getIotaClient = async (): Promise<Client> => {
  if (!iotaClient) {
    const { Client } = await import('@iota/sdk-wasm');
    iotaClient = new Client({
      nodes: [process.env.NEXT_PUBLIC_IOTA_NODE_URL!],
      localPow: true,
    });
  }
  return iotaClient;
};

// Identity resolver for DID verification
let resolver: Resolver | null = null;

export const getIdentityResolver = async (): Promise<Resolver> => {
  if (!resolver) {
    const { Resolver } = await import('@iota/identity-wasm');
    resolver = new Resolver({
      client: await getIotaClient(),
    });
  }
  return resolver;
};

// Gas Station integration
export const getGasStationAddress = (): string => {
  return process.env.NEXT_PUBLIC_GAS_STATION_ADDRESS!;
};

// Contract addresses
export const getContractAddresses = () => ({
  socService: process.env.NEXT_PUBLIC_SOC_SERVICE_ADDRESS!,
  cltReward: process.env.NEXT_PUBLIC_CLT_REWARD_ADDRESS!,
});

// Utility functions
export const generateSHA256 = async (data: string | Uint8Array): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = typeof data === 'string' ? encoder.encode(data) : data;
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// IPFS hash validation
export const isValidIPFSHash = (hash: string): boolean => {
  return /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/.test(hash) || /^bafy[a-z0-9]{55}$/.test(hash);
};

// Transaction utilities
export interface MoveTransaction {
  function: string;
  typeArguments: string[];
  arguments: any[];
}

export const buildMoveTransaction = (
  contractAddress: string,
  moduleName: string,
  functionName: string,
  args: any[] = [],
  typeArgs: string[] = []
): MoveTransaction => ({
  function: `${contractAddress}::${moduleName}::${functionName}`,
  typeArguments: typeArgs,
  arguments: args,
});

// Notarization service
export const anchorToNotarization = async (hash: string): Promise<string> => {
  const endpoint = process.env.NEXT_PUBLIC_NOTARIZATION_ENDPOINT!;
  
  try {
    const response = await fetch(`${endpoint}/anchor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        hash,
        metadata: {
          timestamp: Date.now(),
          source: 'dSOC-platform',
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Notarization failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.anchorId || result.transactionId;
  } catch (error) {
    console.error('Notarization error:', error);
    throw new Error('Failed to anchor hash to IOTA Notarization');
  }
};

// Polling utilities for real-time updates
export const pollContractState = async (
  contractAddress: string,
  resourceType: string,
  interval: number = 10000
): Promise<any> => {
  const client = await getIotaClient();
  
  const poll = async (): Promise<any> => {
    try {
      // This would be replaced with actual Move resource query
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IOTA_NODE_URL}/v1/accounts/${contractAddress}/resource/${resourceType}`
      );
      
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Polling error:', error);
    }
    return null;
  };

  return poll();
};