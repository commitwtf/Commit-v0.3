'use client'

import { Address } from 'viem'
import { cyber, hardhat } from 'viem/chains'
import { useChainId } from 'wagmi'

export const defaultNetwork = hardhat

type NetworkConfig = {
  weth: Address
  protocol: Address
  tokens: Address[]
}

export const config: Record<number, NetworkConfig> = {
  [hardhat.id]: {
    weth: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    protocol: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
    tokens: ['0x5fbdb2315678afecb367f032d93f642f64180aa3'],
  },
  [cyber.id]: {
    weth: '0x4200000000000000000000000000000000000006',
    protocol: '0x15964a2eb1ad3fa3262508e6d81b21d7a537c11c',
    tokens: [
      '0x4200000000000000000000000000000000000006',
      '0x14778860e937f509e651192a90589de711fb88a9',
    ],
  },
}

export function useConfig() {
  const chainId = useChainId()

  return config[chainId] ?? {}
}
