import React from 'react'
import { useIotaBalance } from '../lib/useIotaBalance'

export default function NativeBalance() {
  const { data: balance, isLoading, error } = useIotaBalance()
  
  if (isLoading) return <span className="text-gray-500">Loading...</span>
  if (error) return <span className="text-red-500">Error loading balance</span>
  if (balance === undefined) return <span className="text-gray-500">No balance data</span>
  
  // Convert from smallest unit to IOTA (divide by 1,000,000)
  const iotaAmount = Number(balance) / 1_000_000
  
  return (
    <span className="font-mono text-lg">
      {iotaAmount.toLocaleString()} IOTA
    </span>
  )
}