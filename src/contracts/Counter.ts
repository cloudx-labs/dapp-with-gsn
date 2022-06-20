/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface CounterInterface extends utils.Interface {
  functions: {
    "currentUser()": FunctionFragment;
    "decrement(uint256)": FunctionFragment;
    "increment(uint256)": FunctionFragment;
    "isTrustedForwarder(address)": FunctionFragment;
    "value()": FunctionFragment;
    "versionRecipient()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "currentUser"
      | "decrement"
      | "increment"
      | "isTrustedForwarder"
      | "value"
      | "versionRecipient"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "currentUser",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "decrement",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "increment",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isTrustedForwarder",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "value", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "versionRecipient",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "currentUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decrement", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "increment", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "value", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "versionRecipient",
    data: BytesLike
  ): Result;

  events: {
    "Decrement(address,address,uint256)": EventFragment;
    "Increment(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Decrement"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Increment"): EventFragment;
}

export interface DecrementEventObject {
  currentUser: string;
  previousUser: string;
  step: BigNumber;
}
export type DecrementEvent = TypedEvent<
  [string, string, BigNumber],
  DecrementEventObject
>;

export type DecrementEventFilter = TypedEventFilter<DecrementEvent>;

export interface IncrementEventObject {
  currentUser: string;
  previousUser: string;
  step: BigNumber;
}
export type IncrementEvent = TypedEvent<
  [string, string, BigNumber],
  IncrementEventObject
>;

export type IncrementEventFilter = TypedEventFilter<IncrementEvent>;

export interface Counter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CounterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    currentUser(overrides?: CallOverrides): Promise<[string]>;

    decrement(
      step: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    increment(
      step: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    value(overrides?: CallOverrides): Promise<[BigNumber]>;

    versionRecipient(overrides?: CallOverrides): Promise<[string]>;
  };

  currentUser(overrides?: CallOverrides): Promise<string>;

  decrement(
    step: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  increment(
    step: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isTrustedForwarder(
    forwarder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  value(overrides?: CallOverrides): Promise<BigNumber>;

  versionRecipient(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    currentUser(overrides?: CallOverrides): Promise<string>;

    decrement(
      step: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    increment(
      step: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    value(overrides?: CallOverrides): Promise<BigNumber>;

    versionRecipient(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Decrement(address,address,uint256)"(
      currentUser?: PromiseOrValue<string> | null,
      previousUser?: PromiseOrValue<string> | null,
      step?: null
    ): DecrementEventFilter;
    Decrement(
      currentUser?: PromiseOrValue<string> | null,
      previousUser?: PromiseOrValue<string> | null,
      step?: null
    ): DecrementEventFilter;

    "Increment(address,address,uint256)"(
      currentUser?: PromiseOrValue<string> | null,
      previousUser?: PromiseOrValue<string> | null,
      step?: null
    ): IncrementEventFilter;
    Increment(
      currentUser?: PromiseOrValue<string> | null,
      previousUser?: PromiseOrValue<string> | null,
      step?: null
    ): IncrementEventFilter;
  };

  estimateGas: {
    currentUser(overrides?: CallOverrides): Promise<BigNumber>;

    decrement(
      step: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    increment(
      step: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    value(overrides?: CallOverrides): Promise<BigNumber>;

    versionRecipient(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    currentUser(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decrement(
      step: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    increment(
      step: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    value(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    versionRecipient(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}