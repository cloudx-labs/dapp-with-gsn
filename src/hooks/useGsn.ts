import { useCallback, useContext, useEffect, useState } from 'react';
import CounterContractWithGsn from 'gas-station-network/counter-contract';
import { GlobalContext } from 'contexts/global';

type GSNStatusRequest = 'waiting for mining' | 'sending' | 'done';

const prependEvents = (currentEvents: any[] | undefined, newEvents: any[]) => {
  return [...(newEvents ?? []).reverse(), ...(currentEvents ?? [])].slice(0, 5);
};

export const useGsn = () => {
  const ctx = useContext(GlobalContext);
  const [gsnStatus, setGSNStatus] = useState<any>({
    relayHubAddress: '',
    forwarderAddress: '',
    paymasterAddress: '',
    paymasterBalance: '',
    totalRelayers: '',
  });
  const [txStatus, setTxStatus] = useState<any>(null);

  const updateGsnStatus = useCallback(async (gsnStatusHandler?: GsnStatusInfo) => {
    if (gsnStatusHandler === undefined) {
      // todo: check lo de los params.. .this is necessary?
      gsnStatusHandler = await ctx?.counterContract.getGsnStatus();
      return;
    }
    const paymasterBalance = await gsnStatusHandler.getPaymasterBalance();
    const totalRelayers = await gsnStatusHandler.getActiveRelayers();

    setGSNStatus({
      paymasterBalance: paymasterBalance.toString(),
      totalRelayers: totalRelayers.toString(),
      relayHubAddress: gsnStatusHandler.relayHubAddress,
      forwarderAddress: gsnStatusHandler.forwarderAddress,
      paymasterAddress: gsnStatusHandler.paymasterAddress,
    });
  }, []);

  const getItinialState = useCallback(async () => {
    ctx?.counterContract.listenToEvents(() => updateGsnStatus()); // todo: todo check que onda los params aca
    const gsnStatusHandler = await ctx?.counterContract.getGsnStatus();

    await updateGsnStatus(gsnStatusHandler);
  }, [updateGsnStatus]);

  const log = (event: any) =>
    setTxStatus((prev: any) => ({ ...prev, events: prependEvents(prev?.events, [event]) }));

  const progress = ({ event, error = null }: any) =>
    setTxStatus((prev: any) => ({ ...prev, status: event, error }));

  const onEvent = (event: any) => log(event);
  const onProgress = ({ event }: any) => progress({ event });

  // todo: refactor this
  const getContractState = useCallback(async () => {
    const events = await ctx?.counterContract.getPastEvents();
    setTxStatus((prev: any) => ({ ...prev, events: prependEvents([], events) }));
  }, [setTxStatus, ctx?.counterContract]);

  const updateTxStatus = useCallback(
    (status: GSNStatusRequest) => setTxStatus((prev: any) => ({ ...prev, status })),
    [setTxStatus],
  );

  // initial state
  useEffect(() => {
    (async () => {
      if (ctx?.counterContract) {
        ctx?.counterContract.listenToEvents(onEvent, onProgress);
        await getContractState();
        await getItinialState();
      }
    })();
  }, [ctx?.counterContract]);

  // update state
  useEffect(() => {
    (async () => {
      if (txStatus?.status === 'done') {
        await getContractState();
        await updateGsnStatus();
      }
    })();
  }, [txStatus]);

  return { gsnStatus, updateTxStatus, txStatus };
};
