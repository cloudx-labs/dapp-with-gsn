import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';

type GSNStatusRequest = 'waiting for mining' | 'sending' | 'done';

const prependEvents = (currentEvents: any[] | undefined, newEvents: any[]) => {
  return [...(newEvents ?? []).reverse(), ...(currentEvents ?? [])].slice(0, 5);
};

export const useGsn = (theContract: any) => {
  const [gsnStatus, setGSNStatus] = useState({
    relayHubAddress: '',
    forwarderAddress: '',
    paymasterAddress: '',
    paymasterBalance: '',
    totalRelayers: 0,
  });

  const [txStatus, setTxStatus] = useState<any>(null);

  const updateStatus = useCallback(async (gsnStatus: GsnStatusInfo) => {
    if (gsnStatus === undefined) {
      gsnStatus = await theContract.getGsnStatus();
    }
    const paymasterBalanceBN = await gsnStatus.getPaymasterBalance();
    const paymasterBalance = paymasterBalanceBN.toString();
    setGSNStatus((prev) => ({ ...prev, paymasterBalance }));

    const totalRelayersBN = await gsnStatus.getActiveRelayers();
    const totalRelayers = +totalRelayersBN.toString();
    setGSNStatus((prev) => ({ ...prev, totalRelayers }));
  }, []);

  const getItinialState = useCallback(async () => {
    theContract.listenToEvents((status: GsnStatusInfo) => updateStatus(status));

    const gsnStatus = await theContract.getGsnStatus();

    setGSNStatus((prev) => ({
      ...prev,
      relayHubAddress: gsnStatus.relayHubAddress,
      forwarderAddress: gsnStatus.forwarderAddress,
      paymasterAddress: gsnStatus.paymasterAddress,
    }));
    await updateStatus(gsnStatus);
  }, [updateStatus]);

  const log = (event: any) =>
    setTxStatus((prev: any) => ({ ...prev, events: prependEvents(prev?.events, [event]) }));

  const progress = ({ event, error = null }: any) =>
    setTxStatus((prev: any) => ({ ...prev, status: event, error }));

  const onEvent = (event: any) => log(event);
  const onProgress = ({ event }: any) => progress({ event });

  const getContractState = useCallback(async () => {
    const events = (await theContract.getPastEvents()) as ethers.Event[];
    setTxStatus((prev: any) => ({ ...prev, events: prependEvents([], events) }));
  }, [setTxStatus, theContract]);

  const updateTxStatus = useCallback(
    (status: GSNStatusRequest) => {
      setTxStatus((prev: any) => ({ ...prev, status }));
    },
    [setTxStatus],
  );

  useEffect(() => {
    (async () => {
      if (theContract) {
        await getContractState();
        theContract.listenToEvents(onEvent, onProgress);
      }
    })();
  }, [theContract]);

  useEffect(() => {
    if (txStatus?.status === 'done') {
      (async () => {
        await getContractState();
      })();
    }
  }, [txStatus]);

  useEffect(() => {
    (async () => {
      if (theContract) await getItinialState();
    })();
  }, [theContract]);

  return {
    gsnStatus,
    updateTxStatus,
    txStatus,
  };
};
