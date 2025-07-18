
// Supabase Configuration
// Please add your Supabase credentials to the Secrets tool:
// VITE_SUPABASE_URL=your_supabase_url
// VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Check if we're using placeholder values
const isPlaceholder = supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder')
if (isPlaceholder) {
  console.warn('⚠️  Using placeholder Supabase credentials. Please add real credentials to the Secrets tool.')
}

import { createClient } from '@supabase/supabase-js'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface DbTicket {
  id: string
  ticket_id?: number
  client_address: string
  analyst_address?: string
  evidence_hash: string
  report_hash?: string
  status: number
  stake_amount: number
  title?: string
  description?: string
  category?: string
  created_at?: string
  updated_at?: string
}

export interface DbStakeToken {
  id: string
  owner_address: string
  amount: number
  is_used: boolean
  created_at?: string
}

export interface DbCLTToken {
  id: string
  owner_address: string
  amount: number
  created_at?: string
}

// Supabase Service Class
export class SupabaseService {
  // Ticket operations
  static async createTicket(ticket: Omit<DbTicket, 'id' | 'created_at' | 'updated_at'>): Promise<DbTicket | null> {
    if (isPlaceholder) {
      console.log('Mock: Creating ticket in placeholder mode')
      return {
        id: 'mock-' + Date.now(),
        ...ticket,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
    
    try {
      const { data, error } = await supabase
        .from('tickets')
        .insert([ticket])
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error creating ticket:', error)
      return null
    }
  }

  static async updateTicket(id: string, updates: Partial<DbTicket>): Promise<DbTicket | null> {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error updating ticket:', error)
      return null
    }
  }

  static async getTicketsByClient(clientAddress: string): Promise<DbTicket[]> {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('client_address', clientAddress)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching client tickets:', error)
      return []
    }
  }

  static async getTicketsByAnalyst(analystAddress: string): Promise<DbTicket[]> {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('analyst_address', analystAddress)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching analyst tickets:', error)
      return []
    }
  }

  static async getOpenTickets(): Promise<DbTicket[]> {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('status', 0) // Open status
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching open tickets:', error)
      return []
    }
  }

  // Stake token operations
  static async createStakeToken(stakeToken: Omit<DbStakeToken, 'id' | 'created_at'>): Promise<DbStakeToken | null> {
    try {
      const { data, error } = await supabase
        .from('stake_tokens')
        .insert([stakeToken])
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error creating stake token:', error)
      return null
    }
  }

  static async getUserStakeTokens(userAddress: string): Promise<DbStakeToken[]> {
    try {
      const { data, error } = await supabase
        .from('stake_tokens')
        .select('*')
        .eq('owner_address', userAddress)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching stake tokens:', error)
      return []
    }
  }

  // CLT token operations
  static async createCLTToken(cltToken: Omit<DbCLTToken, 'id' | 'created_at'>): Promise<DbCLTToken | null> {
    try {
      const { data, error } = await supabase
        .from('clt_tokens')
        .insert([cltToken])
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error creating CLT token:', error)
      return null
    }
  }

  static async getUserCLTTokens(userAddress: string): Promise<DbCLTToken[]> {
    try {
      const { data, error } = await supabase
        .from('clt_tokens')
        .select('*')
        .eq('owner_address', userAddress)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching CLT tokens:', error)
      return []
    }
  }
}
