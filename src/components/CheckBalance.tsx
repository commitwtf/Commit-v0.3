'use client'
import { PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'
import { Address } from 'viem'
import { Button } from '@/components'
import { useToken } from '@/hooks/useToken'

export function CheckBalance({
  children,
  amount,
  tokenAddress,
  className,
}: PropsWithChildren<{ amount: number | bigint; tokenAddress: Address; className?: string }>) {
  const { address } = useAccount()
  const token = useToken(tokenAddress, address)
  if (amount > (token.data?.value ?? 0))
    return (
      <Button className={className} variant='ghost' disabled>
        Insuffient balance
      </Button>
    )
  return <>{children}</>
}
