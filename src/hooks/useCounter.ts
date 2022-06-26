import { useCallback, useContext, useState, useEffect } from 'react';
import { GlobalContext } from 'contexts/global';

const useCounter = (contractWithGsn: any) => {
  const ctx = useContext(GlobalContext);
  const [counterState, setCounterState] = useState<any>(0);

  const getCounterState = useCallback(async () => {
    const counterValue = await ctx?.contractWithGsn.getCurrentValue();
    setCounterState(counterValue);
  }, []);

  const onIncrement = useCallback(
    async (quantity: number) => {
      contractWithGsn.updateTxStatus('sending');
      const response = await ctx?.contractWithGsn.onIncrement(quantity);
      contractWithGsn.updateTxStatus('waiting for mining');
      await response?.wait();
      contractWithGsn.updateTxStatus('done');
    },
    [ctx],
  );

  const onDecrement = useCallback(
    async (quantity: number) => {
      contractWithGsn.updateTxStatus('sending');
      const response = await ctx?.contractWithGsn.onDecrement(quantity);
      contractWithGsn.updateTxStatus('waiting for mining');
      await response?.wait();
      contractWithGsn.updateTxStatus('done');
    },
    [ctx],
  );

  useEffect(() => {
    (async () => {
      if (ctx?.contractWithGsn) {
        await getCounterState();
      }
    })();
  }, [ctx?.contractWithGsn]);

  useEffect(() => {
    (async () => {
      if (contractWithGsn.txStatus?.status === 'done') {
        await getCounterState();
      }
    })();
  }, [contractWithGsn.txStatus]);

  return { onIncrement, onDecrement, counterState };
};

export default useCounter;
