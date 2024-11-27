import { Address } from 'viem'
import { useEnsName } from 'wagmi'
import { truncate } from '@/utils/truncate'

export function EnsName({ address }: { address?: Address }) {
  const { data: name } = useEnsName({
    address,
    chainId: 1,
    query: { enabled: Boolean(address) },
  })

  return <div>{name ?? truncate(address)}</div>
}
