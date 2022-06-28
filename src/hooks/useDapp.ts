import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { initGsn } from 'use-gsn';
import CounterContractWithGsn from 'gas-station-network/counter-contract';

const useDapp = () => {
  const [dappState, setDappState] = useState<IGlobalContext>(null);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (dappState !== null) return;
    (async (): Promise<void> => {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        if (!connection)
          throw new Error('No "window.ethereum" found. do you have Metamask installed?');

        connection.on('chainChanged', () => {
          window.location.reload();
        });
        connection.on('accountsChanged', () => {
          window.location.reload();
        });

        const paymasterAddress = process.env.PAYMASTER_ADDRESS as string;
        const counterAddress = process.env.COUNTER_ADDRESS as string;

        const gsnConfig = {
          paymasterAddress,
          performDryRunViewRelayCall: false,
          loggerConfiguration: {
            logLevel: 'debug',
          },
        };

        const { gsnSigner, relayProvider } = await initGsn(connection, gsnConfig);
        const contractWithGsn = new CounterContractWithGsn(
          counterAddress,
          gsnSigner,
          relayProvider,
        );

        setDappState({ contractWithGsn });
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  return { dappState, error };
};

export default useDapp;
