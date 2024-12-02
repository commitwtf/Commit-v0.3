import { Client, cacheExchange, fetchExchange } from 'urql'
import { baseSepolia, cyber } from 'viem/chains'

const baseUrl =
  'https://api.goldsky.com/api/public/project_cm3xfcgzcn8gb01yr1qf8g4jx/subgraphs/commit-subgraph'

const urls = {
  [cyber.id]: `${baseUrl}/0.0.27/gn`,
  [baseSepolia.id]: `${baseUrl}/0.0.271-base-sepolia/gn`,
}
export function createClient(chainId: number) {
  const url = urls[chainId as keyof typeof urls]
  return new Client({ url, exchanges: [cacheExchange, fetchExchange] })
}
