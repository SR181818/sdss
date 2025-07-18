// IOTA Shimmer Testnet Configuration
export const NETWORK_CONFIG = {
  name: 'shimmer-testnet',
  rpcUrl: 'https://api.testnet.shimmer.network',
  faucetUrl: 'https://faucet.testnet.shimmer.network'
}

// Replace these with your actual deployed contract addresses
// These are placeholder addresses - you'll need to deploy your Move contracts first
export const DSOC_PACKAGE_ID = '0x0000000000000000000000000000000000000000000000000000000000000001'
export const TICKET_STORE_ID = '0x0000000000000000000000000000000000000000000000000000000000000002'

// IPFS Configuration
export const IPFS_CONFIG = {
  gateway: 'https://ipfs.io/ipfs/',
  uploadEndpoint: 'https://ipfs.infura.io:5001/api/v0'
}