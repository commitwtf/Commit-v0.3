import { Menu, Wallet } from 'lucide-react'
import { Button } from '@/src/components/ui/Button'
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/Sheet'
import { Logo } from './Logo'
import { NavItems } from './NavItems'
import Link from 'next/link'

interface HeaderProps {
  isDark: boolean
  toggleTheme: () => void
}

export function Header({ isDark, toggleTheme }: HeaderProps) {
  return (
    <div className='flex flex-col sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='w-full bg-[#2ecc71] dark:bg-[#1a5e1a] text-white py-2 px-4 text-center'>
        <span className='text-sm font-medium'>
          50,000 $CYBER in Commit rewards!{' '}
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
              </nav>
            </SheetContent>
          </Sheet>
          <Logo isDark={isDark} toggleTheme={toggleTheme} />
        </div>
        <Button
          variant='outline'
          className='flex items-center gap-2 bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700 hover:bg-[#CECECE]'
        >
          <Wallet className='w-4 h-4' />
          Connect wallet
        </Button>
      </header>
    </div>
  )
}
