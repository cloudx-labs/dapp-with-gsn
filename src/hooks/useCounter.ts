import { useCallback, useContext, useState, useEffect } from 'react';
import { GlobalContext } from 'contexts/global';

const useCounter = (gasStationNetwork: any) => {
  const ctx = useContext(GlobalContext);
  const [counterState, setCounterState] = useState<any>(0);

  const getCounterState = useCallback(async () => {
    const counterValue = await ctx?.counterContract.getCurrentValue();
    setCounterState(counterValue);
  }, []);

  const onIncrement = useCallback(
    async (quantity: number) => {
      gasStationNetwork.updateTxStatus('sending');
      const response = await ctx?.counterContract.onIncrement(quantity);
      gasStationNetwork.updateTxStatus('waiting for mining');
      await response?.wait();
      gasStationNetwork.updateTxStatus('done');
    },
    [ctx],
  );

  const onDecrement = useCallback(
    async (quantity: number) => {
      gasStationNetwork.updateTxStatus('sending');
      const response = await ctx?.counterContract.onDecrement(quantity);
      gasStationNetwork.updateTxStatus('waiting for mining');
      await response?.wait();
      gasStationNetwork.updateTxStatus('done');
    },
    [ctx],
  );

  useEffect(() => {
    (async () => {
      if (ctx?.counterContract) {
        await getCounterState();
      }
    })();
  }, [ctx?.counterContract]);

  useEffect(() => {
    (async () => {
      if (gasStationNetwork.txStatus?.status === 'done') {
        await getCounterState();
      }
    })();
  }, [gasStationNetwork.txStatus]);

  return { onIncrement, onDecrement, counterState };
};

export default useCounter;
