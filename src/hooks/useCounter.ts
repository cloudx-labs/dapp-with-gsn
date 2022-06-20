import { useCallback, useContext } from 'react';
import { GlobalContext } from 'contexts/global';

const useCounter = () => {
  const ctx = useContext(GlobalContext);

  const onIncrement = useCallback(
    async (quantity: number) => {
      ctx?.setTxStatus('sending');
      const response = await ctx?.theContract.onIncrement(quantity);
      ctx?.setTxStatus('waiting for mining');
      await response?.wait();
      ctx?.setTxStatus('done');
    },
    [ctx],
  );

  const onDecrement = useCallback(
    async (quantity: number) => {
      ctx?.setTxStatus('sending');
      const response = await ctx?.theContract.onDecrement(quantity);
      ctx?.setTxStatus('waiting for mining');
      await response?.wait();
      ctx?.setTxStatus('done');
    },
    [ctx],
  );

  return { onIncrement, onDecrement, value: 0 };
};

export default useCounter;
