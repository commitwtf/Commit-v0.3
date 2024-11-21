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
import { base } from 'wagmi/chains';

const config = getDefaultConfig({
    appName: 'Commit',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [base],
    transports: {
        [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL!),
    },
    ssr: true
});

const queryClient = new QueryClient();

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
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={rainbowKitTheme}
                    modalSize="compact"
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

