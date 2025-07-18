import { useCurrentAccount, useIotaClientQuery } from '@iota/dapp-kit'

export function useIotaBalance() {
  const account = useCurrentAccount()
  
  return useIotaClientQuery(
    'getBalance',
    {
      owner: account?.address || '',
    },
    {
      enabled: !!account?.address,
      refetchInterval: 10000, // Refetch every 10 seconds
    }
  )
}