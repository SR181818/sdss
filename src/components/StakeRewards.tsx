import React, { useState } from 'react'
import { useIotaBalance } from '../lib/useIotaBalance'

export default function StakeRewards() {
  const { data: balance } = useIotaBalance()
  const [stakeAmount, setStakeAmount] = useState(100)
  const [isStaking, setIsStaking] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)

  const handleStake = async () => {
    setIsStaking(true)
    try {
      // TODO: Implement staking logic
      console.log('Staking', stakeAmount, 'IOTA')
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error('Error staking:', error)
    } finally {
      setIsStaking(false)
    }
  }

  const handleClaimRewards = async () => {
    setIsClaiming(true)
    try {
      // TODO: Implement reward claiming logic
      console.log('Claiming rewards')
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error('Error claiming rewards:', error)
    } finally {
      setIsClaiming(false)
    }
  }

  const iotaBalance = balance ? Number(balance) / 1_000_000 : 0

  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Available Balance</dt>
                <dd className="text-lg font-medium text-gray-900">{iotaBalance.toLocaleString()} IOTA</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Staked Amount</dt>
                <dd className="text-lg font-medium text-gray-900">0 IOTA</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Pending Rewards</dt>
                <dd className="text-lg font-medium text-gray-900">0 IOTA</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Staking Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Stake IOTA</h3>
          <p className="mt-1 text-sm text-gray-500">
            Stake your IOTA tokens to participate in the network and earn rewards
          </p>
        </div>
        <div className="p-6">
          <div className="max-w-md">
            <label htmlFor="stake-amount" className="block text-sm font-medium text-gray-700">
              Amount to Stake
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                id="stake-amount"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="100"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
                min="1"
                max={iotaBalance}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">IOTA</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Maximum: {iotaBalance.toLocaleString()} IOTA
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={handleStake}
              disabled={isStaking || stakeAmount <= 0 || stakeAmount > iotaBalance}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isStaking ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Staking...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Stake {stakeAmount} IOTA
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Claim Rewards</h3>
          <p className="mt-1 text-sm text-gray-500">
            Claim your earned rewards from staking and network participation
          </p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Available Rewards</p>
              <p className="text-2xl font-bold text-green-600">0 IOTA</p>
              <p className="text-sm text-gray-500">No rewards available yet</p>
            </div>
            <button
              onClick={handleClaimRewards}
              disabled={isClaiming}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isClaiming ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Claiming...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Claim Rewards
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}