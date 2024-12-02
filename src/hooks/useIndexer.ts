import { createClient } from '@/lib/graphql'
import { useParams } from 'next/navigation'
import { useChainId } from 'wagmi'

export function useIndexer() {
  const params = useParams()
  const _chainId = useChainId()

  const chainId = Number(params.chainId || _chainId)
  return chainId ? createClient(chainId) : undefined
}
