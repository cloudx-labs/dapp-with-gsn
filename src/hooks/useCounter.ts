import { useCallback, useContext, useState, useEffect } from 'react';
import { GlobalContext } from 'contexts/global';

const useCounter = () => {
  const { contractWithGsn } = useContext(GlobalContext)!;
  const [counterValue, setCounterValue] = useState(0);

  const getCounterState = useCallback(async () => {
    const value = await contractWithGsn.getCurrentValue();
    setCounterValue(value);
  }, []);

  const onIncrement = useCallback(
    async (quantity: number) => {
      const response = await contractWithGsn.increment(quantity);
      await response?.wait();
      await getCounterState();
    },
    [contractWithGsn],
  );

  const onDecrement = useCallback(
    async (quantity: number) => {
      const response = await contractWithGsn.decrement(quantity);
      await response?.wait();
      await getCounterState();
    },
    [contractWithGsn],
  );

  useEffect(() => {
    (async () => {
      await getCounterState();
    })();
  }, [contractWithGsn]);

  return { onIncrement, onDecrement, counterValue };
};

export default useCounter;
