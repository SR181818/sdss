import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Theme } from '@radix-ui/themes'
import { IotaClientProvider, WalletProvider } from '@iota/dapp-kit'
import { getFullnodeUrl } from '@iota/iota-sdk/client'

import App from './App'
import './index.css'

// IOTA Network Configuration
const networks = {
  'shimmer-testnet': {
    url: getFullnodeUrl('testnet'),
    variables: {
      IOTA_FAUCET_URL: 'https://faucet.testnet.shimmer.network'
    }
  }
}

// React Query Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: 30000, // 30 seconds
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <IotaClientProvider networks={networks} defaultNetwork="shimmer-testnet">
        <WalletProvider autoConnect>
          <Theme appearance="light" accentColor="indigo" radius="medium">
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Theme>
        </WalletProvider>
      </IotaClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
)