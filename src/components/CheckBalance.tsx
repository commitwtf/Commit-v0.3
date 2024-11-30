'use client'
import { PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'
import { Address } from 'viem'
import { Button } from '@/components'
import { useToken } from '@/hooks/useToken'
import { TokenAmount } from './TokenAmount'
import { cn } from '@/utils'

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
      <div className={cn('text-gray-600 text-sm text-center', className)} variant='ghost' disabled>
        Insuffient balance
        <div className='text-xs'>
          (<TokenAmount value={BigInt(amount ?? 0)} token={tokenAddress} /> needed)
        </div>
      </div>
    )
  return <>{children}</>
}
