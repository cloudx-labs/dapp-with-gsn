import { ContractReceipt } from "ethers";

interface ICounterContract {
  increment(step: number): Promise<ContractReceipt>;
  decrement(step: number): Promise<ContractReceipt>;
  getCurrentValue(): Promise<number>;
}
