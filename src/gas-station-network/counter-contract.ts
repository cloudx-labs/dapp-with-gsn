import { GsnEvent, RelayProvider } from '@opengsn/provider';
import { ethers, EventFilter, Signer, ContractTransaction } from 'ethers';
import CounterInterface from '../abis/src/contracts/Counter.sol/Counter.json';

class CounterContract implements ICounterContract {
  theContract: ethers.Contract;
  ethersProvider: ethers.providers.Provider;
  blockDates: { [key: number]: Date };
  gsnProvider: RelayProvider;

  constructor(address: string, signer: Signer, gsnProvider: RelayProvider) {
    this.theContract = new ethers.Contract(address, CounterInterface.abi, signer);
    this.ethersProvider = signer.provider!;
    this.gsnProvider = gsnProvider;
    this.blockDates = {};
  }

  onIncrement(step: number): Promise<ContractTransaction> {
    return this.theContract.increment(step, {
      maxPriorityFeePerGas: 500000000000,
      maxFeePerGas: 500000000000,
      gasLimit: 500000,
    });
  }

  onDecrement(step: number): Promise<ContractTransaction> {
    return this.theContract.decrement(step, {
      maxPriorityFeePerGas: 500000000000,
      maxFeePerGas: 500000000000,
      gasLimit: 500000,
    });
  }

  async getCurrentValue() {
    const currentValue = await this.theContract.value();
    const value = currentValue.toNumber();
    return value;
  }

  // //////////////////////////////////////////////////////////////////////////////
  // Relay Status
  // //////////////////////////////////////////////////////////////////////////////
  async getGsnStatus(): Promise<GsnStatusInfo> {
    const { relayClient } = this.gsnProvider;
    const { contractInteractor, knownRelaysManager } = relayClient.dependencies;
    const { relayHubAddress, forwarderAddress, paymasterAddress } =
      contractInteractor.getDeployment();
    const { relayHubInstance } = contractInteractor;

    const getPaymasterBalance = () => relayHubInstance.balanceOf(paymasterAddress as string);
    const getActiveRelayers = async () => {
      await knownRelaysManager.refresh();
      const relayers = knownRelaysManager.allRelayers.length;
      return relayers;
    };

    return {
      relayHubAddress,
      forwarderAddress,
      paymasterAddress,
      getPaymasterBalance,
      getActiveRelayers,
    };
  }
  // //////////////////////////////////////////////////////////////////////////////
  // Methods to handle events
  // //////////////////////////////////////////////////////////////////////////////
  async getEventInfo(e: ethers.Event): Promise<EventInfo> {
    if (!e.args) {
      return {
        previousHolder: 'notevent',
        currentHolder: JSON.stringify(e),
      };
    }
    return {
      date: await this.getBlockDate(e.blockNumber),
      previousHolder: e.args.previousHolder, // todo: this is necessary ?
      currentHolder: e.args.currentHolder, // todo: this is necessary ?
    };
  }

  async getPastEvents(count = 5) {
    const currentBlock = (await this.ethersProvider.getBlockNumber()) - 1;
    const lookupWindow = (30 * 24 * 3600) / 12; // todo harcodeta
    const startBlock = Math.max(1, currentBlock - lookupWindow);

    // todo check this
    const logs = await this.theContract.queryFilter(
      this.theContract.filters.Increment(),
      startBlock,
    );
    const lastLogs = await Promise.all(logs.slice(-count).map((e) => this.getEventInfo(e)));
    return lastLogs;
  }

  async getBlockDate(blockNumber: number) {
    if (!this.blockDates[blockNumber]) {
      this.blockDates[blockNumber] = new Date(
        await this.ethersProvider.getBlock(blockNumber).then((b) => {
          return b.timestamp * 1000;
        }),
      );
    }
    return this.blockDates[blockNumber];
  }
  // //////////////////////////////////////////////////////////////////////////////
  // Handling Events
  // //////////////////////////////////////////////////////////////////////////////
  listenToEvents(onEvent: (e: EventInfo) => void, onProgress?: (e: GsnEvent) => void) {
    // @ts-ignore
    const listener = async (from, to, event) => {
      const info = await this.getEventInfo(event);
      onEvent(info);
    };

    this.theContract.on('Increment', listener);
    this.theContract.on('Decrement', listener);
    if (onProgress != undefined) {
      this.gsnProvider.registerEventListener(onProgress);
    }
  }

  stopListenToEvents(onEvent?: EventFilter, onProgress = null) {
    this.theContract.off(onEvent as any, null as any);
    this.gsnProvider.unregisterEventListener(onProgress as any);
  }
}

export default CounterContract;
