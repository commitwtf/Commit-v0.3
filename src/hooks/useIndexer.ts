import { createClient } from '@/lib/graphql'
import { useQuery } from '@tanstack/react-query'
import { useChainId } from 'wagmi'

export function useIndexer() {
  const chainId = useChainId()
  return useQuery({
    queryKey: ['indexer-client', chainId],
    queryFn: () => createClient(chainId!),
    enabled: Boolean(chainId),
  })
}
