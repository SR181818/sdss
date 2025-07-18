import React, { useState } from 'react'
import { useSocService } from '../lib/useSocService'

export default function AnalystSection({
  tickets,
  onComplete
}: { 
  tickets: any[]
  onComplete(): void 
}) {
  const { assignAnalyst, submitReport } = useSocService()
  const [uploadingFor, setUploadingFor] = useState<number | null>(null)

  const handleClaim = async (ticketId: number) => {
    try {
      await assignAnalyst(ticketId)
      onComplete()
    } catch (error) {
      console.error('Error claiming ticket:', error)
    }
  }

  const handleFileUpload = async (ticketId: number, file: File) => {
    setUploadingFor(ticketId)
    try {
      // For demo purposes, use a mock IPFS hash
      const mockReportHash = 'QmReportXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
      await submitReport(ticketId, mockReportHash)
      onComplete()
    } catch (error) {
      console.error('Error submitting report:', error)
    } finally {
      setUploadingFor(null)
    }
  }

  if (!tickets.length) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets available</h3>
        <p className="mt-1 text-sm text-gray-500">Check back later for new security tickets to analyze.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div key={ticket.ticket_id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-medium text-gray-900">Ticket #{ticket.ticket_id}</h4>
              <p className="text-sm text-gray-500">Stake: {ticket.stake} IOTA</p>
            </div>
            <div className="flex items-center space-x-2">
              {ticket.status === 0 && (
                <button
                  onClick={() => handleClaim(ticket.ticket_id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Claim Ticket
                </button>
              )}
              {ticket.status === 1 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Upload Analysis Report:</span>
                  <label className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {uploadingFor === ticket.ticket_id ? 'Uploading...' : 'Upload Report'}
                    <input
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(ticket.ticket_id, file)
                      }}
                      disabled={uploadingFor === ticket.ticket_id}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Evidence</h5>
              {ticket.evidence_hash ? (
                <a
                  href={`https://ipfs.io/ipfs/${ticket.evidence_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Evidence File
                </a>
              ) : (
                <span className="text-sm text-gray-500">No evidence available</span>
              )}
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Client</h5>
              <span className="text-sm text-gray-500 font-mono">
                {ticket.client.slice(0, 12)}...{ticket.client.slice(-8)}
              </span>
            </div>
          </div>

          {ticket.status === 1 && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex">
                <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Assigned to you</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    This ticket has been assigned to you. Please analyze the evidence and upload your report.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}