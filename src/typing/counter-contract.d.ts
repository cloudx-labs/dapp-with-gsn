interface CounterState {
  currentValue?: number;
  events?: any[];
  status?: string;
}

interface ICounterContract {
  onIncrement(step: number): Promise<ContractTransaction>;
  onDecrement(step: number): Promise<ContractTransaction>;
  getCurrentValue(): Promise<number>;
}
