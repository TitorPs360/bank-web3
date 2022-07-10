/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  Migrations,
  MigrationsInterface,
} from "../../Test.sol/Migrations";

const _abi = [
  {
    inputs: [],
    name: "last_completed_migration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "completed",
        type: "uint256",
      },
    ],
    name: "setCompleted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561005057600080fd5b50610327806100606000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063445df0ac146100465780638da5cb5b14610064578063fdacd57614610082575b600080fd5b61004e61009e565b60405161005b9190610179565b60405180910390f35b61006c6100a4565b60405161007991906101d5565b60405180910390f35b61009c60048036038101906100979190610221565b6100c8565b005b60015481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610156576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161014d906102d1565b60405180910390fd5b8060018190555050565b6000819050919050565b61017381610160565b82525050565b600060208201905061018e600083018461016a565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006101bf82610194565b9050919050565b6101cf816101b4565b82525050565b60006020820190506101ea60008301846101c6565b92915050565b600080fd5b6101fe81610160565b811461020957600080fd5b50565b60008135905061021b816101f5565b92915050565b600060208284031215610237576102366101f0565b5b60006102458482850161020c565b91505092915050565b600082825260208201905092915050565b7f546869732066756e6374696f6e206973207265737472696374656420746f207460008201527f686520636f6e74726163742773206f776e657200000000000000000000000000602082015250565b60006102bb60338361024e565b91506102c68261025f565b604082019050919050565b600060208201905081810360008301526102ea816102ae565b905091905056fea2646970667358221220783b00d5f0add6eafa598d397eb04bdd10ad649052942d3743c4478a8b16fe3564736f6c634300080f0033";

type MigrationsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MigrationsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Migrations__factory extends ContractFactory {
  constructor(...args: MigrationsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Migrations> {
    return super.deploy(overrides || {}) as Promise<Migrations>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Migrations {
    return super.attach(address) as Migrations;
  }
  override connect(signer: Signer): Migrations__factory {
    return super.connect(signer) as Migrations__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MigrationsInterface {
    return new utils.Interface(_abi) as MigrationsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Migrations {
    return new Contract(address, _abi, signerOrProvider) as Migrations;
  }
}
