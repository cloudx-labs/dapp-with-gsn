import { GsnEvent, RelayProvider } from '@opengsn/provider';
import { ethers, EventFilter, Signer, ContractTransaction } from 'ethers';
import { GasStationNetwork } from '../@use-gsn';
import CounterInterface from '../abis/src/contracts/Counter.sol/Counter.json';

const COUNTER_ADDRESS = '0x';

class CounterContract extends GasStationNetwork {
  constructor(signer: Signer, gsnProvider: RelayProvider) {
    const contract = new ethers.Contract(COUNTER_ADDRESS, CounterInterface.abi, signer);
    super(signer, gsnProvider, contract);
  }

  async onIncrement(step: number): Promise<ContractTransaction> {
    return await this.theContract.increment(step, { gasPrice: 100000 });
  }

  async onDecrement(step: number): Promise<ContractTransaction> {
    return await this.theContract.decrement(step);
  }

  async getCurrentValue() {
    const currentValue = await this.theContract.value();
    const value = currentValue.toNumber();
    return value;
  }
  // //////////////////////////////////////////////////////////////////////////////
  // Override events
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
