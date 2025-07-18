import { useState, useEffect } from 'react';
import {
  useCurrentAccount,
  useSignAndExecuteTransaction
} from '@iota/dapp-kit';
import { Transaction } from '@iota/iota-sdk/transactions';
import { DSOC_PACKAGE_ID } from '../constants';

export function useCltReward() {
  const account = useCurrentAccount()?.address!;
  const { mutateAsync: runTx } = useSignAndExecuteTransaction();
  const [balance, setBalance] = useState<number>(0);

  const fetchBalance = async () => {
    const tx = new Transaction();
    // we assume user holds exactly one CLTToken resource per award or they merge them
    // for simplicity we use the contract’s get_amount on a placeholder token ID
    // ideally you’d track the actual CLTToken object ID for this address
    const dummyTokenId = '0xCLT_TOKEN_OBJECT_ID'; 
    tx.moveCall({
      target: `${DSOC_PACKAGE_ID}::CLTReward::get_amount`,
      arguments: [tx.object(dummyTokenId)]
    });
    const res = await runTx({ transaction: tx });
    setBalance(res.effects.returnValues[0] as number);
  };

  useEffect(() => {
    if (account) fetchBalance();
  }, [account]);

  return { balance };
}
