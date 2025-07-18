import React, { useState } from 'react'
import { create } from 'ipfs-http-client'
import { useSocService } from '../lib/useSocService'

// Use a public IPFS gateway
const ipfs = create({ 
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: 'Basic ' + btoa('2FvfaXXXXXXXXXXXXXXX:your-secret-here')
  }
})

export default function TicketForm({ onComplete }: { onComplete(): void }) {
  const { createTicket } = useSocService()
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [stake, setStake] = useState(100)
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setStatus('Please select a file')
      return
    }

    setIsSubmitting(true)
    try {
      setStatus('Uploading evidence to IPFS...')
      
      // Create a simple text file with description if no file selected
      const fileToUpload = file || new File([description], 'evidence.txt', { type: 'text/plain' })
      
      // For demo purposes, we'll use a mock IPFS hash
      const mockHash = 'QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
      
      setStatus('Creating ticket on blockchain...')
      await createTicket(mockHash, stake)
      
      setStatus('Ticket created successfully!')
      setFile(null)
      setDescription('')
      setStake(100)
      onComplete()
      
      setTimeout(() => setStatus(''), 3000)
    } catch (error) {
      console.error('Error creating ticket:', error)
      setStatus('Error creating ticket. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Incident Description
        </label>
        <div className="mt-1">
          <textarea
            id="description"
            name="description"
            rows={4}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Describe the security incident..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="evidence" className="block text-sm font-medium text-gray-700">
          Evidence File
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            {file && (
              <p className="text-sm text-green-600 font-medium">{file.name}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="stake" className="block text-sm font-medium text-gray-700">
          Stake Amount (IOTA)
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="stake"
            name="stake"
            min="1"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={stake}
            onChange={(e) => setStake(Number(e.target.value))}
            required
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Higher stakes may attract analysts faster
        </p>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating Ticket...' : 'Submit Security Ticket'}
        </button>
      </div>

      {status && (
        <div className={`p-4 rounded-md ${
          status.includes('Error') || status.includes('Please') 
            ? 'bg-red-50 text-red-700' 
            : status.includes('successfully') 
            ? 'bg-green-50 text-green-700'
            : 'bg-blue-50 text-blue-700'
        }`}>
          <p className="text-sm">{status}</p>
        </div>
      )}
    </form>
  )
}