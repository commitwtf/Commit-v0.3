'use client'

import { Menu, Wallet } from 'lucide-react'
import { Button, Sheet, SheetContent, SheetTrigger, Logo, NavItems } from '@/src/components'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import RelaySwapWidget from '../SwapWidget'

export const Header = () => (
  <div className='flex flex-col sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
    <div className='w-full bg-[#2ecc71] dark:bg-[#1a5e1a] text-white py-2 px-4 text-center'>
      <span className='text-sm font-medium'>
        13,850{' '}
        <Link
          href='https://coinmarketcap.com/currencies/cyberconnect/ '
          className='underline hover:no-underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          $CYBER
        </Link>{' '}
        in Commit rewards!{' '}
        <Link href='/rewards' className='underline hover:no-underline'>
          Learn more
        </Link>
      </span>
    </div>
    <header className='flex items-center justify-between px-4 py-4 md:px-6 bg-[#E7E7E7] dark:bg-[#141414] transition-all duration-300 ease-in-out'>
      <div className='flex items-center gap-2'>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden text-gray-900 dark:text-[#E0E0E0]'
            >
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side='left'
            className='w-[240px] sm:w-[300px] bg-[#E7E7E7] dark:bg-[#141414]'
          >
            <nav className='flex flex-col gap-4'>
              <NavItems />
              <RelaySwapWidget />
            </nav>
          </SheetContent>
        </Sheet>
        <Logo />
      </div>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          if (!mounted || authenticationStatus === 'loading') {
            return null
          }

          const connected =
            account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

          if (!connected) {
            return (
              <Button
                variant='outline'
                onClick={openConnectModal}
                className='flex items-center gap-2 bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700 hover:bg-[#CECECE]'
              >
                <Wallet className='w-4 h-4' />
                Connect wallet
              </Button>
            )
          }

          if (chain.unsupported) {
            return (
              <Button
                variant='outline'
                onClick={openChainModal}
                className='flex items-center gap-2 bg-red-100 text-red-600 border-red-300 hover:bg-red-200'
              >
                Wrong network
              </Button>
            )
          }

          return (
            <Button
              variant='outline'
              onClick={openAccountModal}
              className='flex items-center gap-2 bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700 hover:bg-[#CECECE]'
            >
              {account.displayName}
            </Button>
          )
        }}
      </ConnectButton.Custom>
    </header>
  </div>
)
