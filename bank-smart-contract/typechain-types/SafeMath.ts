/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface SafeMathInterface extends utils.Interface {
  functions: {
    "safeAdd(uint256,uint256)": FunctionFragment;
    "safeDiv(uint256,uint256)": FunctionFragment;
    "safeMul(uint256,uint256)": FunctionFragment;
    "safeSub(uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "safeAdd" | "safeDiv" | "safeMul" | "safeSub"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "safeAdd",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "safeDiv",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "safeMul",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "safeSub",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "safeAdd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeDiv", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeMul", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeSub", data: BytesLike): Result;

  events: {};
}

export interface SafeMath extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SafeMathInterface;

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
    safeAdd(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { c: BigNumber }>;

    safeDiv(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { c: BigNumber }>;

    safeMul(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { c: BigNumber }>;

    safeSub(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { c: BigNumber }>;
  };

  safeAdd(
    a: PromiseOrValue<BigNumberish>,
    b: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  safeDiv(
    a: PromiseOrValue<BigNumberish>,
    b: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  safeMul(
    a: PromiseOrValue<BigNumberish>,
    b: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  safeSub(
    a: PromiseOrValue<BigNumberish>,
    b: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    safeAdd(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeDiv(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeMul(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeSub(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    safeAdd(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeDiv(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeMul(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeSub(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    safeAdd(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeDiv(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeMul(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeSub(
      a: PromiseOrValue<BigNumberish>,
      b: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}