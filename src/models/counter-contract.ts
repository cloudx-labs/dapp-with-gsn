import { Signer, ContractReceipt } from 'ethers';
import { ICounterContract } from 'typing/counter-contract';
import { txParams } from 'utils/constants';
import { Counter__factory, Counter } from '../../typechain-types';

class CounterContract implements ICounterContract {
  theContract: Counter;

  constructor(address: string, signer: Signer) {
    const theContract = Counter__factory.connect(address, signer);
    this.theContract = theContract;
  }

  async increment(step: number): Promise<ContractReceipt> {
    const response = await this.theContract.increment(step, txParams);
    const receipt = await response.wait();
    return receipt;
  }

  async decrement(step: number): Promise<ContractReceipt> {
    const response = await this.theContract.decrement(step, txParams);
    const receipt = await response.wait();
    return receipt;
  }

  async getCurrentValue(): Promise<number> {
    const currentValue = await this.theContract.value();
    const value = currentValue.toNumber();
    return value;
  }
}

export default CounterContract;
