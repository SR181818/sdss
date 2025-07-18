import React from 'react';
import { useCurrentAccount } from '@iota/dapp-kit';
import { useSocService } from './lib/useSocService';
import { useIotaBalance } from './lib/useIotaBalance';

import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import AnalystSection from './components/AnalystSection';
import CertifierSection from './components/CertifierSection';
import NativeBalance from './components/NativeBalance';

export function DsocDashboard() {
  const account = useCurrentAccount()!.address;
  const { tickets, refresh } = useSocService();
  const { data: iotaBalance } = useIotaBalance();

  // Filter by status
  const myTickets      = tickets.filter(t => t.client === account);
  const openTickets    = tickets.filter(t => t.status === 0);
  const claimedTickets = tickets.filter(t => t.analyst === account);
  const submitted      = tickets.filter(t => t.status === 2 && t.client === account);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold">My IOTA Balance</h2>
        <NativeBalance balance={iotaBalance} />
      </section>

      <section>
        <h2 className="text-xl font-semibold">Create Ticket</h2>
        <TicketForm onComplete={refresh} />
      </section>

      <section>
        <h2 className="text-xl font-semibold">My Tickets</h2>
        <TicketList tickets={myTickets} />
      </section>

      <section>
        <h2 className="text-xl font-semibold">Analyst – Work on Tickets</h2>
        <AnalystSection
          tickets={[...openTickets, ...claimedTickets]}
          onComplete={refresh}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold">Client – Validate Reports</h2>
        <CertifierSection tickets={submitted} onComplete={refresh} />
      </section>
    </div>
  );
}
