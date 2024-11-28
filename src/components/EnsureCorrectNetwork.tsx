'use client'
import { PropsWithChildren } from 'react'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { Button } from '@/components'
import { cyber } from 'viem/chains'

export function EnsureCorrectNetwork({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const { isConnected } = useAccount()
  const chainId = useChainId()

  const isCorrectNetwork = isConnected && chainId === cyber?.id

  const { switchChain } = useSwitchChain()

  if (!isCorrectNetwork)
    return (
      <Button className={className} onClick={() => switchChain({ chainId: cyber?.id })}>
        Switch Network
      </Button>
    )

  return <>{children}</>
}
