import { createContext, useContext, useEffect, useState } from 'react'
import { useIotaClient } from '@iota/dapp-kit'

type Role = 'CLIENT'|'ANALYST'|'CERTIFIER'|null
const RoleContext = createContext<Role|null>(null)
export function RoleProvider({ children }: { children: React.ReactNode }) {
  const { client, account } = useIotaClient()
  const [role, setRole] = useState<Role>(null)

  useEffect(() => {
    if (!account) return setRole(null)
    ;(async()=>{
      // assume your Move backend has view fns: is_client, is_analyst, is_certifier
      const calls = await Promise.all([
        client.callRead({ contractAddress: "0xbec69147e6d51ff32994389b52eb3ee10a7414d07801bb9d5aaa1ba1c6e6b345", func:`${0xbec69147e6d51ff32994389b52eb3ee10a7414d07801bb9d5aaa1ba1c6e6b345}::SOCService::is_client`, args:[account.address] }),
        client.callRead({ contractAddress: "0xbec69147e6d51ff32994389b52eb3ee10a7414d07801bb9d5aaa1ba1c6e6b345", func:`${0xbec69147e6d51ff32994389b52eb3ee10a7414d07801bb9d5aaa1ba1c6e6b345}::SOCService::is_analyst`, args:[account.address] }),
        client.callRead({ contractAddress: "0xbec69147e6d51ff32994389b52eb3ee10a7414d07801bb9d5aaa1ba1c6e6b345", func:`${0xbec69147e6d51ff32994389b52eb3ee10a7414d07801bb9d5aaa1ba1c6e6b345}::SOCService::is_certifier`, args:[account.address] })
      ])
      const [c,a,cf] = calls.map(r=>r.result)
      if (c) setRole('CLIENT')
      else if (a) setRole('ANALYST')
      else if (cf) setRole('CERTIFIER')
      else setRole(null)
    })()
  }, [account])

  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>
}
export const useRole = () => useContext(RoleContext)
