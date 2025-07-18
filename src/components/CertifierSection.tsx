import React from 'react'
import { useSocService } from '../lib/useSocService'

export default function CertifierSection({
  tickets,onComplete
}: { tickets:any[]; onComplete():void }) {
  const { validateTicket } = useSocService()
  return <div className="space-y-2">
    {tickets.map(t=>(
      <div key={t.ticket_id} className="flex items-center gap-2 p-2 bg-gray-800 rounded">
        <span>#{t.ticket_id}</span>
        <button onClick={async()=>{
          await validateTicket(t.ticket_id,true);onComplete()
        }} className="bg-green-600 px-2">Approve</button>
        <button onClick={async()=>{
          await validateTicket(t.ticket_id,false);onComplete()
        }} className="bg-red-600 px-2">Reject</button>
      </div>
    ))}
  </div>
}
