'use client'

import { Home, Plus, Gift, BookOpen, HelpCircle, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavItems = () => {
  const pathname = usePathname()

  return (
    <>
      <Link
        href='/'
        className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg ${pathname === '/'
          ? 'bg-[#DCDCDC] text-gray-900'
          : 'text-gray-700 hover:bg-[#DCDCDC] dark:text-[#E0E0E0] dark:hover:bg-[#DCDCDC] dark:hover:text-gray-900'
          }`}
      >
        <Home className='w-5 h-5' />
        Home
      </Link>
      <Link
        href='/profile'
        className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg ${pathname === '/profile'
          ? 'bg-[#DCDCDC] text-gray-900'
          : 'text-gray-700 hover:bg-[#DCDCDC] dark:text-[#E0E0E0] dark:hover:bg-[#DCDCDC] dark:hover:text-gray-900'
          }`}
      >
        <User className='w-5 h-5' />
        Profile
      </Link>
      <Link
        href='/create'
        className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg ${pathname.includes('/create')
          ? 'bg-[#DCDCDC] text-gray-900'
          : 'text-gray-700 hover:bg-[#DCDCDC] dark:text-[#E0E0E0] dark:hover:bg-[#DCDCDC] dark:hover:text-gray-900'
          }`}
      >
        <Plus className='w-5 h-5' />
        Create
      </Link>
      <Link
        href='/rewards'
        className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg ${pathname.includes('/rewards')
          ? 'bg-[#DCDCDC] text-gray-900'
          : 'text-gray-700 hover:bg-[#DCDCDC] dark:text-[#E0E0E0] dark:hover:bg-[#DCDCDC] dark:hover:text-gray-900'
          }`}
      >
        <Gift className='w-5 h-5' />
        Rewards
      </Link>
      <Link
        href='/about'
        className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg ${pathname.includes('/about')
          ? 'bg-[#DCDCDC] text-gray-900'
          : 'text-gray-700 hover:bg-[#DCDCDC] dark:text-[#E0E0E0] dark:hover:bg-[#DCDCDC] dark:hover:text-gray-900'
          }`}
      >
        <BookOpen className='w-5 h-5' />
        About
      </Link>
      <Link
        href='https://t.me/revmiller'
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-[#DCDCDC] dark:text-[#E0E0E0] dark:hover:bg-[#DCDCDC] dark:hover:text-gray-900'
      >
        <HelpCircle className='w-5 h-5' />
        Support
      </Link>
    </>
  )
}
