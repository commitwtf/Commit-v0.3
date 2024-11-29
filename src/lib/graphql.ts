import { Client, cacheExchange, fetchExchange } from 'urql'

export const client = new Client({
  url: 'https://api.goldsky.com/api/public/project_cm3xfcgzcn8gb01yr1qf8g4jx/subgraphs/commit-subgraph/0.0.27/gn',
  exchanges: [cacheExchange, fetchExchange],
})
