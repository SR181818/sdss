import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Theme } from '@radix-ui/themes'
import { IotaClientProvider, WalletProvider } from '@iota/dapp-kit'

import App from './App'
import './index.css'

// Your Shimmer Testnet config
const networks = {
  'shimmer-testnet': {
    type: 'testnet',
    url: 'https://api.testnet.shimmer.network'
  }
}

// Instantiate React Query client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    {/* 1) Must wrap everything in QueryClientProvider */}
    <QueryClientProvider client={queryClient}>

      {/* 2) Then IotaClientProvider so useIotaClientContext exists */}
      <IotaClientProvider networks={networks}>

        {/* 3) Then WalletProvider so ConnectButton & auto-connect work */}
        <WalletProvider>

          {/* 4) (Optional) Theming & Routing */}
          <Theme appearance="dark" accentColor="blue" radius="medium">
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Theme>

        </WalletProvider>
      </IotaClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
