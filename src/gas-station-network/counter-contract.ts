import { RelayProvider } from '@opengsn/provider';
import { ContractWithGsn } from 'use-gsn';
import { ethers, Signer, ContractTransaction } from 'ethers';
import CounterInterface from '../abis/src/contracts/Counter.sol/Counter.json';

// todo: refactor
// const network = 'ganache-local';
// const chainId = 1337;
// const txParams = getTransactionParams(network, chainId);

const txParams = {
  maxPriorityFeePerGas: 500000000000,
  maxFeePerGas: 500000000000,
  gasLimit: 500000,
};

class CounterContract extends ContractWithGsn implements ICounterContract {
  constructor(address: string, signer: Signer, gsnProvider: RelayProvider) {
    const theContract = new ethers.Contract(address, CounterInterface.abi, signer);
    const events = ['Increment', 'Decrement'];
    super(signer, gsnProvider, theContract, events);
  }

  increment(step: number): Promise<ContractTransaction> {
    return this.theContract.increment(step, txParams);
  }

  decrement(step: number): Promise<ContractTransaction> {
    return this.theContract.decrement(step, txParams);
  }

  async getCurrentValue() {
    const currentValue = await this.theContract.value();
    const value = currentValue.toNumber();
    return value;
  }
}

export default CounterContract;
