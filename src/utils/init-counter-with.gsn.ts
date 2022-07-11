import CounterContractWithGsn from 'models/counter-contract';
import { RelayProvider } from '@opengsn/provider';
import { ethers } from 'ethers';
import { Web3Provider } from '@opengsn/common';

export const initContractWithGsn = async (connection: Web3Provider) => {
  const paymasterAddress = process.env.PAYMASTER_ADDRESS!;
  const counterAddress = process.env.COUNTER_ADDRESS!;

  const relayProvider = RelayProvider.newProvider({
    provider: connection,
    config: {
      paymasterAddress,
      performDryRunViewRelayCall: false,
      loggerConfiguration: { logLevel: 'debug' },
    },
  });

  await relayProvider.init();
  // @ts-ignore
  const gsnProvider = new ethers.providers.Web3Provider(relayProvider);
  const gsnSigner = gsnProvider.getSigner();
  const contractWithGsn = new CounterContractWithGsn(counterAddress, gsnSigner);

  return contractWithGsn;
};
