import { useState, useEffect } from 'react';
import { IGlobalContext } from 'typing/globals';
import { initWeb3, initContractWithGsn } from 'utils';

const useDapp = () => {
  const [dappState, setDappState] = useState<IGlobalContext>(null);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (dappState !== null) return;
    (async (): Promise<void> => {
      try {
        const connection = await initWeb3();
        const contractWithGsn = await initContractWithGsn(connection);

        setDappState({ contractWithGsn });
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  return { dappState, error };
};

export default useDapp;
