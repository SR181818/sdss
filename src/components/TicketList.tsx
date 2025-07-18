import React from 'react'
export default function TicketList({ tickets }: { tickets:any[] }) {
  if(!tickets.length)return <p>No tickets</p>
  return <ul className="space-y-2">
    {tickets.map(t=>(
      <li key={t.ticket_id} className="p-2 bg-gray-800 rounded">
        #{t.ticket_id} stake {t.stake} status {t.status}
      </li>
    ))}
  </ul>
}
