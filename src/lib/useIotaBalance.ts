import { useCurrentAccount, useIotaClientQuery } from '@iota/dapp-kit'
export function useIotaBalance() {
  const acct = useCurrentAccount()?.address
  return useIotaClientQuery(['bal',acct], ({client}) => client.getBalance(), { enabled:!!acct })
}
