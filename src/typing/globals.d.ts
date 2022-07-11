import { ICounterContract } from './counter-contract';

type IGlobalContext = {
  contractWithGsn: ICounterContract;
} | null;
