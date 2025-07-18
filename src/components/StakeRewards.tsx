import React, { useState } from 'react'
import { useIotaBalance } from '../lib/useIotaBalance'
export default function StakeRewards(){
  const {data}=useIotaBalance()
  const [amt,setAmt]=useState(0)
  return <div className="space-y-2">
    <p>Balance: {data?.toString()}</p>
    <input type="number" value={amt} onChange={e=>setAmt(Number(e.target.value))}
      className="p-1 text-black" />
    <button className="bg-blue-600 px-3 py-1">Stake {amt}</button>
    <button className="bg-green-600 px-3 py-1">Claim Rewards</button>
  </div>
}
