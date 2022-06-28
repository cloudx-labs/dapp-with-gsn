interface ICounterContract {
  increment(step: number): Promise<ContractTransaction>;
  decrement(step: number): Promise<ContractTransaction>;
  getCurrentValue(): Promise<number>;
}
