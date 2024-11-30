'use client'

import '@rainbow-me/rainbowkit/styles.css'
import '@reservoir0x/relay-kit-ui/styles.css'

import { getDefaultConfig, RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Chain, cyber, hardhat, mainnet } from 'viem/chains'
import { RelayKitProvider } from '@reservoir0x/relay-kit-ui'
import { convertViemChainToRelayChain } from '@reservoir0x/relay-sdk'
import { MAINNET_RELAY_API, TESTNET_RELAY_API } from '@reservoir0x/relay-sdk'

const queryClient = new QueryClient()

const chains: [Chain, Chain] = [cyber, mainnet]

if (process.env.NODE_ENV !== 'production') chains.push(hardhat)

const config = getDefaultConfig({
  appName: 'Commit',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains,

  transports: chains.reduce(
    (acc, x) => ({
      ...acc,
      [x.id]: http(x.rpcUrls.default.http[0]),
    }),
    {}
  ),
  ssr: true,
})

const rainbowKitTheme = {
  lightMode: lightTheme({
    accentColor: '#2ecc71',
    accentColorForeground: 'white',
    borderRadius: 'medium',
  }),
  darkMode: darkTheme({
    accentColor: '#1a5e1a',
    accentColorForeground: 'white',
    borderRadius: 'medium',
  }),
}

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RelayKitProvider
          options={{
            appName: 'Commit::Relay',
            appFees: [
              {
                recipient: '0x0000000000000000000000000000000000000000',
                fee: '100', // 1%
              },
            ],
            duneApiKey: process.env.NEXT_PUBLIC_DUNE_API_KEY!,
            chains: chains.map(convertViemChainToRelayChain),
            baseApiUrl: MAINNET_RELAY_API,
          }}
        >
          <RainbowKitProvider initialChain={cyber} theme={rainbowKitTheme} modalSize='compact'>
            {mounted && children}
          </RainbowKitProvider>
        </RelayKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
