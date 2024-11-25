import { erc20Abi, formatUnits, type Address } from 'viem'
import { useReadContract, useReadContracts, useWriteContract } from 'wagmi'
import { useWaitForEvent } from './useWaitForEvent'

export function useToken(token: Address, account?: Address) {
  const contract = {
    address: token,
    abi: [
      ...erc20Abi,
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  } as const

  const { data, ...query } = useReadContracts({
    contracts: [
      { ...contract, functionName: 'symbol' },
      { ...contract, functionName: 'decimals' },
      ...(account ? [{ ...contract, functionName: 'balanceOf', args: [account] }] : []),
    ],
  })

  const [symbol, decimals = 0, balance = 0] = data?.map((d) => d.result) ?? []

  return {
    ...query,
    data: query.isPending
      ? null
      : {
          address: token,
          value: balance as number | undefined,
          formatted: formatUnits(BigInt(balance as number), Number(decimals)),
          symbol,
          decimals: Number(decimals),
        },
  }
}

export function useAllowance(token: Address, owner: Address, spender: Address) {
  return useReadContract({
    abi: erc20Abi,
    address: token,
    args: [owner, spender],
    functionName: 'allowance',
    query: { enabled: Boolean(owner && spender) },
  })
}
export function useApprove(token: Address, spender: Address) {
  const approve = useWriteContract()
  const waitForEvent = useWaitForEvent(erc20Abi)
  return {
    ...approve,
    writeContractAsync: (amount = BigInt(0)) =>
      approve
        .writeContractAsync({
          address: token,
          abi: erc20Abi,
          functionName: 'approve',
          args: [spender, amount],
        })
        .then((hash) => waitForEvent(hash, 'Approval')),
  }
}
