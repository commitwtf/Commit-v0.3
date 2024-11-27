import { useQueryClient } from '@tanstack/react-query'

const INDEXER_UPDATE_TIMEOUT = 2000

export function useUpdateQueries() {
  const queryClient = useQueryClient()

  return (queryKey: string[]) =>
    new Promise((r) =>
      setTimeout(() => r(queryClient.invalidateQueries({ queryKey })), INDEXER_UPDATE_TIMEOUT)
    )
}
