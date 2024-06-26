import { abi } from "../abi/abi.json";
import ERC20ABI from "../abi/ERC20.json";

export const CONTRACT_ADDRESS = "0x3b623dC0fe382AD4433E523Fda86b968CD3aA42f";
export const STABLECOIN_ADDRESS = "0x874069fa1eb16d44d622f2e0ca25eea172369bc1";
export const OLAS_ENDPOINT = "http://127.0.0.1:8000";
export const ERC20_ABI = ERC20ABI;
export const CONTRACT_ABI = abi;

// erc20ABI.js
export const erc20ABI = [
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  // Include other ERC-20 functions if needed
];
