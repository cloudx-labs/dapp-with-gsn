interface GsnStatusInfo {
  getActiveRelayers: () => Promise<number>;
  getPaymasterBalance: () => Promise<BN>;
  relayHubAddress?: string;
  paymasterAddress?: string;
  forwarderAddress?: string;
}

interface IGasStationNetwork {
  theContract: ethers.Contract;
  ethersProvider: ethers.providers.Provider;
  blockDates: { [key: number]: Date };
  gsnProvider: RelayProvider;

  getEventInfo: (e: ethers.Event) => Promise<EventInfo>;
  listenToEvents: (onEvent: (e: EventInfo) => void, onProgress?: (e: GsnEvent) => void) => void;
  stopListenToEvents: (onEvent?: EventFilter, onProgress = null) => void;
  getBlockDate: (blockNumber: number) => Promise<Date>;
  getPastEvents: (count?: number) => Promise<ethers.Event[]>;
  getGsnStatus: () => Promise<GsnStatusInfo>;
}
