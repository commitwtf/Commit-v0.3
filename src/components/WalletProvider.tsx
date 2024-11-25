'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
    darkTheme,
    lightTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { http } from 'wagmi';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from 'react';

const queryClient = new QueryClient();

const config = getDefaultConfig({
    appName: 'Commit',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [{
        id: 7560,
        name: 'Cyber',
        nativeCurrency: {
            decimals: 18,
            symbol: 'ETH',
        },
        rpcUrls: {
            default: { http: ['https://cyber.alt.technology'] }
        }
    }],
    transports: {
        7560: http('https://cyber.alt.technology'),
    },
    ssr: true,
    enableCoolMode: true,
});

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
};

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={rainbowKitTheme}
                    modalSize="compact"
                >
                    {mounted && children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

