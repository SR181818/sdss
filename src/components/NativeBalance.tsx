import React from 'react'
export default function NativeBalance({balance}:{balance?:bigint}) {
  if(balance===undefined)return <p>Loading…</p>
  return <p>IOTA Balance: {balance.toString()}</p>
}
