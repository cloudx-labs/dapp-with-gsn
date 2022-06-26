import { RelayProvider } from '@opengsn/provider';
import { onEvent, onProgress, ContractWithGsn } from '@use-gsn';
import { ethers, EventFilter, Signer, ContractTransaction } from 'ethers';
import CounterInterface from '../abis/src/contracts/Counter.sol/Counter.json';

class CounterContract extends ContractWithGsn implements ICounterContract {
  constructor(address: string, signer: Signer, gsnProvider: RelayProvider) {
    const theContract = new ethers.Contract(address, CounterInterface.abi, signer);
    super(signer, gsnProvider, theContract);
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
    const lookupWindow = (30 * 24 * 3600) / 12; // todo:  harcodeta
    const startBlock = Math.max(1, currentBlock - lookupWindow);

    // todo check this
    const logs = await this.theContract.queryFilter(
      this.theContract.filters.Increment(),
      startBlock,
    );
    const lastLogs = await Promise.all(logs.slice(-count).map((e) => this.getEventInfo(e)));
    return lastLogs;
  }

  // //////////////////////////////////////////////////////////////////////////////
  // Handling Events
  // //////////////////////////////////////////////////////////////////////////////
  listenToEvents(onEvent: onEvent, onProgress?: onProgress) {
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
