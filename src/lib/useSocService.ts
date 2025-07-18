import { useState, useEffect } from 'react'
import { useCurrentAccount, useIotaClient, useSignAndExecuteTransaction } from '@iota/dapp-kit'
import { Transaction } from '@iota/iota-sdk/transactions'
import { DSOC_PACKAGE_ID, TICKET_STORE_ID } from '../constants'

export type Ticket = {
  ticket_id: number
  client: string
  analyst?: string
  evidence_hash: string
  report_hash?: string
  status: number
  stake: number
}

export function useSocService() {
  const account = useCurrentAccount()!.address
  const { client } = useIotaClient()
  const { mutateAsync: runTx } = useSignAndExecuteTransaction()
  const [tickets, setTickets] = useState<Ticket[]>([])

  const refresh = async () => {
    // scrape events
    const events = await client.getEvents({ contractAddress: DSOC_PACKAGE_ID })
    const map = new Map<number, Ticket>()
    events.forEach(evt => {
      const [tid, a, b] = evt.data as any
      let rec = map.get(Number(tid)) || { ticket_id: Number(tid), client:'', stake:0,evidence_hash:'',status:0 }
      if (evt.type === 'TicketCreated') {
        rec.client = a; rec.stake = Number(b)
      } else if (evt.type==='TicketAssigned') {
        rec.analyst = a; rec.status=1
      } else if (evt.type==='ReportSubmitted') {
        rec.report_hash = new TextDecoder().decode(b); rec.status=2
      } else if (evt.type==='TicketValidated') {
        rec.status = a ? 3 : 4
      }
      map.set(Number(tid), rec)
    })
    setTickets(Array.from(map.values()))
  }

  useEffect(() => { if (account) refresh() }, [account])

  async function createTicket(evidenceCid: string, stake=100) {
    const stakeTx = new Transaction()
    stakeTx.moveCall({
      target: `${DSOC_PACKAGE_ID}::SOCService::create_stake`,
      arguments: [stakeTx.pure.u64(stake)]
    })
    const stakeRes = await runTx({ transaction: stakeTx })
    const stakeToken = stakeRes.effects.created[0]

    const ticketTx = new Transaction()
    ticketTx.moveCall({
      target: `${DSOC_PACKAGE_ID}::SOCService::create_ticket`,
      arguments: [ticketTx.object(TICKET_STORE_ID), ticketTx.object(stakeToken), ticketTx.pure.string(evidenceCid)]
    })
    await runTx({ transaction: ticketTx })
    await refresh()
  }

  async function assignAnalyst(ticketId: number) {
    const tx = new Transaction()
    tx.moveCall({
      target: `${DSOC_PACKAGE_ID}::SOCService::assign_analyst`,
      arguments: [tx.object(TICKET_STORE_ID), tx.pure.u64(ticketId)]
    })
    await runTx({ transaction: tx })
    await refresh()
  }

  async function submitReport(ticketId: number, cid:string) {
    const tx = new Transaction()
    tx.moveCall({
      target: `${DSOC_PACKAGE_ID}::SOCService::submit_report`,
      arguments: [tx.object(TICKET_STORE_ID), tx.pure.u64(ticketId), tx.pure.string(cid)]
    })
    await runTx({ transaction: tx })
    await refresh()
  }

  async function validateTicket(ticketId: number, approved:boolean) {
    const tx = new Transaction()
    tx.moveCall({
      target: `${DSOC_PACKAGE_ID}::SOCService::validate_ticket`,
      arguments: [tx.object(TICKET_STORE_ID), tx.pure.u64(ticketId), tx.pure.bool(approved)]
    })
    await runTx({ transaction: tx })
    await refresh()
  }

  return { tickets, refresh, createTicket, assignAnalyst, submitReport, validateTicket }
}
