import React, { useState } from 'react'
import { create } from 'ipfs-http-client'
import { useSocService } from '../lib/useSocService'

const ipfs = create({ url:'https://ipfs.io/api/v0' })

export default function TicketForm({ onComplete }: { onComplete():void }) {
  const { createTicket } = useSocService()
  const [file,setFile]=useState<File|null>(null)
  const [status,setStatus]=useState('')

  const handle=async()=>{
    if(!file){setStatus('Pick file');return}
    setStatus('Uploading...')
    const {path}=await ipfs.add(file)
    setStatus('Creating ticket...')
    await createTicket(path)
    setStatus('Done')
    onComplete()
  }

  return (
    <div className="space-y-2">
      <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <button onClick={handle} className="px-4 py-1 bg-blue-600">Submit Ticket</button>
      {status && <p>{status}</p>}
    </div>
  )
}
