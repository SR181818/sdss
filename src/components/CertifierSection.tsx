import React, { useState } from 'react'
import { useSocService } from '../lib/useSocService'

export default function CertifierSection({
  tickets,
  onComplete
}: { 
  tickets: any[]
  onComplete(): void 
}) {
  const { validateTicket } = useSocService()
  const [processing, setProcessing] = useState<number | null>(null)

  const handleValidation = async (ticketId: number, approved: boolean) => {
    setProcessing(ticketId)
    try {
      await validateTicket(ticketId, approved)
      onComplete()
    } catch (error) {
      console.error('Error validating ticket:', error)
    } finally {
      setProcessing(null)
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No reports to validate</h3>
        <p className="mt-1 text-sm text-gray-500">Reports will appear here when analysts submit their analysis.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {tickets.map((ticket) => (
        <div key={ticket.ticket_id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900">Ticket #{ticket.ticket_id}</h4>
                <p className="text-sm text-gray-500">Stake: {ticket.stake} IOTA</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleValidation(ticket.ticket_id, true)}
                  disabled={processing === ticket.ticket_id}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {processing === ticket.ticket_id ? 'Processing...' : 'Approve'}
                </button>
                <button
                  onClick={() => handleValidation(ticket.ticket_id, false)}
                  disabled={processing === ticket.ticket_id}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {processing === ticket.ticket_id ? 'Processing...' : 'Reject'}
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Original Evidence</h5>
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
                    View Evidence
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">No evidence</span>
                )}
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Analysis Report</h5>
                {ticket.report_hash ? (
                  <a
                    href={`https://ipfs.io/ipfs/${ticket.report_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Report
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">No report</span>
                )}
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Analyst</h5>
                <span className="text-sm text-gray-500 font-mono">
                  {ticket.analyst ? `${ticket.analyst.slice(0, 12)}...${ticket.analyst.slice(-8)}` : 'Unassigned'}
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-200">
            <div className="flex">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Pending Validation</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Please review the evidence and analysis report carefully before making your decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}