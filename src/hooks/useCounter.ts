import { useCallback, useContext } from 'react';
import { GlobalContext } from 'contexts/global';
import { ethers } from 'ethers';

const useCounter = () => {
  const ctx = useContext(GlobalContext);

  const onIncrement = useCallback(
    async (quantity: number) => {
      ctx?.setTxStatus('sending');
      console.log(ctx);
      const response = await ctx?.contractHandler.theContract.increment(quantity, {
        maxPriorityFeePerGas: 500000000000,
        maxFeePerGas: 500000000000,
        gasLimit: 500000,
      });
      ctx?.setTxStatus('waiting for mining');
      await response?.wait();
      ctx?.setTxStatus('done');
    },
    [ctx],
  );

  const onDecrement = useCallback(
    async (quantity: number) => {
      ctx?.setTxStatus('sending');
      const response = await ctx?.contractHandler.theContract.decrement(quantity);
      ctx?.setTxStatus('waiting for mining');
      await response?.wait();
      ctx?.setTxStatus('done');
    },
    [ctx],
  );

  return { onIncrement, onDecrement, value: 0 };
};

export default useCounter;
