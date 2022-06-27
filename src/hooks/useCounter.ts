import { useCallback, useContext, useState, useEffect } from 'react';
import { GlobalContext } from 'contexts/global';

const useCounter = () => {
  const ctx = useContext(GlobalContext);
  const [counterState, setCounterState] = useState(0);

  const getCounterState = useCallback(async () => {
    const counterValue = await ctx?.contractWithGsn.getCurrentValue();
    setCounterState(counterValue);
  }, []);

  const onIncrement = useCallback(
    async (quantity: number) => {
      const response = await ctx?.contractWithGsn.onIncrement(quantity);
      await response?.wait();
      await getCounterState();
    },
    [ctx],
  );

  const onDecrement = useCallback(
    async (quantity: number) => {
      const response = await ctx?.contractWithGsn.onDecrement(quantity);
      await response?.wait();
      await getCounterState();
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

  return { onIncrement, onDecrement, counterState };
};

export default useCounter;
