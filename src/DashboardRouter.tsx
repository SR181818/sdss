import React from 'react'
import { useCurrentAccount } from '@iota/dapp-kit'
import { useSocService } from './lib/useSocService'
import ClientView from './components/TicketForm'
import TicketList from './components/TicketList'
import AnalystSection from './components/AnalystSection'
import CertifierSection from './components/CertifierSection'
import NativeBalance from './components/NativeBalance'
import StakeRewards from './components/StakeRewards'

export default function DashboardRouter() {
  const account = useCurrentAccount()!.address
  const { tickets, refresh } = useSocService()

  const myTickets      = tickets.filter(t => t.client === account)
  const open           = tickets.filter(t => t.status === 0)
  const assigned       = tickets.filter(t => t.analyst === account)
  const submitted      = tickets.filter(t => t.status === 2 && t.client === account)

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold">My IOTA Balance</h2>
        <NativeBalance />
      </section>
      <section>
        <h2 className="text-xl font-semibold">Client</h2>
        <ClientView onComplete={refresh} />
        <TicketList tickets={myTickets} />
      </section>
      <section>
        <h2 className="text-xl font-semibold">Analyst</h2>
        <AnalystSection tickets={[...open, ...assigned]} onComplete={refresh} />
      </section>
      <section>
        <h2 className="text-xl font-semibold">Certifier</h2>
        <CertifierSection tickets={submitted} onComplete={refresh} />
      </section>
      <section>
        <h2 className="text-xl font-semibold">Stake & Rewards</h2>
        <StakeRewards />
      </section>
    </div>
  )
}
