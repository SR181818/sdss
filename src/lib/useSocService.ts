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
  const account = useCurrentAccount()
  const { client } = useIotaClient()
  const { mutateAsync: executeTransaction } = useSignAndExecuteTransaction()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const refresh = async () => {
    if (!account?.address) return
    
    setIsLoading(true)
    try {
      // For demo purposes, we'll create some mock tickets
      // In a real implementation, you would query the blockchain for events
      const mockTickets: Ticket[] = [
        {
          ticket_id: 1,
          client: account.address,
          evidence_hash: 'QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          status: 0,
          stake: 100
        },
        {
          ticket_id: 2,
          client: '0x1234567890abcdef1234567890abcdef12345678',
          analyst: account.address,
          evidence_hash: 'QmYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
          report_hash: 'QmZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
          status: 2,
          stake: 200
        }
      ]
      
      setTickets(mockTickets)
    } catch (error) {
      console.error('Error fetching tickets:', error)
      setTickets([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (account?.address) {
      refresh()
    }
  }, [account?.address])

  const createTicket = async (evidenceCid: string, stake = 100) => {
    if (!account?.address) throw new Error('No account connected')
    
    try {
      const transaction = new Transaction()
      
      // For demo purposes, we'll simulate the transaction
      // In a real implementation, you would call the Move contract
      transaction.moveCall({
        target: `${DSOC_PACKAGE_ID}::SOCService::create_ticket`,
        arguments: [
          transaction.object(TICKET_STORE_ID),
          transaction.pure.string(evidenceCid),
          transaction.pure.u64(stake)
        ]
      })

      const result = await executeTransaction({
        transaction,
        options: {
          showEffects: true,
          showEvents: true,
        }
      })

      console.log('Ticket created:', result)
      await refresh()
    } catch (error) {
      console.error('Error creating ticket:', error)
      throw error
    }
  }

  const assignAnalyst = async (ticketId: number) => {
    if (!account?.address) throw new Error('No account connected')
    
    try {
      const transaction = new Transaction()
      
      transaction.moveCall({
        target: `${DSOC_PACKAGE_ID}::SOCService::assign_analyst`,
        arguments: [
          transaction.object(TICKET_STORE_ID),
          transaction.pure.u64(ticketId)
        ]
      })

      const result = await executeTransaction({
        transaction,
        options: {
          showEffects: true,
          showEvents: true,
        }
      })

      console.log('Analyst assigned:', result)
      await refresh()
    } catch (error) {
      console.error('Error assigning analyst:', error)
      throw error
    }
  }

  const submitReport = async (ticketId: number, reportCid: string) => {
    if (!account?.address) throw new Error('No account connected')
    
    try {
      const transaction = new Transaction()
      
      transaction.moveCall({
        target: `${DSOC_PACKAGE_ID}::SOCService::submit_report`,
        arguments: [
          transaction.object(TICKET_STORE_ID),
          transaction.pure.u64(ticketId),
          transaction.pure.string(reportCid)
        ]
      })

      const result = await executeTransaction({
        transaction,
        options: {
          showEffects: true,
          showEvents: true,
        }
      })

      console.log('Report submitted:', result)
      await refresh()
    } catch (error) {
      console.error('Error submitting report:', error)
      throw error
    }
  }

  const validateTicket = async (ticketId: number, approved: boolean) => {
    if (!account?.address) throw new Error('No account connected')
    
    try {
      const transaction = new Transaction()
      
      transaction.moveCall({
        target: `${DSOC_PACKAGE_ID}::SOCService::validate_ticket`,
        arguments: [
          transaction.object(TICKET_STORE_ID),
          transaction.pure.u64(ticketId),
          transaction.pure.bool(approved)
        ]
      })

      const result = await executeTransaction({
        transaction,
        options: {
          showEffects: true,
          showEvents: true,
        }
      })

      console.log('Ticket validated:', result)
      await refresh()
    } catch (error) {
      console.error('Error validating ticket:', error)
      throw error
    }
  }

  return {
    tickets,
    isLoading,
    refresh,
    createTicket,
    assignAnalyst,
    submitReport,
    validateTicket
  }
}