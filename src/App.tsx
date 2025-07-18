import React from 'react'
import { ConnectButton, useCurrentAccount } from '@iota/dapp-kit'
import DashboardRouter from './DashboardRouter'

export default function App() {
  const account = useCurrentAccount()
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">dSOC – Decentralized SOC</h1>
        <ConnectButton />
      </header>
      {account ? <DashboardRouter /> : <p>Please connect your wallet.</p>}
    </div>
  )
}
