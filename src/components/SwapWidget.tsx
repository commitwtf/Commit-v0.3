import { SwapWidget } from '@reservoir0x/relay-kit-ui'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { config } from '@/hooks/useConfig'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui'
import { cyber } from 'viem/chains'
import { zeroAddress } from 'viem'

export default function RelaySwapWidget() {
  const { openConnectModal } = useConnectModal()
  const [isOpen, setOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        variant='outline'
        className='w-full bg-[#DCDCDC] dark:bg-[#2A2A2A] text-gray-900 dark:text-[#E0E0E0] hover:bg-[#CECECE] dark:hover:bg-[#3A3A3A]'
      >
        Swap tokens
      </Button>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Swap Tokens</DialogTitle>
        </DialogHeader>

        <SwapWidget
          defaultToToken={{
            chainId: cyber.id,
            address: config[cyber.id].weth!,
            decimals: 18,
            name: 'WETH',
            symbol: 'WETH',
            logoURI: 'https://ethereum-optimism.github.io/data/WETH/logo.png',
          }}
          defaultFromToken={{
            chainId: cyber.id,
            address: zeroAddress,
            // address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
            decimals: 18,
            name: 'ETH',
            symbol: 'ETH',
            logoURI: '',
          }}
          defaultAmount={'5'}
          onConnectWallet={openConnectModal}
          onAnalyticEvent={(eventName, data) => {
            console.log('Analytic Event', eventName, data)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
