interface ICounter {
  onDecrement: (quantity: number) => void;
  onIncrement: (quantity: number) => void;
  value?: number;
}
