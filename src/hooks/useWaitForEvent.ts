import { type Hex, parseEventLogs } from 'viem'
import { useWalletClient } from 'wagmi'
import pRetry from 'p-retry'

import { getTransactionReceipt } from 'viem/actions'

export function useWaitForEvent(abi: readonly unknown[]) {
  const { data: client } = useWalletClient()
  return (hash: Hex, eventName: string) => {
    if (!client) throw new Error('WalletClient not found')
    return pRetry(
      () =>
        getTransactionReceipt(client, { hash }).then(({ logs }) =>
          parseEventLogs({ abi, logs, eventName })
        ),
      { retries: 5 }
    )
  }
}
