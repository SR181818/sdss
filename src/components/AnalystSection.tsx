import React from 'react'
import { create } from 'ipfs-http-client'
import { useSocService } from '../lib/useSocService'

const ipfs = create({ url:'https://ipfs.io/api/v0' })

export default function AnalystSection({
  tickets,onComplete
}: { tickets:any[]; onComplete():void }) {
  const { assignAnalyst, submitReport } = useSocService()

  return <div className="space-y-4">
    {tickets.map(t=>(
      <div key={t.ticket_id} className="p-3 bg-gray-800 rounded">
        <div>#{t.ticket_id} stake {t.stake}</div>
        {t.status===0 && <button onClick={async()=>{
          await assignAnalyst(t.ticket_id);onComplete()
        }} className="bg-green-600 px-2">Claim</button>}
        {t.status===1 && <input type="file"
          onChange={async e=>{
            const f=e.target.files?.[0];if(!f)return
            const {path}=await ipfs.add(f)
            await submitReport(t.ticket_id,path)
            onComplete()
          }}
        />}
      </div>
    ))}
  </div>
}
