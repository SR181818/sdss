import React from 'react';

export default function CltBalance({ balance }: { balance: number }) {
  return <p className="font-mono">CLT Balance: {balance}</p>;
}
