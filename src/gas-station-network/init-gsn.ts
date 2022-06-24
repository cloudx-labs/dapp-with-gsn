import { Web3Provider } from '@opengsn/common';
import { GSNConfig, RelayProvider } from '@opengsn/provider';
import { ethers } from 'ethers';

export const initGsn = async (paymasterAddress: string, connection: Web3Provider) => {
  const gsnConfig: Partial<GSNConfig> = {
    paymasterAddress,
    performDryRunViewRelayCall: false,
    loggerConfiguration: {
      logLevel: 'debug',
    },
  };

  const relayProvider = RelayProvider.newProvider({
    provider: connection,
    config: gsnConfig,
  });

  await relayProvider.init();
  // @ts-ignore
  const gsnProvider = new ethers.providers.Web3Provider(relayProvider);
  const gsnSigner = gsnProvider.getSigner();

  return { relayProvider, gsnSigner };
};
